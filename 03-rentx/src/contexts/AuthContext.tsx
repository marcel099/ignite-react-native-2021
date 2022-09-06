import {
  createContext,
  ReactNode,
  useContext,
  useState
} from "react";

import { api } from "../services/api";

interface User {
  id: string;
  email: string;
  driver_license: string;
  avatar: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (data: SignInCredentials) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({
  children
}: AuthContextProviderProps) {
  const [authData, setAuthData] = useState<AuthState | null>(null);

  async function signIn({ email, password}: SignInCredentials) {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const {
      token,
      user: {
        id,
        driver_license,
        avatar,
      }
    } = response.data;

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuthData({
      token,
      user: {
        id,
        email,
        driver_license,
        avatar,
      }
    });
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      user: authData?.user ?? null,
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
