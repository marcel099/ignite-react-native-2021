import React from 'react';

import {
  createStackNavigator, StackScreenProps
} from "@react-navigation/stack";

import { Cars } from "../screens/Cars";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { Confirmation } from "../screens/Confirmation";

import { CarModelDTO } from "../database/models/Car";

export type AppHomeStackParamList = {
  Cars: undefined;
  CarDetails: {
    car: CarModelDTO;
  };
  Scheduling: {
    car: CarModelDTO;
  };
  SchedulingDetails: {
    car: CarModelDTO;
    dates: string[];
  };
  Confirmation: {
    title: string;
    message: string;
    nextScreenName: keyof AppHomeStackParamList;
  };
}

export type AppHomeStackScreenProp<T extends keyof AppHomeStackParamList>
  = StackScreenProps<AppHomeStackParamList, T>;

const { Navigator, Screen } = createStackNavigator<AppHomeStackParamList>();

export function AppHomeStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Cars"
    >
      <Screen
        name="Cars"
        component={Cars}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen
        name="CarDetails"
        component={CarDetails}
      />
      <Screen
        name="Scheduling"
        component={Scheduling}
      />
      <Screen
        name="SchedulingDetails"
        component={SchedulingDetails}
      />
      <Screen
        name="Confirmation"
        component={Confirmation}
      />
    </Navigator>
  )
}