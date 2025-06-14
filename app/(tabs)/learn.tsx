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
  BookOpen,
  Play,
  Award,
  Target,
  TrendingUp,
  Bookmark,
} from 'lucide-react-native';
import DashboardTile from '@/components/DashboardTile';

export default function LearnScreen() {
  const handleTilePress = (title: string) => {
    console.log('Learn tile pressed:', title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#2a2a2a']}
        style={styles.background}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Learn</Text>
          <Text style={styles.subtitle}>Expand your knowledge</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.sectionTitle}>Courses & Content</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="My Courses"
              subtitle="3 in progress"
              icon={BookOpen}
              gradientColors={['#007AFF', '#0056CC']}
              onPress={() => handleTilePress('My Courses')}
            />
            <DashboardTile
              title="Video Library"
              subtitle="120+ videos"
              icon={Play}
              gradientColors={['#34C759', '#28A745']}
              onPress={() => handleTilePress('Video Library')}
            />
          </View>

          <Text style={styles.sectionTitle}>Progress & Goals</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="Achievements"
              subtitle="12 earned"
              icon={Award}
              gradientColors={['#FF9500', '#FF8C00']}
              onPress={() => handleTilePress('Achievements')}
            />
            <DashboardTile
              title="Learning Goals"
              subtitle="2 active"
              icon={Target}
              gradientColors={['#AF52DE', '#9A4BCF']}
              onPress={() => handleTilePress('Learning Goals')}
            />
          </View>

          <Text style={styles.sectionTitle}>Study Tools</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="Progress Analytics"
              subtitle="Weekly insights"
              icon={TrendingUp}
              gradientColors={['#FF3B30', '#E53E3E']}
              onPress={() => handleTilePress('Progress Analytics')}
              size="large"
            />
          </View>

          <Text style={styles.sectionTitle}>Resources</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="Reading List"
              subtitle="8 saved articles"
              icon={Bookmark}
              gradientColors={['#5856D6', '#4B49D1']}
              onPress={() => handleTilePress('Reading List')}
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