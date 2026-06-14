import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';
import { HeartIcon, StarIcon } from './Icons';

interface Props {
  name: string;
  type: string;
  price: number;
  rating?: number;
  imageUrl: string;
  isFavourite?: boolean;
  onPress?: () => void;
  onAddToCart?: () => void;
  onToggleFavourite?: () => void;
}

export default function CoffeeCard({
  name,
  type,
  price,
  rating,
  imageUrl,
  isFavourite = false,
  onPress,
  onAddToCart,
  onToggleFavourite,
}: Props) {
  const [favourite, setFavourite] = useState(isFavourite);
  const { width } = useWindowDimensions();
  // Two columns with gap and padding
  const cardWidth = (width - 48 - 12) / 2;

  const toggleFav = () => {
    setFavourite(prev => !prev);
    onToggleFavourite?.();
  };

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={onPress}
      activeOpacity={0.9}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        <TouchableOpacity style={styles.heartButton} onPress={toggleFav} activeOpacity={0.8}>
          <HeartIcon size={20} color={favourite ? COLORS.favorite : COLORS.textSecondary} />
        </TouchableOpacity>
        {rating != null && (
          <View style={styles.ratingBadge}>
            <StarIcon size={10} color={COLORS.textWhite} />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        )}
      </View>

      <View style={styles.details}>
        <View style={styles.textBlock}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.type} numberOfLines={1}>{type}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>$ {price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addButton} onPress={onAddToCart} activeOpacity={0.8}>
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.background,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  imageWrapper: {
    width: '100%',
    height: 128,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  details: {
    padding: 12,
  },
  textBlock: {
    marginBottom: 8,
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semiBold,
    marginBottom: 2,
  },
  type: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.xs,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
  },
  addButton: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    color: COLORS.textWhite,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: FONT_WEIGHT.medium,
  },
});
