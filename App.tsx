/**
 * App — root component.
 *
 * Navigation tree:
 *   GestureHandlerRootView   (required by react-native-gesture-handler v3+)
 *     └── RootNavigator
 *           └── NavigationContainer
 *                 └── DrawerNavigator          (swipe-from-left drawer)
 *                       ├── TabNavigator       (Home / Cart / Profile tabs)
 *                       │     ├── HomeStack    (Home → CoffeeDetails)
 *                       │     ├── CartScreen
 *                       │     └── ProfileStack (Profile → Settings)
 *                       ├── HelpScreen
 *                       └── ContactsScreen
 */
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    // GestureHandlerRootView must be at the very root for drawer swipe
    // gestures and other touch interactions to work correctly.
    <GestureHandlerRootView style={styles.root}>
      <RootNavigator />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
