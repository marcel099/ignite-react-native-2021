import { Transaction } from "../../screens/Dashboard";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

type TransactionDTO = Omit<Transaction, "id">;

interface Props {
  data: TransactionDTO;
}

export function TransactionCard({
  data: {
    type,
    title,
    amount,
    category,
    date,
  }
}: Props) {
  if (type === 'withdraw') {
    amount = `- ${amount}`
  }

  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={type}>{amount}</Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
