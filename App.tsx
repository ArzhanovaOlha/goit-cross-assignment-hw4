import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from './src/constants/colors';
import Header from './src/components/Header';
import SearchBar from './src/components/SearchBar';
import PromoBanner from './src/components/PromoBanner';
import CategoryList from './src/components/CategoryList';
import CoffeeCard from './src/components/CoffeeCard';
import BottomNavBar from './src/components/BottomNavBar';
import CustomButton from './src/components/CustomButton';

const CATEGORIES = [
  { id: 'all',       label: 'All Coffee' },
  { id: 'machiato',  label: 'Machiato' },
  { id: 'latte',     label: 'Latte' },
  { id: 'americano', label: 'Americano' },
  { id: 'espresso',  label: 'Espresso' },
];

const COFFEE_ITEMS = [
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

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'favorites' | 'profile'>('home');
  const [cartCount] = useState(9);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.root}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>

          {/* Header */}
          <Header
            logoUrl="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80"
            greeting="Good morning! ☕"
            title="What's your order?"
            cartCount={cartCount}
            onCartPress={() => {}}
          />

          {/* Search */}
          <View style={styles.section}>
            <SearchBar
              onFilterPress={() => {}}
              suggestions={['Caffe Mocha', 'Flat White', 'Cappuccino', 'Americano', 'Latte', 'Espresso', 'Machiato']}
            />
          </View>

          {/* Promo Banner */}
          <View style={styles.section}>
            <PromoBanner
              tag="Promo"
              title={'Buy one get\none FREE'}
              imageUrl="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
              onPress={() => {}}
            />
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <CategoryList
              categories={CATEGORIES}
              title="Categories"
              onSelect={() => {}}
              onSeeAll={() => {}}
            />
          </View>

          {/* Coffee grid */}
          <View style={styles.section}>
            <CategoryList
              categories={[]}
              title="Popular drinks"
              onSeeAll={() => {}}
            />
            <FlatList
              data={COFFEE_ITEMS}
              keyExtractor={item => item.id}
              numColumns={2}
              columnWrapperStyle={styles.row}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <CoffeeCard
                  name={item.name}
                  type={item.type}
                  price={item.price}
                  rating={item.rating}
                  imageUrl={item.imageUrl}
                  isFavourite={item.isFavourite}
                  onPress={() => {}}
                  onAddToCart={() => {}}
                />
              )}
            />
          </View>

          {/* Primary button demo */}
          <View style={styles.section}>
            <CustomButton title="Buy Now" icon="🛒" onPress={() => {}} />
          </View>
        </ScrollView>

        {/* Bottom nav always visible */}
        <BottomNavBar activeTab={activeTab} onTabPress={setActiveTab} />
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
    paddingBottom: 24,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  row: {
    gap: 12,
    marginBottom: 12,
  },
});
