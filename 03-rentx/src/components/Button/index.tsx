import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components";

import {
  Container,
  Title,
} from "./styles";

interface Props extends TouchableOpacityProps {
  title: string; 
  color?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export function Button({
  title,
  color,
  disabled = false,
  isLoading = false,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <Container
      backgroundColor={color ? color : theme.colors.main}
      disabled={disabled}
      style={{ opacity: (disabled) ? .5 : 1}}
      {...rest}
    >
      {
        isLoading ? (
          <ActivityIndicator
            color={theme.colors.shape}
          />
        ) : (
          <Title>{title}</Title>
        )
      }
    </Container>
  );
}