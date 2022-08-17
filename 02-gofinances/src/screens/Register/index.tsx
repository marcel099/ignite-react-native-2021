import { useEffect, useState } from "react";
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

import { TRANSACTIONS_COLLECTION } from "../../global/configs/storage";
import { AppBottomTabParamList } from "../../routes/app.routes";
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

type RegisterScreenProp =
  NavigationProp<AppBottomTabParamList, 'Cadastrar'>;

export function Register() {
  const navigation = useNavigation<RegisterScreenProp>();

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
    setIsCategoryModalOpen(true);
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

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      price: form.price,
      selectedTransactionType,
      category: selectedCategory?.id,
      date: new Date(),
    };

    try {
      const data = 
        await AsyncStorage.getItem(TRANSACTIONS_COLLECTION);

      let currentTransactions = JSON.parse(data!);

      if (currentTransactions !== null) {
        currentTransactions.push(newTransaction);
      } else {
        currentTransactions = [newTransaction]
      }

      await AsyncStorage.setItem(
        TRANSACTIONS_COLLECTION,
        JSON.stringify(currentTransactions)
      );

      resetForm();

      console.log(navigation);

      navigation.navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  useEffect(() => {
    AsyncStorage.getItem(TRANSACTIONS_COLLECTION) 
      .then(console.log)
  }, []);

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
