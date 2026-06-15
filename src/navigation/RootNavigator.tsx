/**
 * RootNavigator — wraps the entire navigation tree inside NavigationContainer.
 * Only one NavigationContainer should exist per app.
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigator from './DrawerNavigator';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
