import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";

import { theme } from "./src/global/styles/theme"
import { Routes } from "./src/routes";
import { AppProvider } from './src/contexts';
import { useAuth } from "./src/contexts/AuthContext";

export function App() {
  const { isLoadingUser } = useAuth();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  useEffect(() => {
    const showSplashScreen = async () => {
      await SplashScreen.preventAutoHideAsync();
    };

    showSplashScreen();
  }, []);

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    if (fontsLoaded && !isLoadingUser) {
      hideSplashScreen();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || isLoadingUser) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Routes />
        </GestureHandlerRootView>
      </AppProvider>
    </ThemeProvider>
  );
}
