import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';
import { HomeIcon, SearchIcon, HeartIcon, MoreIcon } from './Icons';

type Tab = 'home' | 'search' | 'favorites' | 'profile';

interface NavItem {
  id: Tab;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home',      label: 'Home' },
  { id: 'search',    label: 'Search' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'profile',   label: 'Profile' },
];

function TabIcon({ id, isActive }: { id: Tab; isActive: boolean }) {
  const activeColor = id === 'favorites' ? COLORS.favorite : COLORS.primary;
  const color = isActive ? activeColor : COLORS.textSecondary;
  switch (id) {
    case 'home':      return <HomeIcon size={22} color={color} />;
    case 'search':    return <SearchIcon size={22} color={color} />;
    case 'favorites': return <HeartIcon size={22} color={color} />;
    case 'profile':   return <MoreIcon size={22} color={color} />;
  }
}

interface Props {
  activeTab?: Tab;
  onTabPress?: (tab: Tab) => void;
}

export default function BottomNavBar({ activeTab = 'home', onTabPress }: Props) {
  return (
    <View style={styles.container}>
      {NAV_ITEMS.map(item => {
        const isActive = item.id === activeTab;
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.tab}
            onPress={() => onTabPress?.(item.id)}
            activeOpacity={0.7}>
            <TabIcon id={item.id} isActive={isActive} />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {item.label}
            </Text>
            {isActive && <View style={styles.activeDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingTop: 10,
    paddingBottom: Platform.select({ ios: 24, android: 12 }),
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Elevated look matching the dark card from Figma
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },

  label: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.medium,
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginTop: 2,
  },
});
