/**
 * DrawerNavigator — root-level Drawer navigator.
 *
 * Structure:
 *   DrawerNavigator
 *     ├── Main  → TabNavigator  (Home / Cart / Profile)
 *     ├── Help  → HelpScreen
 *     └── Contacts → ContactsScreen
 *
 * Opens via swipe-from-left or the ☰ button in the Header.
 */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { COLORS } from '../constants/colors';
import { SCREENS } from './SCREENS';
import type { DrawerParamList } from './types';

import TabNavigator from './TabNavigator';
import HelpScreen from '../screens/HelpScreen';
import ContactsScreen from '../screens/ContactsScreen';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: COLORS.surface,
          width: 280,
        },
        overlayColor: COLORS.overlay,
        swipeEnabled: true,
        swipeEdgeWidth: 40,
      }}>

      {/* Main tab-based app — default screen */}
      <Drawer.Screen name={SCREENS.MAIN} component={TabNavigator} />

      {/* Utility screens accessible from the drawer */}
      <Drawer.Screen name={SCREENS.HELP}     component={HelpScreen} />
      <Drawer.Screen name={SCREENS.CONTACTS} component={ContactsScreen} />
    </Drawer.Navigator>
  );
}
