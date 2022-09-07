import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";

import {
  Container,
  IconContainer,
  InputText,
} from "./styles";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function Input({ iconName, ...rest }: Props) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilledOut, setIsFilledOut] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilledOut(!!rest.value);
  }

  return (
    <Container>
      <IconContainer
        isFocused={isFocused}
      >
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilledOut
            ? theme.colors.main
            : theme.colors.text_details
          }
        />
      </IconContainer>

      <InputText
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  );
}
