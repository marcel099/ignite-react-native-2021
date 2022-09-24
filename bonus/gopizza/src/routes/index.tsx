import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@contexts/AuthContext';
import { SignIn } from '@screens/SignIn';
import { UserStackRoutes } from './user.stack.routes';
import { UserTabRoutes } from './user.tab.routes';

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      { user === null ? <SignIn /> : <UserStackRoutes />}
    </NavigationContainer>
  )
}