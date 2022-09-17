import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SIGNED_IN_USER_COLLECTION } from '@configs/storage';

interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextData {
  user: User | null;
  isSigningIn: boolean; 
  signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
}

export function AuthContextProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  async function loadUser() {
    setIsSigningIn(true);

    const loadedUser =
      await AsyncStorage.getItem(SIGNED_IN_USER_COLLECTION);

    if (loadedUser !== null) {
      const userData = JSON.parse(loadedUser);
      console.log(userData);
      setUser(userData);
    }

    setIsSigningIn(false);
  }

  async function signIn(email: string, password: string) {
    try {
      if (!email || !password) {
        return Alert.alert('Login', 'Informe o e-mail e a senha.');
      }

      setIsSigningIn(true);

      const account = await auth()
        .signInWithEmailAndPassword(email, password);

      const profile = await firestore()
        .collection('users')
        .doc(account.user.uid)
        .get();

      const { name, isAdmin } = profile.data() as User;

      if (profile.exists) {
        const userData = {
          id: account.user.uid,
          name,
          isAdmin,
        }

        await AsyncStorage.setItem(
          SIGNED_IN_USER_COLLECTION,
          JSON.stringify(userData)
        );

        setUser(userData);
      }

    } catch (error: any) {
      if (error.code === 'auth/user-not-found'
       || error.code === 'auth/wrong-password') {
        Alert.alert('Login', 'E-mail e/ou senha inválida.')
      } else {
        console.log(error);
        Alert.alert('Login', 'Não foi possível realizar o login.')
      }
    } finally {
      setIsSigningIn(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isSigningIn,
      signIn,
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
