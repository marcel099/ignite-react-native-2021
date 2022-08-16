import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from "@expo/vector-icons"

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';

export type AppBottomParamList = {
  Dashboard: undefined;
  Register: undefined;
  // Summary: undefined;
};


const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        }
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Feather
              name="list"
              size={size}
              color={color}
            />
          )),
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Feather
              name="dollar-sign"
              size={size}
              color={color}
            />
          )),
        }}
      />
      <Screen
        name="Resumo"
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Feather
              name="pie-chart"
              size={size}
              color={color}
            />
          )),
        }}
      />
    </Navigator>
  )
}