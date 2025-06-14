import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FileText, SquareCheck as CheckSquare, Calendar, Folder, Clock, Users } from 'lucide-react-native';
import DashboardTile from '@/components/DashboardTile';

export default function WorkScreen() {
  const handleTilePress = (title: string) => {
    console.log('Work tile pressed:', title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#2a2a2a']}
        style={styles.background}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Work</Text>
          <Text style={styles.subtitle}>Your productivity hub</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.sectionTitle}>Documents & Notes</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="Documents"
              subtitle="12 files"
              icon={FileText}
              gradientColors={['#007AFF', '#0056CC']}
              onPress={() => handleTilePress('Documents')}
              size="large"
            />
          </View>

          <Text style={styles.sectionTitle}>Task Management</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="My Tasks"
              subtitle="8 pending"
              icon={CheckSquare}
              gradientColors={['#34C759', '#28A745']}
              onPress={() => handleTilePress('My Tasks')}
            />
            <DashboardTile
              title="Projects"
              subtitle="3 active"
              icon={Folder}
              gradientColors={['#FF9500', '#FF8C00']}
              onPress={() => handleTilePress('Projects')}
            />
          </View>

          <Text style={styles.sectionTitle}>Schedule & Time</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="Calendar"
              subtitle="5 meetings today"
              icon={Calendar}
              gradientColors={['#AF52DE', '#9A4BCF']}
              onPress={() => handleTilePress('Calendar')}
            />
            <DashboardTile
              title="Time Tracker"
              subtitle="4.2h today"
              icon={Clock}
              gradientColors={['#FF3B30', '#E53E3E']}
              onPress={() => handleTilePress('Time Tracker')}
            />
          </View>

          <Text style={styles.sectionTitle}>Collaboration</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="Team Spaces"
              subtitle="2 workspaces"
              icon={Users}
              gradientColors={['#5856D6', '#4B49D1']}
              onPress={() => handleTilePress('Team Spaces')}
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