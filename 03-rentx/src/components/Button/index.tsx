import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import {
  Container,
  Title,
} from "./styles";

interface Props extends RectButtonProps {
  title: string; 
  color?: string;
  disabled?: boolean;
  isLoading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  disabled = false,
  isLoading = false,
  light = false,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <Container
      backgroundColor={color ? color : theme.colors.main}
      enabled={!disabled}
      style={{ opacity: (disabled) ? .5 : 1}}
      {...rest}
    >
      {
        isLoading ? (
          <ActivityIndicator
            color={theme.colors.shape}
          />
        ) : (
          <Title light={light}>{title}</Title>
        )
      }
    </Container>
  );
}
