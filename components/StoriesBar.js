// components/StoriesBar.js
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const MOCK_STORIES = [
  { id: 'your_story', username: 'Your story', avatar: 'https://i.pravatar.cc/150?img=10', isOwn: true, hasStory: false },
  { id: 'ani', username: 'ani', avatar: 'https://i.pravatar.cc/150?img=1', isOwn: false, hasStory: true },
  { id: 'fracrock', username: 'fracrock', avatar: 'https://i.pravatar.cc/150?img=2', isOwn: false, hasStory: true },
  { id: 'devam', username: 'devam', avatar: 'https://i.pravatar.cc/150?img=3', isOwn: false, hasStory: true },
  { id: 'yukiscape', username: 'yukiscape', avatar: 'https://i.pravatar.cc/150?img=4', isOwn: false, hasStory: true },
  { id: 'mirodev', username: 'mirodev', avatar: 'https://i.pravatar.cc/150?img=5', isOwn: false, hasStory: false },
  { id: 'catadev', username: 'catadev', avatar: 'https://i.pravatar.cc/150?img=6', isOwn: false, hasStory: true },
];

function StoryItem({ story }) {
  return (
    <TouchableOpacity style={styles.storyItem} activeOpacity={0.7}>
      <View style={styles.storyAvatarContainer}>
        {story.isOwn ? (
          <>
            <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
            <View style={styles.addStoryBadge}>
              <Ionicons name="add" size={12} color={COLORS.white} />
            </View>
          </>
        ) : story.hasStory ? (
          <View style={styles.storyRingActive}>
            <View style={styles.storyAvatarInner}>
              <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
            </View>
          </View>
        ) : (
          <View style={styles.storyRingInactive}>
            <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
          </View>
        )}
      </View>
      <Text style={styles.storyUsername} numberOfLines={1}>
        {story.username}
      </Text>
    </TouchableOpacity>
  );
}

export default function StoriesBar() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {MOCK_STORIES.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
    paddingVertical: SPACING.sm,
  },
  scrollContent: {
    paddingHorizontal: SPACING.sm,
    gap: SPACING.base,
  },
  storyItem: {
    alignItems: 'center',
    width: 66,
  },
  storyAvatarContainer: {
    position: 'relative',
    marginBottom: SPACING.xs,
  },
  storyRingActive: {
    width: 66,
    height: 66,
    borderRadius: 33,
    // Degradado simulado con borde de color
    borderWidth: 2.5,
    borderColor: '#C13584',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyAvatarInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COLORS.background,
    overflow: 'hidden',
  },
  storyRingInactive: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: COLORS.border,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  storyAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.border,
  },
  addStoryBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
    borderWidth: 2,
    borderColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyUsername: {
    color: COLORS.text,
    fontSize: FONTS.size.xs,
    textAlign: 'center',
    width: 66,
  },
});
