// Screen name constants — use these everywhere instead of raw strings
export const SCREENS = {
  // Home stack
  HOME: 'Home',
  COFFEE_DETAILS: 'CoffeeDetails',
  CART: 'Cart',

  // Profile stack
  PROFILE: 'Profile',
  SETTINGS: 'Settings',

  // Standalone tab screens
  SEARCH: 'Search',
  FAVOURITES: 'Favourites',

  // Drawer root entries
  MAIN: 'Main',
  HELP: 'Help',
  CONTACTS: 'Contacts',
} as const;

export type ScreenName = (typeof SCREENS)[keyof typeof SCREENS];
