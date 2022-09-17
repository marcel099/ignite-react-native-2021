import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Title,
  Loader,
  ButtonTypes,
} from './styles';

interface Props extends RectButtonProps {
  title: string;
  type?: ButtonTypes;
  isLoading?: boolean;
}

export function Button({
  title,
  type = 'primary',
  isLoading = false,
  ...rest
}: Props) {
  return (
    <Container
      type="primary"
      enabled={!isLoading}
      {...rest}
    >
      {
        isLoading ? (
          <Loader />
        ) : (
          <Title>{ title }</Title>
        )
      }
    </Container>
  );
}
