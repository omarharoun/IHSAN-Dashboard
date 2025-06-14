import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FileText, SquareCheck as CheckSquare, Calendar, Camera, BookOpen, Zap, TrendingUp, Clock, Bell, Settings } from 'lucide-react-native';
import DashboardTile from '@/components/DashboardTile';
import SearchBar from '@/components/SearchBar';
import QuickCapture from '@/components/QuickCapture';
import NotificationBadge from '@/components/NotificationBadge';

export default function DashboardScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(3);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search functionality
  };

  const handleQuickCapture = (text: string) => {
    // TODO: Save quick capture
    console.log('Quick capture:', text);
  };

  const handleTilePress = (title: string) => {
    // TODO: Navigate to specific sections
    console.log('Pressed:', title);
  };

  const recentItems = [
    {
      title: 'Project Proposal Draft',
      type: 'Document',
      time: '2 hours ago',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Team Meeting Notes',
      type: 'Note',
      time: '4 hours ago',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'React Native Course',
      type: 'Learning',
      time: '1 day ago',
      image: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#2a2a2a']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>Alex</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#FFFFFF" strokeWidth={2} />
            <NotificationBadge count={notifications} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <SearchBar
          placeholder="Search everything..."
          onSearch={handleSearch}
        />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Quick Actions Grid */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="New Note"
              subtitle="Quick capture"
              icon={FileText}
              gradientColors={['#007AFF', '#0056CC']}
              onPress={() => handleTilePress('New Note')}
            />
            <DashboardTile
              title="Tasks"
              subtitle="3 pending"
              icon={CheckSquare}
              gradientColors={['#34C759', '#28A745']}
              onPress={() => handleTilePress('Tasks')}
            />
            <DashboardTile
              title="Calendar"
              subtitle="Today's schedule"
              icon={Calendar}
              gradientColors={['#FF9500', '#FF8C00']}
              onPress={() => handleTilePress('Calendar')}
            />
            <DashboardTile
              title="Scan"
              subtitle="Document capture"
              icon={Camera}
              gradientColors={['#AF52DE', '#9A4BCF']}
              onPress={() => handleTilePress('Scan')}
            />
          </View>

          {/* Learning Section */}
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="Courses"
              subtitle="2 in progress"
              icon={BookOpen}
              gradientColors={['#FF3B30', '#E53E3E']}
              onPress={() => handleTilePress('Courses')}
              size="large"
            />
          </View>

          {/* Productivity Insights */}
          <Text style={styles.sectionTitle}>Today's Insights</Text>
          <View style={styles.tilesGrid}>
            <DashboardTile
              title="Focus Time"
              subtitle="4.5 hours"
              icon={Zap}
              gradientColors={['#5856D6', '#4B49D1']}
              onPress={() => handleTilePress('Focus Time')}
            />
            <DashboardTile
              title="Progress"
              subtitle="+15% this week"
              icon={TrendingUp}
              gradientColors={['#32D74B', '#28CD41']}
              onPress={() => handleTilePress('Progress')}
            />
          </View>

          {/* Recent Items */}
          <Text style={styles.sectionTitle}>Recent Items</Text>
          <View style={styles.recentItems}>
            {recentItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.recentItem}>
                <Image source={{ uri: item.image }} style={styles.recentImage} />
                <View style={styles.recentContent}>
                  <Text style={styles.recentTitle}>{item.title}</Text>
                  <Text style={styles.recentType}>{item.type}</Text>
                </View>
                <View style={styles.recentTime}>
                  <Clock size={14} color="#666666" strokeWidth={2} />
                  <Text style={styles.recentTimeText}>{item.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Quick Capture FAB */}
        <QuickCapture onCapture={handleQuickCapture} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
  },
  userName: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 200,
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
  recentItems: {
    paddingHorizontal: 20,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 2px 16px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  recentImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 16,
  },
  recentContent: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  recentType: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
  },
  recentTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recentTimeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  bottomSpacing: {
    height: 100,
  },
});