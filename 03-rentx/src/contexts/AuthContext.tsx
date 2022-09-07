import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";

import { api } from "../services/api";
import { database } from "../database";
import { User } from "../database/models/User";

interface UserDTO {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: UserDTO | null;
  signIn: (data: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (userUpdateData: UserDTO) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({
  children
}: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(null);

  async function signIn({ email, password}: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });
  
      const {
        token,
        user: {
          id,
          name,
          driver_license,
          avatar,
        }
      } = response.data;
  
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const usersCollection = database.get<User>('users');
      await database.write(async () => {
        const newUser = await usersCollection.create(( userData ) => {
          userData.user_id = id;
          userData.name = name;
          userData.email = email;
          userData.driver_license = driver_license;
          userData.avatar = avatar;
          userData.token = token;
        });

        setUser({
          token,
          id: newUser.id,
          user_id: id,
          name,
          email,
          driver_license,
          avatar,
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      if (user === null) {
        throw new Error('Não é possível desconectar um usuário não conectado');
      }

      const userCollection = database.get<User>('users');
      await database.write(async () => {
        const foundUser = await userCollection.find(user.id);
        await foundUser.destroyPermanently();
      });

      setUser(null);
    } catch (error) {
      throw error;
    }
  }

  async function updateUser(userUpdateData: UserDTO) {
    try {
      const userCollection = database.get<User>('users');
      await database.write(async () => {
        const foundUser = await userCollection.find(userUpdateData.id);
        await foundUser.update(( userData ) => {
          userData.name = userUpdateData.name;
          userData.driver_license = userUpdateData.driver_license;
          userData.avatar = userUpdateData.avatar;
        });
      });

      setUser(userUpdateData);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    async function loadUser() {
      const userCollection = database.get<User>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const loadedUser = response[0]._raw as unknown as User;

        api.defaults.headers.common['Authorization'] =
          `Bearer ${loadedUser.token}`;
        setUser(loadedUser);
      }
    }

    loadUser();
  }, [])

  return (
    <AuthContext.Provider value={{
      user: user,
      signIn,
      signOut,
      updateUser,
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
