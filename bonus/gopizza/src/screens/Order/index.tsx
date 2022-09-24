import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from '@contexts/AuthContext';
import { BackButton } from '@components/BackButton';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { RadioButton } from '@components/RadioButton';
import { UserStackScreenProp } from '@routes/user.stack.routes';
import { pizzaTypes } from '@utils/pizzaTypes';

import {
  Container,
  ContentScroll,
  Header,
  Photo,
  Sizes,
  Form,
  Title,
  Label,
  FormRow,
  InputGroup,
  Price,
} from './styles';

interface ProductDTO {
  name: string;
  description: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
  photo_url: string;
  photo_path: string;
}

type PizzaTypes = 'p' | 'm' | 'g';

export function Order() {
  const navigation = 
    useNavigation<UserStackScreenProp<'Order'>['navigation']>();
  const { params: { id } } = 
    useRoute<UserStackScreenProp<'Order'>['route']>();

  const { user } = useAuth();

  const [pizza, setPizza] = useState<ProductDTO | null>(null);
  const [selectedPizzaTypeId, setSelectedPizzaTypeId]
    = useState<PizzaTypes | null>(null);
  const [tableNumber, setTableNumber] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const totalPrice = useMemo(() => {
    if (pizza === null || selectedPizzaTypeId === null) {
      return 0;
    }

    return Number(pizza.prices_sizes[selectedPizzaTypeId]) * quantity;
  }, [pizza, selectedPizzaTypeId, quantity]);
  
  async function handleGoBack() {
    navigation.pop();
  }

  async function handleOrder() {
    if (selectedPizzaTypeId === null) {
      Alert.alert('Pedido', 'Selecione o tamanho da pizza.')
    }

    if (!tableNumber) {
      Alert.alert('Pedido', 'Informe o número da mesa.')
    }

    if (!quantity) {
      Alert.alert('Pedido', 'Informe a quantidade.')
    }

    try {
      setIsSaving(true);

      await firestore()
        .collection('orders')
        .add({
          tableNumber,
          quantity,
          totalPrice,
          size: selectedPizzaTypeId,
          status: 'Preparando',
          waiter_id: user?.id,
          pizza: {
            name: pizza?.name,
            photo_url: pizza?.photo_url,
          }
        });

      handleGoBack();
    } catch (error) {
      setIsSaving(false);
      Alert.alert('Cadastro', 'Não foi possível cadastrar o pedido.');
    }
  }

  useEffect(() => {
    async function fetchPizza() {
      try {
        const response = await firestore()
          .collection('pizzas')
          .doc(id)
          .get();

        const product = response.data() as ProductDTO;

        setPizza(product);
      } catch(error) {
        console.log(error);
        Alert.alert(
          'Falha no carregamento',
          'Não foi possível carregar as informações do pedido.'
        );
      }
    }

    if (id) {
      fetchPizza();
    }
  }, [id]);

  return (
    <Container behavior={ Platform.OS == 'ios' ? 'padding' : undefined }>
      <ContentScroll>
        <Header>
          <BackButton
            onPress={handleGoBack}
            style={{ marginBottom: 108 }}
          />
        </Header>
        {pizza !== null && <Photo source={{ uri: pizza.photo_url}} />}
        <Form>
          <Title>{pizza?.name ?? ''}</Title>
        
          <Label>Selecione um tamanho</Label>
          <Sizes>
            {
              pizzaTypes.map(item => (
                <RadioButton
                  key={item.id}
                  title={item.name}
                  isSelected={selectedPizzaTypeId === item.id}
                  onPress={
                    () => setSelectedPizzaTypeId(item.id as PizzaTypes)
                  }
                />
              ))
            }
          </Sizes>
          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input
                keyboardType="numeric"
                onChangeText={setTableNumber}
                value={tableNumber}
              />
            </InputGroup>
            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType="numeric"
                onChangeText={value => setQuantity(Number(value))}
                value={String(quantity)}
              />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ {totalPrice}</Price>

          <Button
            title="Confirmar pedido"
            isLoading={isSaving}
            onPress={handleOrder}
          />
        </Form>
      </ContentScroll>
    </Container>
  );
}
