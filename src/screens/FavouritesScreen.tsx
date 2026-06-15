import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';
import SearchBar from '../components/SearchBar';
import CoffeeCard from '../components/CoffeeCard';
import type { CoffeeItem } from '../navigation/types';

const ALL_COFFEE: CoffeeItem[] = [
  {
    id: '1',
    name: 'Caffe Mocha',
    type: 'Deep Foam',
    price: 4.53,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    isFavourite: true,
  },
  {
    id: '2',
    name: 'Flat White',
    type: 'Espresso',
    price: 3.53,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    isFavourite: true,
  },
  {
    id: '3',
    name: 'Cappuccino',
    type: 'With Steamed Milk',
    price: 4.00,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?w=400',
    isFavourite: false,
  },
  {
    id: '4',
    name: 'Americano',
    type: 'Black',
    price: 2.99,
    rating: 4.3,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
    isFavourite: false,
  },
];

export default function FavouritesScreen() {
  const [items, setItems] = useState<CoffeeItem[]>(ALL_COFFEE);
  const [query, setQuery] = useState('');

  const favourites = items.filter(item => item.isFavourite);

  const filtered = query.trim().length === 0
    ? favourites
    : favourites.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase()),
      );

  const toggleFav = (id: string) => {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, isFavourite: !item.isFavourite } : item),
    );
  };

  const pairs: CoffeeItem[][] = filtered.reduce(
    (rows: CoffeeItem[][], item: CoffeeItem, i: number) => {
      if (i % 2 === 0) { rows.push([item]); }
      else { rows[rows.length - 1].push(item); }
      return rows;
    },
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <Text style={styles.title}>Favourites</Text>

      <View style={styles.searchWrap}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onFilterPress={() => {}}
          suggestions={[]}
        />
      </View>

      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyText}>
          {query.trim().length > 0 ? `No results for "${query}"` : 'No favourites yet'}
        </Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {pairs.map((pair, rowIdx) => (
            <View key={rowIdx} style={styles.row}>
              {pair.map(item => (
                <CoffeeCard
                  key={item.id}
                  name={item.name}
                  type={item.type}
                  price={item.price}
                  rating={item.rating}
                  imageUrl={item.imageUrl}
                  isFavourite={item.isFavourite}
                  onPress={() => {}}
                  onAddToCart={() => {}}
                  onToggleFavourite={() => toggleFav(item.id)}
                />
              ))}
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  title: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  searchWrap: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  grid: {
    paddingHorizontal: 24,
    gap: 12,
    paddingBottom: 100,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyIcon: {
    fontSize: 48,
    color: COLORS.favorite,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.md,
  },
});
