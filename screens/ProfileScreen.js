// screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_IMAGE_SIZE = (SCREEN_WIDTH - 2) / 3; // 2px de gaps totales entre 3 columnas

// Perfil del usuario actual
const MY_PROFILE = {
  id: 'yukiscape',
  username: 'yukiscape',
  name: 'amartya',
  pronouns: 'he/him',
  bio: "falling's easy, but it only brings you down",
  avatar: 'https://i.pravatar.cc/150?img=4',
  posts: 6,
  followers: 421,
  following: 444,
};

// Imágenes del grid del perfil (usando The Cat API o placeholders)
const PROFILE_GRID_IMAGES = [
  'https://images.unsplash.com/photo-1490750967868-88df5691cc71?w=300',
  'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=300',
  'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=300',
  'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=300',
  'https://images.unsplash.com/photo-1549608276-5786777e6587?w=300',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300',
];

// Highlights simulados
const HIGHLIGHTS = [
  { id: 'add', isAdd: true },
  { id: 'h1', isAdd: false },
  { id: 'h2', isAdd: false },
  { id: 'h3', isAdd: false },
];

function StatColumn({ value, label }) {
  return (
    <View style={styles.statColumn}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function GridItem({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => onPress && onPress(item)}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.gridImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  // Si vienen desde un tap de usuario en el feed, usamos ese usuario; si no, el propio perfil
  const user = route.params?.user || MY_PROFILE;
  const isOwnProfile = !route.params?.user;

  const [activeTab, setActiveTab] = useState('grid');

  const gridData = PROFILE_GRID_IMAGES.map((uri, i) => ({
    id: `grid-${i}`,
    uri,
  }));

  const handleGridItemPress = (item) => {
    // Navegar al detalle con la imagen del grid
    navigation.navigate('PostDetail', {
      post: {
        id: item.id,
        imageUrl: item.uri,
        user: {
          id: user.username || user.id,
          avatar: user.avatar,
          location: 'Buenos Aires, Argentina',
        },
        likes: Math.floor(Math.random() * 10000) + 100,
        caption: 'Una foto del perfil de ' + (user.username || user.id),
        commentsCount: Math.floor(Math.random() * 5000) + 50,
        timeAgo: '3 hours ago',
        liked: false,
        saved: false,
      },
    });
  };

  const ProfileHeader = () => (
    <View>
      {/* Nav header */}
      {!isOwnProfile && (
        <View style={styles.navHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.navTitle}>{user.username || user.id}</Text>
          <TouchableOpacity style={styles.backBtn}>
            <Ionicons name="ellipsis-horizontal" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      )}

      {/* Avatar + Stats */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarRing}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
        </View>
        <View style={styles.statsRow}>
          <StatColumn value={MY_PROFILE.posts} label="Posts" />
          <StatColumn value={MY_PROFILE.followers} label="Followers" />
          <StatColumn value={MY_PROFILE.following} label="Following" />
        </View>
      </View>

      {/* User info */}
      <View style={styles.userInfo}>
        <Text style={styles.displayName}>{user.name || user.id}</Text>
        {MY_PROFILE.pronouns ? (
          <Text style={styles.pronouns}>{MY_PROFILE.pronouns}</Text>
        ) : null}
        <Text style={styles.bio}>{user.bio || MY_PROFILE.bio}</Text>
      </View>

      {/* Action buttons */}
      <View style={styles.actionButtons}>
        {isOwnProfile ? (
          <>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>Share Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="chevron-down" size={16} color={COLORS.text} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={[styles.actionBtn, styles.followBtn]}>
              <Text style={[styles.actionBtnText, styles.followBtnText]}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="person-add-outline" size={16} color={COLORS.text} />
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Story Highlights */}
      <View style={styles.highlightsSection}>
        <Text style={styles.highlightsTitle}>Story highlights</Text>
        <Text style={styles.highlightsSubtitle}>Keep your favorite stories on your profile</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.highlightsScroll}
          contentContainerStyle={styles.highlightsContent}
        >
          {HIGHLIGHTS.map((h) => (
            <TouchableOpacity key={h.id} style={styles.highlightItem}>
              <View style={[styles.highlightCircle, h.isAdd && styles.highlightCircleAdd]}>
                {h.isAdd && (
                  <Ionicons name="add" size={30} color={COLORS.text} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'grid' && styles.tabActive]}
          onPress={() => setActiveTab('grid')}
        >
          <Ionicons
            name="grid-outline"
            size={24}
            color={activeTab === 'grid' ? COLORS.text : COLORS.textMuted}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tags' && styles.tabActive]}
          onPress={() => setActiveTab('tags')}
        >
          <Ionicons
            name="person-outline"
            size={24}
            color={activeTab === 'tags' ? COLORS.text : COLORS.textMuted}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderGridItem = ({ item }) => (
    <GridItem item={item} onPress={handleGridItemPress} />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />

      {/* Top header for own profile */}
      {isOwnProfile && (
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>{MY_PROFILE.username}</Text>
          <View style={styles.topBarIcons}>
            <TouchableOpacity style={styles.topBarIcon}>
              <Ionicons name="add-circle-outline" size={26} color={COLORS.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topBarIcon}>
              <Ionicons name="menu-outline" size={26} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* FlatList con numColumns=3 para el grid, header con todo el perfil */}
      <FlatList
        data={activeTab === 'grid' ? gridData : []}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        ListHeaderComponent={ProfileHeader}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews
        ListEmptyComponent={
          activeTab === 'tags' ? (
            <View style={styles.emptyState}>
              <Ionicons name="person-outline" size={48} color={COLORS.textMuted} />
              <Text style={styles.emptyText}>No tagged posts</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
  },
  topBarTitle: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: FONTS.size.lg,
  },
  topBarIcons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  topBarIcon: {
    padding: SPACING.xs,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
  },
  navTitle: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: FONTS.size.md,
  },
  backBtn: {
    padding: SPACING.xs,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    gap: SPACING.xl,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatarRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: COLORS.storyRing,
    padding: 3,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: COLORS.border,
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statColumn: {
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: FONTS.size.lg,
  },
  statLabel: {
    color: COLORS.text,
    fontSize: FONTS.size.sm,
    marginTop: 2,
  },
  userInfo: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.sm,
  },
  displayName: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: FONTS.size.sm,
    marginBottom: 2,
  },
  pronouns: {
    color: COLORS.textMuted,
    fontSize: FONTS.size.sm,
    marginBottom: 2,
  },
  bio: {
    color: COLORS.text,
    fontSize: FONTS.size.sm,
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.md,
    gap: SPACING.xs,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 8,
    paddingVertical: SPACING.sm - 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: FONTS.size.sm,
  },
  followBtn: {
    backgroundColor: COLORS.accent,
  },
  followBtnText: {
    color: COLORS.white,
  },
  iconBtn: {
    width: 36,
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightsSection: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.md,
  },
  highlightsTitle: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: FONTS.size.sm,
    marginBottom: 2,
  },
  highlightsSubtitle: {
    color: COLORS.text,
    fontSize: FONTS.size.sm,
    marginBottom: SPACING.sm,
  },
  highlightsScroll: {
    marginTop: SPACING.xs,
  },
  highlightsContent: {
    gap: SPACING.base,
  },
  highlightItem: {
    alignItems: 'center',
    width: 68,
  },
  highlightCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightCircleAdd: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: 'transparent',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.text,
  },
  columnWrapper: {
    gap: 1,
  },
  gridItem: {
    width: GRID_IMAGE_SIZE,
    height: GRID_IMAGE_SIZE,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.border,
  },
  listContent: {
    flexGrow: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    gap: SPACING.md,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: FONTS.size.base,
  },
});
