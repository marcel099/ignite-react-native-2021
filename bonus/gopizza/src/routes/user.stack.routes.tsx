import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { Product } from '@screens/Product';

export type UserStackParamList = {
  Home: undefined;
  Product: {
    id?: string;
  };
  Order: {
    id?: string;
  };
  Orders: undefined;
}

export type UserStackScreenProp<T extends keyof UserStackParamList>
  = NativeStackScreenProps<UserStackParamList, T>;

const { Navigator, Screen } =
  createNativeStackNavigator<UserStackParamList>();

export function UserStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Product" component={Product} />
    </Navigator>
  )
}