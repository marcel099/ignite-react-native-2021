import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  StatusTypeProps,
  Container,
  Image,
  Name,
  Description,
  StatusContainer,
  StatusLabel,
} from './styles';

export interface OrderDTO {
  id: string;
  tableNumber: number;
  quantity: number;
  totalPrice: number;
  size: 'p' | 'm' | 'g';
  status: StatusTypeProps
  pizza: {
    name: string;
    photo_url: string;
  }
}

interface Props extends TouchableOpacityProps {
  index: number;
  data: OrderDTO;
}

export function OrderCard({ index, data, ...rest}: Props) {
  return (
    <Container index={index} {...rest}>
      <Image source={{ uri: data.pizza.photo_url}} />

      <Name>{data.pizza.name}</Name>

      <Description>
        Mesa {data.tableNumber} - Qnt: {data.quantity}
      </Description>

      <StatusContainer status={data.status}>
        <StatusLabel status={data.status}>{data.status}</StatusLabel>
      </StatusContainer>
    </Container>
  );
}
