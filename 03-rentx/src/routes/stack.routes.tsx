import {
  createStackNavigator
} from "@react-navigation/stack";

import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { ScheduleCompleted } from "../screens/ScheduleCompleted";
import { MyCars } from "../screens/MyCars";

import { CarDTO } from "../global/dtos/CarDTO";

export type AppStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: undefined;
  Home: undefined;
  CarDetails: {
    car: CarDTO;
  };
  Scheduling: {
    car: CarDTO;
  };
  SchedulingDetails: {
    car: CarDTO;
    dates: string[];
  };
  ScheduleCompleted: undefined;
  MyCars: undefined;
}

const { Navigator, Screen } = createStackNavigator<AppStackParamList>();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Screen
        name="Splash"
        component={Splash}
      />
      <Screen
        name="SignIn"
        component={SignIn}
      />
      <Screen
        name="SignUpFirstStep"
        component={SignUpFirstStep}
      />
      <Screen
        name="SignUpSecondStep"
        component={SignUpSecondStep}
      />
      <Screen
        name="Home"
        component={Home}
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
        name="ScheduleCompleted"
        component={ScheduleCompleted}
      />
      <Screen
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  )
}