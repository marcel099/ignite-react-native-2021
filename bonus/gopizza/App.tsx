import React, { useEffect } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {
  DMSans_400Regular,
} from '@expo-google-fonts/dm-sans';
import {
  DMSerifDisplay_400Regular
} from '@expo-google-fonts/dm-serif-display';
import { useFonts } from "expo-font";
import { ThemeProvider } from 'styled-components/native'

import { theme } from '@theme';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [hasFontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    if (hasFontsLoaded) {
      hideSplashScreen();
    }
  }, [hasFontsLoaded])

  if (!hasFontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <View>
        {/* <Test /> */}
      </View>
    </ThemeProvider>
  );
}

