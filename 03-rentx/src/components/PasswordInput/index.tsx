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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(previousState => !previousState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={theme.colors.text_details}
        />
      </IconContainer>

      <InputText
        secureTextEntry={isPasswordVisible}
        {...rest}
      />

      <ChangePasswordVisibilityButton
        onPress={handlePasswordVisibilityChange}
      >
        <Feather
          name={isPasswordVisible ? "eye" : "eye-off"}
          size={24}
          color={theme.colors.text_details}
        />
      </ChangePasswordVisibilityButton>
    </Container>
  );
}
