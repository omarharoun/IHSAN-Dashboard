import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { Plus, Send, X } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface QuickCaptureProps {
  onCapture: (text: string) => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function QuickCapture({ onCapture }: QuickCaptureProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState('');
  
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const height = useSharedValue(60);

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const expandedAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    height: height.value,
  }));

  const handleExpand = () => {
    setIsExpanded(true);
    height.value = withSpring(120, {
      damping: 15,
      stiffness: 300,
    });
    opacity.value = withTiming(1, { duration: 200 });
  };

  const handleCollapse = () => {
    height.value = withSpring(60, {
      damping: 15,
      stiffness: 300,
    });
    opacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(setIsExpanded)(false);
      runOnJS(setText)('');
    });
  };

  const handleCapture = () => {
    if (text.trim()) {
      onCapture(text.trim());
      handleCollapse();
      
      // Show success feedback
      if (Platform.OS === 'web') {
        // Web fallback - could implement a toast component
        console.log('Captured:', text.trim());
      }
    }
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
  };

  if (isExpanded) {
    return (
      <Animated.View style={[styles.expandedContainer, expandedAnimatedStyle]}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Quick note, task, or idea..."
            placeholderTextColor="#999999"
            value={text}
            onChangeText={setText}
            multiline
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleCapture}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleCollapse} style={styles.cancelButton}>
              <X size={20} color="#666666" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCapture} style={styles.sendButton}>
              <LinearGradient
                colors={['#007AFF', '#0056CC']}
                style={styles.sendGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Send size={20} color="#FFFFFF" strokeWidth={2} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }

  return (
    <AnimatedTouchableOpacity
      style={[styles.fab, fabAnimatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handleExpand}
      activeOpacity={1}
    >
      <LinearGradient
        colors={['#007AFF', '#0056CC']}
        style={styles.fabGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Plus size={28} color="#FFFFFF" strokeWidth={2} />
      </LinearGradient>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
      },
      android: {
        elevation: 12,
      },
      web: {
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
      },
    }),
  },
  fabGradient: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000000',
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {
    padding: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  sendGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});