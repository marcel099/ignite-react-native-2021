import { useState } from "react";
import { Modal } from "react-native";

import { Button } from "../../components/form/Button";
import { CategorySelectButton } from "../../components/form/CategorySelectButton";
import { Input } from "../../components/form/Input";
import { TransactionTypeButton } from "../../components/form/TransactionTypeButton";
import { CategorySelectModal } from "../CategorySelectModal";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypeContainer,
} from "./styles";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export type CategoryDTO = Pick<Category, 'id' | 'name'>;

export type TransactionType = 'deposit' | 'withdraw';

export function Register() {
  const [
    selectedTransactionType, setSelectedTransactionType
  ] = useState<TransactionType | null>(null);
  const [
    selectedCategory, setSelectedCategory
  ] = useState<CategoryDTO | null>(null);
  const [
    isCategoryModalOpen, setIsCategoryModalOpen
  ] = useState(false);

  function handleTransactionTypeSelect(
    newTansactionType: TransactionType
  ) {
    setSelectedTransactionType(newTansactionType);
  }

  function handleOpenCategorySelectModal() {
    setIsCategoryModalOpen(true);
  }

  function handleCloseCategorySelectModal() {
    setIsCategoryModalOpen(false);
  }

  function handleRegisterTransaction() {
    const data = {
      selectedTransactionType,
      category: selectedCategory?.id,
    };

    console.log(data);
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

          <CategorySelectButton
            title={selectedCategory?.name ?? 'Categoria'}
            onPress={handleOpenCategorySelectModal}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={isCategoryModalOpen}>
        <CategorySelectModal
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          closeCategorySelectModal={handleCloseCategorySelectModal}
        />
      </Modal>
    </Container>
  );
}
