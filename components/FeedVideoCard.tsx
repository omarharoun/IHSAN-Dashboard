import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Music,
  MoreHorizontal,
} from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface FeedVideoCardProps {
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

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function FeedVideoCard({
  videoUrl,
  userAvatar,
  username,
  description,
  musicTitle,
  likes,
  comments,
  shares,
  isLiked = false,
  isBookmarked = false,
}: FeedVideoCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [likeCount, setLikeCount] = useState(likes);

  const likeScale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const likeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }],
  }));

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);

    // Animate the like button
    likeScale.value = withSequence(
      withSpring(1.2, { damping: 10, stiffness: 300 }),
      withSpring(1, { damping: 10, stiffness: 300 })
    );

    // Animate floating heart if liked
    if (newLiked) {
      heartScale.value = withSequence(
        withTiming(1.5, { duration: 200 }),
        withTiming(0, { duration: 300 })
      );
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <View style={styles.container}>
      {/* Video Background */}
      <Image source={{ uri: videoUrl }} style={styles.videoBackground} />
      
      {/* Gradient Overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
        style={styles.gradientOverlay}
      />

      {/* Floating Heart Animation */}
      <Animated.View style={[styles.floatingHeart, heartAnimatedStyle]}>
        <Heart size={80} color="#FF3B5C" fill="#FF3B5C" strokeWidth={0} />
      </Animated.View>

      {/* Right Side Actions */}
      <View style={styles.rightActions}>
        {/* User Avatar */}
        <TouchableOpacity style={styles.avatarContainer}>
          <Image source={{ uri: userAvatar }} style={styles.avatar} />
          <View style={styles.followButton}>
            <Text style={styles.followButtonText}>+</Text>
          </View>
        </TouchableOpacity>

        {/* Like Button */}
        <AnimatedTouchableOpacity
          style={[styles.actionButton, likeAnimatedStyle]}
          onPress={handleLike}
        >
          <Heart
            size={32}
            color={liked ? '#FF3B5C' : '#FFFFFF'}
            fill={liked ? '#FF3B5C' : 'transparent'}
            strokeWidth={2}
          />
          <Text style={styles.actionText}>{formatCount(likeCount)}</Text>
        </AnimatedTouchableOpacity>

        {/* Comment Button */}
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={32} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.actionText}>{formatCount(comments)}</Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity style={styles.actionButton}>
          <Share size={32} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.actionText}>{formatCount(shares)}</Text>
        </TouchableOpacity>

        {/* Bookmark Button */}
        <TouchableOpacity style={styles.actionButton} onPress={handleBookmark}>
          <Bookmark
            size={32}
            color={bookmarked ? '#FFD700' : '#FFFFFF'}
            fill={bookmarked ? '#FFD700' : 'transparent'}
            strokeWidth={2}
          />
        </TouchableOpacity>

        {/* More Options */}
        <TouchableOpacity style={styles.actionButton}>
          <MoreHorizontal size={32} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Bottom Content */}
      <View style={styles.bottomContent}>
        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.username}>@{username}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>

        {/* Music Info */}
        <View style={styles.musicInfo}>
          <Music size={16} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.musicText} numberOfLines={1}>
            {musicTitle}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    position: 'relative',
    backgroundColor: '#000000',
  },
  videoBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingHeart: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -40,
    marginLeft: -40,
    zIndex: 10,
  },
  rightActions: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    alignItems: 'center',
    gap: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  followButton: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF3B5C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    lineHeight: 16,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 80,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  userInfo: {
    marginBottom: 12,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  musicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  musicText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
});