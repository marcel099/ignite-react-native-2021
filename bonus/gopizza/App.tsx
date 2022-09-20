import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  DMSans_400Regular,
} from '@expo-google-fonts/dm-sans';
import {
  DMSerifDisplay_400Regular
} from '@expo-google-fonts/dm-serif-display';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'styled-components/native'

import { Home } from '@screens/Home';
import { AuthContextProvider } from "@contexts/AuthContext";
import { theme } from '@theme';

SplashScreen.preventAutoHideAsync();

export function App() {
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
    <>
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent
      />
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Home />
          </GestureHandlerRootView>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}

