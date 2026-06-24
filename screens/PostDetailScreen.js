// screens/PostDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Comentarios simulados
const MOCK_COMMENTS = [
  { id: 1, user: 'carlosdev', avatar: 'https://i.pravatar.cc/150?img=11', text: 'Hermosa foto! 😍', timeAgo: '2h' },
  { id: 2, user: 'lauracat', avatar: 'https://i.pravatar.cc/150?img=12', text: 'Increíble composición, los colores son perfectos 🌿', timeAgo: '3h' },
  { id: 3, user: 'matiasarg', avatar: 'https://i.pravatar.cc/150?img=13', text: '¿Qué cámara usaste para esta toma?', timeAgo: '5h' },
  { id: 4, user: 'sofiaphoto', avatar: 'https://i.pravatar.cc/150?img=14', text: 'Seguí subiendo contenido así, es hermoso! 💯', timeAgo: '6h' },
  { id: 5, user: 'peperolon', avatar: 'https://i.pravatar.cc/150?img=15', text: 'Los colores son increíbles ✨', timeAgo: '8h' },
  { id: 6, user: 'juandev22', avatar: 'https://i.pravatar.cc/150?img=16', text: 'Top 🔥🔥', timeAgo: '10h' },
];

function CommentItem({ comment }) {
  return (
    <View style={styles.commentItem}>
      <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <Text style={styles.commentText}>
          <Text style={styles.commentUsername}>{comment.user} </Text>
          {comment.text}
        </Text>
        <View style={styles.commentMeta}>
          <Text style={styles.commentTime}>{comment.timeAgo}</Text>
          <TouchableOpacity>
            <Text style={styles.commentAction}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.commentLike}>
        <Ionicons name="heart-outline" size={12} color={COLORS.textMuted} />
      </TouchableOpacity>
    </View>
  );
}

export default function PostDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { post } = route.params;

  // Estado local para interacciones en tiempo real
  const [liked, setLiked] = useState(post.liked || false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [saved, setSaved] = useState(post.saved || false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikes((prev) => prev + 1);
    }
  };

  const handleSave = () => {
    setSaved((prev) => !prev);
  };

  const displayLikes = () => {
    if (likes >= 1000) {
      const thousands = Math.floor(likes / 1000);
      const remainder = likes % 1000;
      return `${thousands},${remainder.toString().padStart(3, '0')}`;
    }
    return likes.toString();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />

      {/* Navigation header */}
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Post</Text>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Post header */}
          <View style={styles.postHeader}>
            <View style={styles.userInfo}>
              <View style={styles.avatarRing}>
                <Image source={{ uri: post.user.avatar }} style={styles.postAvatar} />
              </View>
              <View>
                <Text style={styles.postUsername}>{post.user.id}</Text>
                {post.user.location && (
                  <Text style={styles.postLocation}>{post.user.location}</Text>
                )}
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          {/* Full image in high definition */}
          <Image
            source={{ uri: post.imageUrl }}
            style={styles.fullImage}
            resizeMode="cover"
          />

          {/* Action bar */}
          <View style={styles.actions}>
            <View style={styles.leftActions}>
              <TouchableOpacity onPress={handleLike} style={styles.actionBtn}>
                <Ionicons
                  name={liked ? 'heart' : 'heart-outline'}
                  size={28}
                  color={liked ? COLORS.likeRed : COLORS.text}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="chatbubble-outline" size={26} color={COLORS.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="paper-plane-outline" size={26} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSave}>
              <Ionicons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={26}
                color={COLORS.text}
              />
            </TouchableOpacity>
          </View>

          {/* Likes */}
          <View style={styles.likesRow}>
            <Text style={styles.likesText}>{displayLikes()} likes</Text>
          </View>

          {/* Caption */}
          <View style={styles.captionRow}>
            <Text style={styles.captionText}>
              <Text style={styles.captionUsername}>{post.user.id} </Text>
              {post.caption}
            </Text>
          </View>

          {/* Tags simuladas */}
          <View style={styles.tagsRow}>
            {['#photography', '#nature', '#cats', '#explore', '#art'].map((tag) => (
              <TouchableOpacity key={tag}>
                <Text style={styles.tag}>{tag} </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Comments section */}
          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>
              View all {post.commentsCount?.toLocaleString() || '46,920'} comments
            </Text>
            {MOCK_COMMENTS.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </View>

          <Text style={styles.timeAgo}>{post.timeAgo}</Text>
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Add comment input */}
        <View style={styles.addCommentBar}>
          <Image source={{ uri: post.user.avatar }} style={styles.inputAvatar} />
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            placeholderTextColor={COLORS.textMuted}
            value={commentText}
            onChangeText={setCommentText}
            multiline={false}
          />
          {commentText.length > 0 && (
            <TouchableOpacity onPress={() => setCommentText('')}>
              <Text style={styles.postCommentBtn}>Post</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.xs,
  },
  navTitle: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: FONTS.size.md,
  },
  scrollView: {
    flex: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  avatarRing: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: COLORS.storyRing,
    padding: 2,
  },
  postAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.border,
  },
  postUsername: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: FONTS.size.sm,
  },
  postLocation: {
    color: COLORS.text,
    fontSize: FONTS.size.xs,
    marginTop: 1,
  },
  fullImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    backgroundColor: COLORS.border,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
  },
  leftActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  actionBtn: {
    marginRight: 2,
  },
  likesRow: {
    paddingHorizontal: SPACING.base,
    marginBottom: SPACING.xs,
  },
  likesText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: FONTS.size.sm,
  },
  captionRow: {
    paddingHorizontal: SPACING.base,
    marginBottom: SPACING.xs,
  },
  captionText: {
    color: COLORS.text,
    fontSize: FONTS.size.sm,
    lineHeight: 20,
  },
  captionUsername: {
    fontWeight: '700',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.base,
    marginBottom: SPACING.md,
  },
  tag: {
    color: COLORS.accent,
    fontSize: FONTS.size.sm,
  },
  commentsSection: {
    paddingHorizontal: SPACING.base,
  },
  commentsTitle: {
    color: COLORS.textMuted,
    fontSize: FONTS.size.sm,
    marginBottom: SPACING.md,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.border,
  },
  commentContent: {
    flex: 1,
  },
  commentText: {
    color: COLORS.text,
    fontSize: FONTS.size.sm,
    lineHeight: 18,
  },
  commentUsername: {
    fontWeight: '700',
  },
  commentMeta: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xs,
  },
  commentTime: {
    color: COLORS.textMuted,
    fontSize: FONTS.size.xs,
  },
  commentAction: {
    color: COLORS.textMuted,
    fontSize: FONTS.size.xs,
    fontWeight: '600',
  },
  commentLike: {
    paddingTop: SPACING.xs,
  },
  timeAgo: {
    color: COLORS.textMuted,
    fontSize: FONTS.size.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: SPACING.base,
    marginTop: SPACING.sm,
  },
  addCommentBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    gap: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  inputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.border,
  },
  commentInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: FONTS.size.sm,
    paddingVertical: SPACING.sm,
  },
  postCommentBtn: {
    color: COLORS.accent,
    fontWeight: '700',
    fontSize: FONTS.size.sm,
  },
});
