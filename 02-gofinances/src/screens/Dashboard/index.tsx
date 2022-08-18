import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
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
  Transactions
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

export function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const data = 
      await AsyncStorage.getItem(TRANSACTIONS_COLLECTION);

    if (data !== null) {
      let loadedTransactions = JSON.parse(data) as Transaction[];

      const formattedTransactions =
        loadedTransactions.map((item) => {
          const formattedAmount = Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(item.amount));

          const formattedDate = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).format(new Date(item.date));

          return {
            ...item,
            amount: formattedAmount,
            date: formattedDate,
          }
        });
  
      setTransactions(formattedTransactions);
    }
  }

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []));

  return (
    <Container>
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
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="withdraw"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última entrada dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
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
    </Container>
  );
}
