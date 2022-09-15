import React, { useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { Container } from './styles';
import { ButtonIcon } from '../ButtonIcon';
import { Input } from '../Input';

export function FormBox() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);

  async function handleAddProduct() {
    try {
      await firestore()
        .collection('products')
        .add({
          description,
          amount,
          done: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      
      Alert.alert('Produto adicionado com sucesso')

      setDescription('');
      setAmount(0);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        value={description}
        onChangeText={setDescription}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        value={String(amount)}
        onChangeText={value => setAmount(Number(value))}
      />

      <ButtonIcon
        size='large'
        icon="add-shopping-cart"
        onPress={handleAddProduct}
      />
    </Container>
  );
}
