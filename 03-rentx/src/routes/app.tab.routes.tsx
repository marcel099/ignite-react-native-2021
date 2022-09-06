import React from 'react';
import { Platform } from 'react-native';
import { NavigatorScreenParams } from '@react-navigation/native';
import {
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { useTheme } from 'styled-components';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

import { MyCars } from "../screens/MyCars";
import { Profile } from '../screens/Profile';
import {
  AppHomeStackParamList,
  AppHomeStackRoutes
} from "./appHome.stack.routes";

export type AppTabParamList = {
  Home: NavigatorScreenParams<AppHomeStackParamList>;
  Profile: undefined;
  MyCars: undefined;
}

const { Navigator, Screen } = createBottomTabNavigator<AppTabParamList>();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_details,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 78,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          backgroundColor: theme.colors.background_primary,
        }
      }}
    >
      <Screen
        name="Home"
        component={AppHomeStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} color={color} />
          )
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} color={color} />
          )
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg width={24} height={24} color={color} />
          )
        }}
      />
    </Navigator>
  )
}