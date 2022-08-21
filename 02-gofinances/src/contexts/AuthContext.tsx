import { createContext, useContext, ReactNode, useState } from 'react';
import * as AuthSession from 'expo-auth-session';

import { googleOAuth } from '../global/configs/googleOAuth';

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextProps {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextProps);

interface GoogleAuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [signedInUser, setSignedInUser] = useState<User | null>(null);

  async function signInWithGoogle() {
    try {
      const {
        AUTH_URL,
        USER_INFO_URL,
        CLIENT_ID,
        RESPONSE_TYPE,
        REDIRECT_URI,
        SCOPE,
      } = googleOAuth;

      const authUrl =
        `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({
        authUrl,
      }) as GoogleAuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(
          `${USER_INFO_URL}?alt=json&access_token=${params.access_token}`
        );

        const userInfo = await response.json();

        setSignedInUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        });
      }
            
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{
      user: signedInUser,
      signInWithGoogle,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
