/**
 * TabNavigator — bottom Tab navigation with three primary sections:
 * Home (coffee list), Cart, and Profile.
 *
 * Each tab that needs nested navigation embeds its own Stack.
 */
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLORS } from '../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';
import { HomeIcon, SearchIcon, HeartIcon, MoreIcon } from '../components/Icons';
import type { TabParamList } from './types';

import HomeStack from './HomeStack';
import SearchScreen from '../screens/SearchScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator<TabParamList>();

// Icon with active dot indicator
function TabIcon({ id, focused }: { id: keyof TabParamList; focused: boolean }) {
  const color = focused ? COLORS.primary : COLORS.textSecondary;
  const size = 22;
  return (
    <View style={styles.iconWrapper}>
      {id === 'TabHome'       && <HomeIcon   size={size} color={color} />}
      {id === 'TabSearch'     && <SearchIcon size={size} color={color} />}
      {id === 'TabFavourites' && <HeartIcon  size={size} color={color} />}
      {id === 'TabProfile'    && <MoreIcon   size={size} color={color} />}
      {focused && <View style={styles.activeDot} />}
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tab.Screen
        name="TabHome"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon id="TabHome" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="TabSearch"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ focused }) => <TabIcon id="TabSearch" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="TabFavourites"
        component={FavouritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ focused }) => <TabIcon id="TabFavourites" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="TabProfile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon id="TabProfile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 0,
    paddingTop: 8,
    paddingBottom: Platform.select({ ios: 24, android: 10 }),
    height: Platform.select({ ios: 84, android: 68 }),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: { elevation: 12 },
    }),
  },
  tabLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
    marginBottom: 4,
  },
  iconWrapper: {
    alignItems: 'center',
    gap: 4,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
});
