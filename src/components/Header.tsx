import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';
import { BagIcon } from './Icons';

interface Props {
  logoUrl?: string;
  greeting?: string;
  title: string;
  cartCount?: number;
  onCartPress?: () => void;
  /** When provided, a hamburger button is shown to open the Drawer */
  onMenuPress?: () => void;
}

export default function Header({
  logoUrl,
  greeting = 'Good morning!',
  title,
  cartCount = 0,
  onCartPress,
  onMenuPress,
}: Props) {
  return (
    <View style={styles.container}>
      {onMenuPress != null && (
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress} activeOpacity={0.7}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      )}

      <View style={styles.left}>
        {logoUrl != null && (
          <Image source={{ uri: logoUrl }} style={styles.logo} resizeMode="contain" />
        )}
        <View style={styles.textBlock}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cartButton} onPress={onCartPress} activeOpacity={0.7}>
        <BagIcon size={22} color={COLORS.textWhite} />
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount > 9 ? '9+' : cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: Platform.select({ ios: 0, android: 8 }),
    paddingBottom: 8,
  },
  menuButton: {
    marginTop: 4,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  menuIcon: {
    color: COLORS.textWhite,
    fontSize: 22,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  textBlock: {
    flex: 1,
  },
  greeting: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular,
    marginBottom: 2,
  },
  title: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: 30,
  },
  cartButton: {
    marginTop: 4,
    position: 'relative',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: COLORS.badge,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
});
