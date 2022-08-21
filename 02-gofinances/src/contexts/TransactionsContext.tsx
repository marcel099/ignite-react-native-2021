import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
} from "react";

import { useAuth } from "./AuthContext";
import {
  BASE_USER_TRANSACTIONS_COLLECTION
} from "../global/configs/storage";

interface TransactionsContextProps {
  USER_TRANSACTIONS_COLLECTION: string | null;
}

const TransactionsContext = createContext({} as TransactionsContextProps);

interface TransactionsContextProviderProps {
  children: ReactNode;
}

export function TransactionsContextProvider({ children }: TransactionsContextProviderProps) {
  const { user } = useAuth();

  const USER_TRANSACTIONS_COLLECTION = useMemo<string | null>(() => {
    if (user !== null) {
      return `${BASE_USER_TRANSACTIONS_COLLECTION}:${user.id}`
    } else {
      return null;
    }
  }, [user]);
  
  return (
    <TransactionsContext.Provider value={{
      USER_TRANSACTIONS_COLLECTION,
    }}>
      { children }
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext);
