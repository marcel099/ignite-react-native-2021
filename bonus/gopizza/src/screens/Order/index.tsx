import React, { useState } from 'react';
import { Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { BackButton } from '@components/BackButton';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { RadioButton } from '@components/RadioButton';
import { UserStackScreenProp } from '@routes/user.stack.routes';
import { pizzaTypes } from '@utils/pizzaTypes'

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

export function Order() {
  const navigation = 
    useNavigation<UserStackScreenProp<'Order'>['navigation']>();

  const [selectedPizzaTypeId, setSelectedPizzaTypeId]
    = useState<string | null>(null);

  async function handleGoBack() {
    navigation.pop();
  }

  return (
    <Container behavior={ Platform.OS == 'ios' ? 'padding' : undefined }>
      <ContentScroll>
        <Header>
          <BackButton
            onPress={handleGoBack}
            style={{ marginBottom: 108 }}
          />
        </Header>
        <Photo source={{ uri: 'https://github.com/marcel099.png'}} />
        <Form>
          <Title>Nome da PIzza</Title>
        
          <Label>Selecione um tamanho</Label>
          <Sizes>
            {
              pizzaTypes.map(item => (
                <RadioButton
                  key={item.id}
                  title={item.name}
                  isSelected={selectedPizzaTypeId === item.id}
                  onPress={() => setSelectedPizzaTypeId(item.id)}
                />
              ))
            }
          </Sizes>
          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input
                keyboardType="numeric"
              />
            </InputGroup>
            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType="numeric"
              />
            </InputGroup>
          </FormRow>
          <Price>Valor de R$ 00,00</Price>
          <Button title="Confirmar pedido" />
        </Form>
      </ContentScroll>
    </Container>
  );
}
