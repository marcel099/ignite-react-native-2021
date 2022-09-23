import React from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import {
  Container,
  InputArea,
  Input,
  ButtonClear,
  Button,
} from './styles';

interface Props extends TextInputProps {
  onSearch: () => void;
  onClear: () => void;
}

export function Search({ onSearch, onClear, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <InputArea>
        <Input
          placeholder="pesquisar..."
          {...rest}
        />

        <ButtonClear onPress={onClear}>
          <Feather
            name="x"
            size={16}
          />
        </ButtonClear>
      </InputArea>

      <Button onPress={onSearch}>
        <Feather
          name="search"
          size={16}
          color={theme.COLORS.TITLE}
        />
      </Button>
    </Container>
  );
}
