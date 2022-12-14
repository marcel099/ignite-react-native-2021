import { useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import uuid from "react-native-uuid";

import { useTransactions } from '../../contexts/TransactionsContext';
import { AppBottomTabParamList } from "../../routes/auth.routes";
import { AppScreenHeader } from "../../components/AppScreenHeader";
import { Button } from "../../components/form/Button";
import { CategorySelectButton } from "../../components/form/CategorySelectButton";
import { InputRHF } from "../../components/form/InputRHF";
import { TransactionTypeButton } from "../../components/form/TransactionTypeButton";
import { Transaction } from "../Dashboard";
import { CategorySelectModal } from "../CategorySelectModal";

import {
  Container,
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

export type CategoryDTO = Pick<Category, 'id' | 'name' | 'icon'>;

export type TransactionType = 'deposit' | 'withdraw';

interface FormData {
  title: string;
  amount: string;
}

const schema = Yup.object().shape({
  title: Yup
    .string().required('Título é obrigatório'),
  amount: Yup
    .number().typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
});

type RegisterScreenProp =
  NavigationProp<AppBottomTabParamList, 'Cadastrar'>;

export function Register() {
  const navigation = useNavigation<RegisterScreenProp>();
  const { USER_TRANSACTIONS_COLLECTION } = useTransactions();

  const {
    control,
    handleSubmit,
    reset,
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
    // setTimeout(() => {
    setIsCategoryModalOpen(true);
    // }, 1000);
  }

  function handleCloseCategorySelectModal() {
    setIsCategoryModalOpen(false);
  }

  function resetForm() {
    setSelectedTransactionType(null);
    setSelectedCategory(null);

    reset();
  }

  async function handleRegisterTransaction(form: FormData) {
    if (!selectedTransactionType) {
      return Alert.alert("Selecione o tipo da transação");
    }

    if (selectedCategory === null) {
      return Alert.alert("Selecione a categoria");
    }

    const newTransaction: Transaction = {
      id: String(uuid.v4()),
      title: form.title,
      amount: form.amount,
      type: selectedTransactionType,
      categoryId: selectedCategory.id,
      date: new Date().toJSON(),
    };

    try {
      if (USER_TRANSACTIONS_COLLECTION === null) {
        Alert.alert(
          "Erro ao salvar",
          "Não foi possível salvar a transação."
        );

        return;
      }

      const data = 
        await AsyncStorage.getItem(USER_TRANSACTIONS_COLLECTION);

      let currentTransactions = JSON.parse(data!);

      if (currentTransactions !== null) {
        currentTransactions.push(newTransaction);
      } else {
        currentTransactions = [newTransaction]
      }

      await AsyncStorage.setItem(
        USER_TRANSACTIONS_COLLECTION,
        JSON.stringify(currentTransactions)
      );

      resetForm();

      navigation.navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <AppScreenHeader title="Cadastro" />
          <Form>
            <Fields>
              <InputRHF
                name="title"
                control={control}
                placeholder="Título"
                autoCapitalize="sentences"
                autoCorrect={false}
                error={errors.title?.message}
              />
              <InputRHF
                name="amount"
                control={control}
                placeholder="Preço"
                keyboardType="number-pad"
                error={errors.amount?.message}
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
                testID="category-select-button"
                name={selectedCategory?.name ?? 'Categoria'}
                onPress={handleOpenCategorySelectModal}
              />
            </Fields>
            <Button
              title="Enviar"
              onPress={handleSubmit(handleRegisterTransaction)}
            />
          </Form>
        </Container>
      </TouchableWithoutFeedback>
      <Modal
        testID="category-modal"
        visible={isCategoryModalOpen}
        statusBarTranslucent
      >
        <CategorySelectModal
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          closeCategorySelectModal={handleCloseCategorySelectModal}
        />
      </Modal>
    </>
  );
}
