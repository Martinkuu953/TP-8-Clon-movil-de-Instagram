// screens/HomeScreen.js
import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import PostCard from '../components/PostCard';
import StoriesBar from '../components/StoriesBar';
import { useCatPosts } from '../hooks/useCatPosts';
import { COLORS, FONTS, SPACING } from '../constants/theme';

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>Instagram</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="add-circle-outline" size={26} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <View>
            <Ionicons name="chatbubble-outline" size={24} color={COLORS.text} />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>6</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const { posts, loading, error, toggleLike, toggleSave, refetch } = useCatPosts();

  const handlePostPress = useCallback(
    (post) => {
      navigation.navigate('PostDetail', { post });
    },
    [navigation]
  );

  const handleUserPress = useCallback(
    (user) => {
      navigation.navigate('Profile', { user });
    },
    [navigation]
  );

  const renderPost = useCallback(
    ({ item }) => (
      <PostCard
        post={item}
        onLike={toggleLike}
        onSave={toggleSave}
        onPress={handlePostPress}
        onUserPress={handleUserPress}
      />
    ),
    [toggleLike, toggleSave, handlePostPress, handleUserPress]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const ListHeader = useCallback(
    () => (
      <>
        <Header />
        <StoriesBar />
      </>
    ),
    []
  );

  const ListSeparator = useCallback(
    () => <View style={styles.separator} />,
    []
  );

  if (loading && posts.length === 0) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={['top']}>
        <StatusBar style="light" />
        <Header />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.text} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        ItemSeparatorComponent={ListSeparator}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={4}
        windowSize={10}
        initialNumToRender={4}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            tintColor={COLORS.text}
            colors={[COLORS.text]}
          />
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>
              {error ? 'Error cargando el feed. Desliza para reintentar.' : 'No hay publicaciones'}
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    fontStyle: 'italic',
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  headerIcon: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#ED4956',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '700',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
  },
  listContent: {
    flexGrow: 1,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: FONTS.size.base,
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
  },
});
