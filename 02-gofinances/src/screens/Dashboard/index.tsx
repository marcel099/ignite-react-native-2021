import { HighlightCard } from '../../components/HighlightCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  UserPhoto,
  UserGreeting,
  Greeting,
  UserName,
  Icon,
  HighlightCards,
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
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
        </UserWrapper>


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
    </Container>
  );
}
