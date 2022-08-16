import { useState } from "react";
import { Button } from "../../components/form/Button";
import { CategorySelect } from "../../components/form/CategorySelect";
import { Input } from "../../components/form/Input";
import { TransactionTypeButton } from "../../components/form/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypeContainer,
} from "./styles";

export type TransactionType = 'deposit' | 'withdraw';

export function Register() {
  const [
    selectedTransactionType, setSelectedTransactionType
  ] = useState<TransactionType | null>(null);

  function handleTransactionTypeSelect(
    newTansactionType: TransactionType
  ) {
    setSelectedTransactionType(newTansactionType);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input
            placeholder="Nome"
          />
          <Input
            placeholder="Preço"
          />

          <TransactionTypeContainer>
            <TransactionTypeButton
              title="Entrada"
              type="deposit"
              onPress={() => handleTransactionTypeSelect('deposit')}
              isActive={selectedTransactionType === 'deposit'}
            />
            <TransactionTypeButton
              title="Saída"
              type="withdraw"
              onPress={() => handleTransactionTypeSelect('withdraw')}
              isActive={selectedTransactionType === 'withdraw'}
            />
          </TransactionTypeContainer>

          <CategorySelect title="Categoria" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
