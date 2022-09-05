import { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";

import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisibilityButton,
} from "./styles";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({ iconName, ...rest }: Props) {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilledOut, setIsFilledOut] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilledOut(!!rest.value);
  }

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(previousState => !previousState);
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
        secureTextEntry={!isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />

      <ChangePasswordVisibilityButton
        onPress={handlePasswordVisibilityChange}
      >
        <Feather
          name={!isPasswordVisible ? "eye" : "eye-off"}
          size={24}
          color={theme.colors.text_details}
        />
      </ChangePasswordVisibilityButton>
    </Container>
  );
}
