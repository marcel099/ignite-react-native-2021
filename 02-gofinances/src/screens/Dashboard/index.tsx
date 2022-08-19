import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import { AppLoader } from '../../components/AppLoader';
import {
  formatDateToLocaleDate,
  formatDateToLongDate,
  formatNumberToCurrency
} from '../../global/utils/formatters';
import { TRANSACTIONS_COLLECTION } from '../../global/configs/storage';

import {
  Container,
  Header,
  UserContainer,
  UserInfo,
  UserPhoto,
  UserGreeting,
  Greeting,
  UserName,
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
  const theme = useTheme();

  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [highlightData, setHighlightData] =
    useState<HighlightsData | null>(null);

  function getLastTransactionFormattedDate(
    transactions: Transaction[],
    type: TransactionType
  ): string {
    try {
      const transactionsDateInTimestamp = transactions
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime());

      const lastTransactionDate =
        Math.max.apply(Math, transactionsDateInTimestamp);

      const formattedLastExpenseTransactionDate =
        formatDateToLongDate(lastTransactionDate);

      return formattedLastExpenseTransactionDate;
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

  async function loadTransactions() {
    if (isLoadingTransactions === false) {
      setIsLoadingTransactions(true);
    }

    const data = 
      await AsyncStorage.getItem(TRANSACTIONS_COLLECTION);

    if (data !== null) {
      let profitsAmount = 0;
      let expensesAmount = 0;

      let loadedTransactions = JSON.parse(data) as Transaction[];

      const formattedTransactions =
        loadedTransactions.map((item) => {
          let numericAmount = Number(item.amount);

          if (item.type === 'deposit') {
            profitsAmount += numericAmount;
          } else {
            expensesAmount += numericAmount;
          }

          const formattedAmount = formatNumberToCurrency(numericAmount);
          const formattedDate = formatDateToLocaleDate(
            new Date(item.date)
          );

          return {
            ...item,
            amount: formattedAmount,
            date: formattedDate,
          }
        });

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
  
      setTransactions(formattedTransactions);
      setHighlightData({
        profits: {
          formattedAmount: formattedProfitsAmount,
          message:
            `Última entrada dia ${formattedLastProfitTransactionDate}`,
        },
        expenses: {
          formattedAmount: formattedExpensesAmount,
          message:
            `Última saída dia ${formattedLastExpenseTransactionDate}`,
        },
        total: {
          formattedAmount: formattedTotalAmount,
          message: transactionsIntervalMessage,
        }
      });
      setIsLoadingTransactions(false);
    }
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
                    source={{ uri: 'https://github.com/marcel099.png' }}
                  />
                  <UserGreeting>
                    <Greeting>Olá,</Greeting>
                    <UserName>Marcelo</UserName>
                  </UserGreeting>
                </UserInfo>
                <Icon name="power" />
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
