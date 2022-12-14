import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../contexts/AuthContext';
import { TransactionsContextProvider } from '../contexts/TransactionsContext';
import { AuthRoutes } from "./auth.routes"; 
import { NonAuthRoutes } from "./nonAuth.routes"; 

export function AppRoutes() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {
        user === null ? (
          <NonAuthRoutes />
        ) : (
          // <TransactionsContextProvider>
            <AuthRoutes />
          // </TransactionsContextProvider>
        )
      }
    </NavigationContainer>
  );
}