import { Transaction } from "../../screens/Dashboard";
import { categories } from "../../global/utils/categories";

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
    categoryId,
    date,
  }
}: Props) {
  if (type === 'withdraw') {
    amount = `- ${amount}`
  }

  const category = categories.find(category => category.id === categoryId);

  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={type}>{amount}</Amount>
      <Footer>
        <Category>
          <Icon name={category?.icon ?? 'meh'} />
          <CategoryName>
            {category?.name ?? 'Categoria não encontrada'}
          </CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
