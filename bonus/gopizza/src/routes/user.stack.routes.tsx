import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { useAuth } from '@contexts/AuthContext';

import { Home } from '@screens/Home';
import { Product } from '@screens/Product';
import { Order } from '@screens/Order';

import { UserTabRoutes } from './user.tab.routes';

export type UserStackParamList = {
  Home: undefined;
  Product: {
    id?: string;
  };
  Order: {
    id?: string;
  };
  UserTabRoutes: undefined;
}

export type UserStackScreenProp<T extends keyof UserStackParamList>
  = NativeStackScreenProps<UserStackParamList, T>;

const { Navigator, Screen, Group } =
  createNativeStackNavigator<UserStackParamList>();

export function UserStackRoutes() {
  const { user } = useAuth();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      {
        user?.isAdmin ? (
          <Group>
            <Screen name="Home" component={Home} />
            <Screen name="Product" component={Product} />
          </Group>
        ) : (
          <Group>
            <Screen name="UserTabRoutes" component={UserTabRoutes} />
            <Screen name="Order" component={Order} />
          </Group>
        )
      }
    </Navigator>
  )
}