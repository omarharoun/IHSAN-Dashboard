import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Camera,
  Calculator,
  Palette,
  Zap,
  Globe,
  Settings,
} from 'lucide-react-native';
import DashboardTile from '@/components/DashboardTile';

export default function ToolsScreen() {
  const handleTilePress = (title: string) => {
    console.log('Tools tile pressed:', title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#2a2a2a']}
        style={styles.background}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Tools</Text>
          <Text style={styles.subtitle}>Powerful utilities at your fingertips</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.sectionTitle}>Capture & Create</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="Document Scanner"
              subtitle="Scan & OCR"
              icon={Camera}
              gradientColors={['#007AFF', '#0056CC']}
              onPress={() => handleTilePress('Document Scanner')}
            />
            <DashboardTile
              title="Design Tools"
              subtitle="Create visuals"
              icon={Palette}
              gradientColors={['#34C759', '#28A745']}
              onPress={() => handleTilePress('Design Tools')}
            />
          </View>

          <Text style={styles.sectionTitle}>Productivity</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="Calculator"
              subtitle="Advanced math"
              icon={Calculator}
              gradientColors={['#FF9500', '#FF8C00']}
              onPress={() => handleTilePress('Calculator')}
            />
            <DashboardTile
              title="Automation"
              subtitle="Smart workflows"
              icon={Zap}
              gradientColors={['#AF52DE', '#9A4BCF']}
              onPress={() => handleTilePress('Automation')}
            />
          </View>

          <Text style={styles.sectionTitle}>Research & Web</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="Web Clipper"
              subtitle="Save content"
              icon={Globe}
              gradientColors={['#FF3B30', '#E53E3E']}
              onPress={() => handleTilePress('Web Clipper')}
              size="large"
            />
          </View>

          <Text style={styles.sectionTitle}>System</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="Settings"
              subtitle="App preferences"
              icon={Settings}
              gradientColors={['#5856D6', '#4B49D1']}
              onPress={() => handleTilePress('Settings')}
              size="large"
            />
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 16,
  },
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
  },
  bottomSpacing: {
    height: 100,
  },
});