import { View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

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

interface Category {
  name: string;
  icon: string;
}

export type TransactionType = 'deposit' | 'withdraw';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  amount: string;
  category: Category;
  date: string;
}

export function Dashboard() {
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'deposit',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: 'Vendas', icon: 'dollar-sign' },
      date: "13/04/2022",
    },
    {
      id: '2',
      type: 'withdraw',
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: { name: 'Alimentação', icon: 'coffee' },
      date: "10/04/2022",
    },
    {
      id: '3',
      type: 'withdraw',
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: { name: 'Casa', icon: 'home' },
      date: "27/03/2022",
    },
];

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
