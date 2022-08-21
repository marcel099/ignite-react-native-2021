import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { AuthContextProvider } from './src/contexts/AuthContext';
import { theme } from './src/global/styles/theme';
import { AppRoutes } from "./src/routes";


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
      />
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <AppRoutes />
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}
