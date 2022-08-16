import { useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../components/form/Button";
import { CategorySelectButton } from "../../components/form/CategorySelectButton";
import { InputRHF } from "../../components/form/InputRHF";
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

interface FormData {
  name: string;
  price: string;
}

const schema = Yup.object().shape({
  name: Yup
    .string().required('Nome é obrigatório'),
  price: Yup
    .number().typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
});

export function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

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

  function handleRegisterTransaction(form: FormData) {
    if (!selectedTransactionType) {
      return Alert.alert("Selecione o tipo da transação");
    }

    if (selectedCategory === null) {
      return Alert.alert("Selecione a categoria");
    }

    const data = {
      name: form.name,
      price: form.price,
      selectedTransactionType,
      category: selectedCategory?.id,
    };

    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputRHF
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name?.message}
            />
            <InputRHF
              name="price"
              control={control}
              placeholder="Preço"
              keyboardType="number-pad"
              error={errors.price?.message}
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
          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegisterTransaction)}
          />
        </Form>
        <Modal visible={isCategoryModalOpen}>
          <CategorySelectModal
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            closeCategorySelectModal={handleCloseCategorySelectModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
