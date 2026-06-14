import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';

interface Props {
  tag?: string;
  title: string;
  imageUrl: string;
  onPress?: () => void;
}

export default function PromoBanner({ tag = 'Promo', title, imageUrl, onPress }: Props) {
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={[styles.container, { width: width - 48 }]}
        imageStyle={styles.image}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(139,79,37,0.55)',
    borderRadius: 16,
  },
  content: {
    padding: 16,
  },
  tag: {
    backgroundColor: COLORS.favorite,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  tagText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  title: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: 28,
  },
});
