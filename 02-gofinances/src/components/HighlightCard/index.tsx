import {
  Container,
  Header,
  Title,
  Icon,
  Content,
  Amount,
  LastTransaction,
} from "./styles";

export type HightlightCardType = 'deposit' | 'withdraw' | 'total';

enum icon {
  deposit = "arrow-up-circle",
  withdraw = "arrow-down-circle",
  total = "dollar-sign",
}

interface Props {
  type: HightlightCardType;
  title: string;
  amount: string;
  lastTransaction: string;
}

export function HighlightCard({
  type,
  title,
  amount,
  lastTransaction,
}: Props) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>
      <Content>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Content>
    </Container>
  );
}
