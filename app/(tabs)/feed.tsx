import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import FeedVideoCard from '@/components/FeedVideoCard';

const { height: screenHeight } = Dimensions.get('window');

interface VideoPost {
  id: string;
  videoUrl: string;
  userAvatar: string;
  username: string;
  description: string;
  musicTitle: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

const mockVideos: VideoPost[] = [
  {
    id: '1',
    videoUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=800',
    userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    username: 'alexcreator',
    description: 'Just finished this amazing sunset timelapse! The colors were absolutely incredible today 🌅 #sunset #timelapse #nature',
    musicTitle: 'Chill Vibes - Lo-Fi Beats',
    likes: 12500,
    comments: 847,
    shares: 234,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    videoUrl: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=400&h=800',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    username: 'techguru',
    description: 'Breaking down the latest React Native features! This new animation library is game-changing 🚀 #reactnative #coding #tech',
    musicTitle: 'Electronic Dreams - Synthwave Mix',
    likes: 8900,
    comments: 456,
    shares: 123,
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: '3',
    videoUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=800',
    userAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    username: 'foodielife',
    description: 'Making the perfect pasta from scratch! The secret is in the timing and technique 👨‍🍳 #cooking #pasta #foodie',
    musicTitle: 'Italian Vibes - Acoustic Guitar',
    likes: 15600,
    comments: 1200,
    shares: 567,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '4',
    videoUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400&h=800',
    userAvatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=400',
    username: 'fitnessmotiv',
    description: 'Morning workout routine that changed my life! Consistency is key, start small and build up 💪 #fitness #motivation #workout',
    musicTitle: 'Pump It Up - High Energy Mix',
    likes: 22300,
    comments: 1800,
    shares: 890,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: '5',
    videoUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400&h=800',
    userAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    username: 'artvibes',
    description: 'Creating digital art with just an iPad! The future of creativity is in our hands ✨ #digitalart #ipadart #creative',
    musicTitle: 'Ambient Sounds - Creative Flow',
    likes: 9800,
    comments: 623,
    shares: 234,
    isLiked: false,
    isBookmarked: true,
  },
];

export default function FeedScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderVideoItem = ({ item, index }: { item: VideoPost; index: number }) => (
    <FeedVideoCard
      videoUrl={item.videoUrl}
      userAvatar={item.userAvatar}
      username={item.username}
      description={item.description}
      musicTitle={item.musicTitle}
      likes={item.likes}
      comments={item.comments}
      shares={item.shares}
      isLiked={item.isLiked}
      isBookmarked={item.isBookmarked}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <FlatList
        ref={flatListRef}
        data={mockVideos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={screenHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
          length: screenHeight,
          offset: screenHeight * index,
          index,
        })}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});