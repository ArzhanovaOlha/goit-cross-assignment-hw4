/**
 * HomeStack — Stack navigation for the Home tab.
 *
 * Flow:  HomeScreen  →  CoffeeDetailsScreen
 *
 * Both screens use custom headers (headerShown: false).
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from './SCREENS';
import type { HomeStackParamList } from './types';

import HomeScreen from '../screens/HomeScreen';
import CoffeeDetailsScreen from '../screens/CoffeeDetailsScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Stack.Screen
        name={SCREENS.COFFEE_DETAILS}
        component={CoffeeDetailsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name={SCREENS.CART}
        component={CartScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
