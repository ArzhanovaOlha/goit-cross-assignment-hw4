import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerActions } from '@react-navigation/native';

import { COLORS } from '../constants/colors';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import PromoBanner from '../components/PromoBanner';
import CategoryList from '../components/CategoryList';
import CoffeeCard from '../components/CoffeeCard';
import { SCREENS } from '../navigation/SCREENS';
import type { HomeStackParamList, CoffeeItem } from '../navigation/types';

const CATEGORIES = [
  { id: 'all',       label: 'All Coffee' },
  { id: 'machiato',  label: 'Machiato' },
  { id: 'latte',     label: 'Latte' },
  { id: 'americano', label: 'Americano' },
  { id: 'espresso',  label: 'Espresso' },
];

const COFFEE_ITEMS: CoffeeItem[] = [
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
    isFavourite: false,
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

type Props = NativeStackScreenProps<HomeStackParamList, typeof SCREENS.HOME>;

export default function HomeScreen({ navigation }: Props) {
  const [cartCount] = useState(2);

  const openDetails = (item: CoffeeItem) => {
    // Task 3: pass the full coffee item as navigation params
    navigation.navigate(SCREENS.COFFEE_DETAILS, item);
  };

  // Pre-compute pairs to avoid FlatList-inside-ScrollView touch conflicts
  const coffeePairs: CoffeeItem[][] = COFFEE_ITEMS.reduce(
    (rows: CoffeeItem[][], item: CoffeeItem, i: number) => {
      if (i % 2 === 0) { rows.push([item]); }
      else { rows[rows.length - 1].push(item); }
      return rows;
    },
    [],
  );

  // edges={['top']}: bottom inset handled by the absolute tab bar
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.root}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>

          <Header
            logoUrl="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80"
            greeting="Good morning! ☕"
            title="What's your order?"
            cartCount={cartCount}
            onCartPress={() => navigation.navigate(SCREENS.CART)}
            // DrawerActions bubbles up to the nearest DrawerNavigator
            onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />

          <View style={styles.section}>
            <SearchBar
              onFilterPress={() => {}}
              suggestions={['Caffe Mocha', 'Flat White', 'Cappuccino', 'Americano', 'Latte', 'Espresso', 'Machiato']}
            />
          </View>

          <View style={styles.section}>
            <PromoBanner
              tag="Promo"
              title={'Buy one get\none FREE'}
              imageUrl="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
              onPress={() => {}}
            />
          </View>

          <View style={styles.section}>
            <CategoryList
              categories={CATEGORIES}
              title="Categories"
              onSelect={() => {}}
              onSeeAll={() => {}}
            />
          </View>

          <View style={styles.section}>
            <CategoryList
              categories={[]}
              title="Popular drinks"
              onSeeAll={() => {}}
            />
            <View style={styles.grid}>
              {coffeePairs.map((pair, rowIdx) => (
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
                      onPress={() => openDetails(item)}
                      onAddToCart={() => openDetails(item)}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    // Extra space so the last row isn't hidden under the absolute tab bar
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  grid: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
});
