import { createContext, useContext, ReactNode, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

import { googleOAuth } from '../global/configs/googleOAuth';
import { SIGNED_IN_USER_COLLECTION } from '../global/configs/storage';

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextProps {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
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

  async function saveSignedInUser(user: User) {
    setSignedInUser(user);
    AsyncStorage.setItem(SIGNED_IN_USER_COLLECTION, JSON.stringify(user));
  }

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

        const signedInUser: User = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        };

        saveSignedInUser(signedInUser);
      }
            
    } catch (error) {
      throw error;
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if (credential) {
        const signedInUser: User = {
          id: String(credential.user),
          email: credential.email!,
          name: String(credential.fullName?.givenName ?? ''),
        }

        saveSignedInUser(signedInUser);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{
      user: signedInUser,
      signInWithGoogle,
      signInWithApple,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
