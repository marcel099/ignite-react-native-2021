import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';

import { BottomMenu } from '@components/BottomMenu';
import { Home } from '@screens/Home';
import { Orders } from '@screens/Orders';

export type UserTabParamList = {
  Home: undefined;
  Orders: undefined;
}

export type UserTabScreenProp<T extends keyof UserTabParamList>
  = BottomTabScreenProps<UserTabParamList, T>;

const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.COLORS.SECONDARY_900,
        tabBarInactiveTintColor: theme.COLORS.SECONDARY_400,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        }
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Cardápio" color={color} />
          )
        }}
      />
      <Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Pedidos" color={color} notifications="0"/>
          )
        }}
      />
    </Navigator>
  );
}