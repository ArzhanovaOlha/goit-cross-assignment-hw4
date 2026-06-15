/**
 * DrawerContent — custom dark-themed sidebar.
 * Contains branding and utility links (Help, Contacts).
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { COLORS } from '../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';
import { SCREENS } from './SCREENS';

interface NavLink {
  label: string;
  screen: string;
  icon: string;
}

const LINKS: NavLink[] = [
  { label: 'Help & FAQ', screen: SCREENS.HELP,     icon: '❓' },
  { label: 'Contact Us', screen: SCREENS.CONTACTS,  icon: '✉️' },
];

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { navigation, state } = props;
  const currentRouteName = state.routeNames[state.index];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
      scrollEnabled={false}>

      {/* Branding */}
      <View style={styles.brand}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80' }}
          style={styles.logo}
        />
        <Text style={styles.appName}>CoffeeApp</Text>
        <Text style={styles.tagline}>Your daily brew</Text>
      </View>

      <View style={styles.divider} />

      {/* Utility links */}
      <View style={styles.links}>
        <Text style={styles.sectionLabel}>SUPPORT</Text>
        {LINKS.map(link => {
          const isActive = currentRouteName === link.screen;
          return (
            <TouchableOpacity
              key={link.screen}
              style={[styles.link, isActive && styles.linkActive]}
              onPress={() => navigation.navigate(link.screen)}
              activeOpacity={0.8}>
              <Text style={styles.linkIcon}>{link.icon}</Text>
              <Text style={[styles.linkLabel, isActive && styles.linkLabelActive]}>
                {link.label}
              </Text>
              {isActive && <View style={styles.activePill} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.closeDrawer()}
          activeOpacity={0.8}>
          <Text style={styles.closeBtnText}>✕  Close menu</Text>
        </TouchableOpacity>
        <Text style={styles.version}>v1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingTop: Platform.select({ ios: 0, android: 16 }),
  },
  brand: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  appName: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: 4,
  },
  tagline: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  links: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semiBold,
    letterSpacing: 1,
    marginBottom: 8,
    paddingLeft: 4,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 12,
    marginBottom: 4,
    position: 'relative',
  },
  linkActive: {
    backgroundColor: 'rgba(198,124,78,0.12)',
  },
  linkIcon: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  linkLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    flex: 1,
  },
  linkLabelActive: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  activePill: {
    width: 4,
    height: 20,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    right: 0,
  },
  footer: {
    padding: 24,
    gap: 8,
    alignItems: 'flex-start',
  },
  closeBtn: {
    paddingVertical: 8,
  },
  closeBtnText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
  },
  version: {
    color: COLORS.border,
    fontSize: FONT_SIZE.xs,
  },
});
