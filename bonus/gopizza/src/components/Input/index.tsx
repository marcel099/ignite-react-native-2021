import React from 'react';
import { TextInputProps } from 'react-native';

import {
  Container,
  InputTypes,
} from "./styles";

interface Props extends TextInputProps {
  type?: InputTypes;
}

export function Input({ type = 'primary', ...rest }: Props) {
  return (
    <Container type="primary" {...rest} />
  );
}
