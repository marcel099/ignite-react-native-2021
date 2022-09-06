import { ReactNode } from 'react';

import { AuthContextProvider } from './AuthContext';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthContextProvider>
      { children }
    </AuthContextProvider>
  )
}