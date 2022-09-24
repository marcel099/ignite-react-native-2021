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

interface Props extends TouchableOpacityProps {
  index: number;
}

export function OrderCard({ index, ...rest}: Props) {
  return (
    <Container index={index} {...rest}>
      <Image source={{ uri: 'https://github.com/marcel099.png'}} />

      <Name>4 Queijos</Name>

      <Description>
        Mesa 5 - Qnt: 1
      </Description>

      <StatusContainer status="Preparando">
        <StatusLabel status="Preparando">Preparando</StatusLabel>
      </StatusContainer>
    </Container>
  );
}
