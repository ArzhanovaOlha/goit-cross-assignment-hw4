import { SCREENS } from './SCREENS';

// Coffee item shape shared between screens
export interface CoffeeItem {
  id: string;
  name: string;
  type: string;
  price: number;
  rating: number;
  imageUrl: string;
  isFavourite: boolean;
}

// Stack: Home → Coffee Details → Cart
export type HomeStackParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.COFFEE_DETAILS]: CoffeeItem;
  [SCREENS.CART]: undefined;
};

// Stack: Profile → Settings
export type ProfileStackParamList = {
  [SCREENS.PROFILE]: undefined;
  [SCREENS.SETTINGS]: undefined;
};

// Bottom Tab navigator
export type TabParamList = {
  TabHome: undefined;
  TabSearch: undefined;
  TabFavourites: undefined;
  TabProfile: undefined;
};

// Drawer navigator (top-level)
export type DrawerParamList = {
  [SCREENS.MAIN]: undefined;
  [SCREENS.HELP]: undefined;
  [SCREENS.CONTACTS]: undefined;
};
