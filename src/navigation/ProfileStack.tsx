/**
 * ProfileStack — Stack navigation for the Profile tab.
 *
 * Flow:  ProfileScreen  →  SettingsScreen
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from './SCREENS';
import type { ProfileStackParamList } from './types';

import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
      <Stack.Screen
        name={SCREENS.SETTINGS}
        component={SettingsScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
