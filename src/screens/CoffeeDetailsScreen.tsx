import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { COLORS } from '../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';
import CustomButton from '../components/CustomButton';
import { HeartIcon, StarIcon } from '../components/Icons';
import { SCREENS } from '../navigation/SCREENS';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, typeof SCREENS.COFFEE_DETAILS>;

const SIZES = [
  { id: 'S', label: 'S', price: -0.5 },
  { id: 'M', label: 'M', price: 0 },
  { id: 'L', label: 'L', price: 0.7 },
];

export default function CoffeeDetailsScreen({ route, navigation }: Props) {
  // Task 3: receive params passed from HomeScreen (full CoffeeItem).
  // Hooks must run before any conditional return — use optional chaining.
  const params = route.params;
  const [selectedSize, setSelectedSize] = useState('M');
  const [favourite, setFavourite] = useState(params?.isFavourite ?? false);

  // Task 5 error handling: navigate back if params are missing
  if (!params) {
    navigation.goBack();
    return null;
  }

  const { name, type, price, rating, imageUrl } = params;
  const sizeOffset = SIZES.find(s => s.id === selectedSize)?.price ?? 0;
  const finalPrice = price + sizeOffset;

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.heroImage} resizeMode="cover" />

          {/* Custom back button — Task 4 */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          {/* Favourite toggle */}
          <TouchableOpacity
            style={styles.favButton}
            onPress={() => setFavourite(p => !p)}
            activeOpacity={0.8}>
            <HeartIcon size={22} color={favourite ? COLORS.favorite : COLORS.textWhite} />
          </TouchableOpacity>

          {/* Rating badge */}
          <View style={styles.ratingBadge}>
            <StarIcon size={14} color={COLORS.textWhite} />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.type}>{type}</Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>
            A rich and smooth coffee crafted with premium beans sourced from the
            finest highlands. Every sip delivers a bold flavour balanced with
            subtle sweetness — perfect for your morning ritual or an afternoon
            pick‑me‑up.
          </Text>

          {/* Size selector */}
          <Text style={styles.sectionLabel}>Size</Text>
          <View style={styles.sizeRow}>
            {SIZES.map(size => (
              <TouchableOpacity
                key={size.id}
                style={[styles.sizeChip, selectedSize === size.id && styles.sizeChipActive]}
                onPress={() => setSelectedSize(size.id)}
                activeOpacity={0.8}>
                <Text style={[styles.sizeLabel, selectedSize === size.id && styles.sizeLabelActive]}>
                  {size.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price + CTA */}
          <View style={styles.footer}>
            <View>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>$ {finalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.ctaWrapper}>
              <CustomButton title="Buy Now" icon="🛒" onPress={() => {}} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    width: '100%',
    height: 320,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: Platform.select({ ios: 52, android: 16 }),
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: COLORS.textWhite,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: FONT_WEIGHT.bold,
    marginLeft: -2,
  },
  favButton: {
    position: 'absolute',
    top: Platform.select({ ios: 52, android: 16 }),
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  ratingText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  body: {
    padding: 24,
    gap: 12,
  },
  titleRow: {
    marginBottom: 4,
  },
  name: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: 4,
  },
  type: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.md,
  },
  sectionLabel: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semiBold,
    marginTop: 8,
    marginBottom: 8,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    lineHeight: 22,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeChip: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(198,124,78,0.12)',
  },
  sizeLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  sizeLabelActive: {
    color: COLORS.primary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 16,
  },
  priceLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    marginBottom: 4,
  },
  price: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
  },
  ctaWrapper: {
    flex: 1,
  },
});
