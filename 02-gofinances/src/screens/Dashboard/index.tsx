import { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import { AppLoader } from '../../components/AppLoader';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionsContext';
import {
  formatDateToLocaleDate,
  formatDateToLongDate,
  formatNumberToCurrency
} from '../../global/utils/formatters';

import {
  Container,
  Header,
  UserContainer,
  UserInfo,
  UserPhoto,
  UserGreeting,
  Greeting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  TransactionsContainer,
  Title,
  Transactions,
} from './styles';

export type TransactionType = 'deposit' | 'withdraw';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  amount: string;
  categoryId: string;
  date: string;
}

interface HighlightData {
  formattedAmount: string;
  message: string;
}

interface HighlightsData {
  profits: HighlightData;
  expenses: HighlightData;
  total: HighlightData;
}

export function Dashboard() {
  const { signOut, user } = useAuth();
  const { USER_TRANSACTIONS_COLLECTION } = useTransactions();

  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [highlightData, setHighlightData] =
    useState<HighlightsData | null>(null);

  function getLastTransactionFormattedDate(
    transactions: Transaction[],
    type: TransactionType
  ): string {
    try {
      const transactionsDateInTimestamp: number[] = transactions
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime());

      if (transactionsDateInTimestamp.length === 0) {
        return 'Não há transações';
      }

      const lastTransactionDate =
        Math.max.apply(Math, transactionsDateInTimestamp);

      const formattedLastTransactionDate =
        formatDateToLongDate(lastTransactionDate);

      return formattedLastTransactionDate;
    } catch(err) {
      console.log(err);
      return '';
    }
  }

  function getTransactionsIntervalMessage(
    transactions: Transaction[]
  ): string {
    try {
      const transactionsDateInTimestamp = transactions
        .map(transaction => new Date(transaction.date).getTime());

      if (transactionsDateInTimestamp.length === 0) {
        return 'Não há transações';
      }

      const firstTransactionDate =
        Math.min.apply(Math, transactionsDateInTimestamp);
      const lastTransactionDate =
        Math.max.apply(Math, transactionsDateInTimestamp);

      const formattedFirstTransactionDate =
        formatDateToLongDate(firstTransactionDate);

      const formattedLastTransactionDate =
        formatDateToLongDate(lastTransactionDate);

      return `${
        formattedFirstTransactionDate.replace(/ de \d{4}/, '')
      } à ${
        formattedLastTransactionDate.replace(/ de \d{4}/, '')
      }`;
    } catch(err) {
      console.log(err);
      return '';
    }
  }

  function updateHighlightCards(loadedTransactions: Transaction[]) {
    let profitsAmount = 0;
    let expensesAmount = 0;

    loadedTransactions.forEach((item) => {
      let numericAmount = Number(item.amount);

      if (item.type === 'deposit') {
        profitsAmount += numericAmount;
      } else {
        expensesAmount += numericAmount;
      }
    })

    const formattedProfitsAmount =
      formatNumberToCurrency(profitsAmount);
    const formattedExpensesAmount =
      formatNumberToCurrency(expensesAmount);
    const formattedTotalAmount =
      formatNumberToCurrency(profitsAmount - expensesAmount);

    const formattedLastProfitTransactionDate =
      getLastTransactionFormattedDate(loadedTransactions, 'deposit');

    const formattedLastExpenseTransactionDate =
      getLastTransactionFormattedDate(loadedTransactions, 'withdraw');

    const transactionsIntervalMessage =
      getTransactionsIntervalMessage(loadedTransactions);

    let profitMessage: string;
    if (formattedLastProfitTransactionDate === 'Não há transações') {
      profitMessage = formattedLastProfitTransactionDate;
    } else {
      profitMessage =
        `Última entrada dia ${formattedLastProfitTransactionDate}`;
    }

    let expenseMessage: string;
    if (formattedLastProfitTransactionDate === 'Não há transações') {
      expenseMessage = formattedLastProfitTransactionDate;
    } else {
      expenseMessage =
        `Última saída dia ${formattedLastExpenseTransactionDate}`;
    }

    setHighlightData({
      profits: {
        formattedAmount: formattedProfitsAmount,
        message: profitMessage,
      },
      expenses: {
        formattedAmount: formattedExpensesAmount,
        message: expenseMessage,
      },
      total: {
        formattedAmount: formattedTotalAmount,
        message: transactionsIntervalMessage,
      }
    });
  }

  async function loadTransactions() {
    if (isLoadingTransactions === false) {
      setIsLoadingTransactions(true);
    }

    if (USER_TRANSACTIONS_COLLECTION === null) {
      setIsLoadingTransactions(false);
      Alert.alert(
        "Erro no carregamento",
        "A lista de transações não pôde ser obtida."
      );
      
      return;
    }

    
    const data = 
      await AsyncStorage.getItem(USER_TRANSACTIONS_COLLECTION);

    let loadedTransactions: Transaction[] = [];

    if (data !== null) {
      loadedTransactions = JSON.parse(data);

      const formattedTransactions =
        loadedTransactions.map((item) => {
          const formattedAmount = formatNumberToCurrency(
            Number(item.amount)
          );
          const formattedDate = formatDateToLocaleDate(
            new Date(item.date)
          );

          return {
            ...item,
            amount: formattedAmount,
            date: formattedDate,
          }
        });

      setTransactions(formattedTransactions);
    }

    updateHighlightCards(loadedTransactions);
  
    setIsLoadingTransactions(false);
  }

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []));

  return (
    <Container>
      {
        isLoadingTransactions
        ? (
          <AppLoader />
        ) : (
          <>
            <Header>
              <UserContainer>
                <UserInfo>
                  <UserPhoto
                    source={{ uri: user?.picture }}
                  />
                  <UserGreeting>
                    <Greeting>Olá,</Greeting>
                    <UserName>{user?.name ?? ''}</UserName>
                  </UserGreeting>
                </UserInfo>
                <LogoutButton onPress={signOut}>
                  <Icon name="power" />
                </LogoutButton>
              </UserContainer>
            </Header>

            <HighlightCards>
              <HighlightCard
                type="deposit"
                title="Entradas"
                amount={highlightData?.profits.formattedAmount ?? ''}
                lastTransaction={highlightData?.profits.message ?? ''}
              />
              <HighlightCard
                type="withdraw"
                title="Saídas"
                amount={highlightData?.expenses.formattedAmount ?? ''}
                lastTransaction={highlightData?.expenses.message ?? ''}
              />
              <HighlightCard
                type="total"
                title="Total"
                amount={highlightData?.total.formattedAmount ?? ''}
                lastTransaction={highlightData?.total.message ?? ''}
              />
            </HighlightCards>

            <TransactionsContainer>
              <Title>Listagem</Title>
              <Transactions
                data={transactions}
                renderItem={({ item }) => <TransactionCard data={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: getBottomSpace() + 16,
                }}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
              />
            </TransactionsContainer>
          </>
        )
      }
    </Container>
  );
}
