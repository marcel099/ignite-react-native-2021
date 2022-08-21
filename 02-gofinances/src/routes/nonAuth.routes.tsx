import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';

export type NonAuthStackParamList = {
  SignIn: undefined;
};

const { Navigator, Screen } = createStackNavigator<NonAuthStackParamList>();

export function NonAuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="SignIn"
        component={SignIn}
      />
    </Navigator>
  )
}