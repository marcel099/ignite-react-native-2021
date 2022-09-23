import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  RadioButtonProps,
  Container,
  Title,
  Radio,
  Selected,
} from './styles';

interface Props extends TouchableOpacityProps, RadioButtonProps {
  title: string;
}

export function RadioButton({
  title,
  isSelected = false,
  ...rest
}: Props) {
  return (
    <Container {...rest}>
      <Radio>{ isSelected && <Selected /> }</Radio>
      <Title>{ title }</Title>
    </Container>
  );
}
