// components/PostCard.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PostCard({ post, onLike, onSave, onPress, onUserPress }) {
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + ',000';
    }
    return num.toString();
  };

  const displayLikes = () => {
    if (post.likes >= 1000) {
      const thousands = Math.floor(post.likes / 1000);
      const remainder = post.likes % 1000;
      return `${thousands},${remainder.toString().padStart(3, '0')}`;
    }
    return post.likes.toString();
  };

  return (
    <View style={styles.container}>
      {/* Header: Avatar + User + Location + Options */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.userInfo} onPress={() => onUserPress && onUserPress(post.user)}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          </View>
          <View style={styles.userTextContainer}>
            <Text style={styles.username}>{post.user.id}</Text>
            {post.user.location && (
              <Text style={styles.location}>{post.user.location}</Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <TouchableOpacity activeOpacity={0.95} onPress={() => onPress && onPress(post)}>
        <Image
          source={{ uri: post.imageUrl }}
          style={styles.postImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Action Bar */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={() => onLike && onLike(post.id)} style={styles.actionButton}>
            <Ionicons
              name={post.liked ? 'heart' : 'heart-outline'}
              size={26}
              color={post.liked ? COLORS.likeRed : COLORS.text}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => onPress && onPress(post)}>
            <Ionicons name="chatbubble-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => onSave && onSave(post.id)}>
          <Ionicons
            name={post.saved ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={COLORS.text}
          />
        </TouchableOpacity>
      </View>

      {/* Likes count */}
      <View style={styles.likesContainer}>
        <Text style={styles.likesText}>{displayLikes()} likes</Text>
      </View>

      {/* Caption */}
      <View style={styles.captionContainer}>
        <Text style={styles.captionText} numberOfLines={2}>
          <Text style={styles.captionUsername}>{post.user.id} </Text>
          {post.caption}
          <Text style={styles.moreText}> more...</Text>
        </Text>
      </View>

      {/* Comments */}
      <TouchableOpacity onPress={() => onPress && onPress(post)}>
        <Text style={styles.viewComments}>
          View all {formatNumber(post.commentsCount)} comments
        </Text>
      </TouchableOpacity>

      {/* Add comment row */}
      <View style={styles.addCommentRow}>
        <Image source={{ uri: post.user.avatar }} style={styles.commentAvatar} />
        <Text style={styles.addCommentText}>Add a comment...</Text>
      </View>

      {/* Time ago */}
      <Text style={styles.timeAgo}>{post.timeAgo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    marginBottom: SPACING.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLORS.storyRing,
    padding: 2,
    marginRight: SPACING.sm,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.border,
  },
  userTextContainer: {
    flex: 1,
  },
  username: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: FONTS.size.sm,
    letterSpacing: 0.1,
  },
  location: {
    color: COLORS.text,
    fontSize: FONTS.size.xs,
    fontWeight: '400',
    marginTop: 1,
  },
  moreButton: {
    padding: SPACING.xs,
  },
  postImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    backgroundColor: COLORS.border,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  actionButton: {
    marginRight: 2,
  },
  likesContainer: {
    paddingHorizontal: SPACING.base,
    marginBottom: SPACING.xs,
  },
  likesText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: FONTS.size.sm,
  },
  captionContainer: {
    paddingHorizontal: SPACING.base,
    marginBottom: SPACING.xs,
  },
  captionText: {
    color: COLORS.text,
    fontSize: FONTS.size.sm,
    lineHeight: 18,
  },
  captionUsername: {
    fontWeight: '700',
    color: COLORS.text,
  },
  moreText: {
    color: COLORS.textMuted,
  },
  viewComments: {
    color: COLORS.textMuted,
    fontSize: FONTS.size.sm,
    paddingHorizontal: SPACING.base,
    marginBottom: SPACING.xs,
  },
  addCommentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    marginBottom: SPACING.xs,
    gap: SPACING.sm,
  },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.border,
  },
  addCommentText: {
    color: COLORS.textMuted,
    fontSize: FONTS.size.sm,
  },
  timeAgo: {
    color: COLORS.textMuted,
    fontSize: FONTS.size.xs,
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
