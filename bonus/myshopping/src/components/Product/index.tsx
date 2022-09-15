import React from 'react';
import firestore from '@react-native-firebase/firestore'

import { ButtonIcon } from '../ButtonIcon';
import { Container, Info, Title, Amount, Options } from './styles';

export type ProductProps = {
  id: string;
  description: string;
  amount: number;
  done: boolean;
}

type Props = {
  data: ProductProps;
}

export function Product({ data }: Props) {
  function handleDoneToggle() {
    firestore()
      .collection('products')
      .doc(data.id)
      .update({
        done: !data.done,
      });
  }

  function handleDelete() {
    firestore()
      .collection('products')
      .doc(data.id)
      .delete();
  }

  return (
    <Container>
      <Info>
        <Title done={data.done}>
          {data.description}
        </Title>

        <Amount>
          Quantidade: {data.amount}
        </Amount>
      </Info>

      <Options>
        <ButtonIcon
          icon={data.done ? "undo" : "check"}
          onPress={handleDoneToggle}
        />

        <ButtonIcon
          icon="delete"
          color="alert"
          onPress={handleDelete}
        />
      </Options>
    </Container>
  );
}
