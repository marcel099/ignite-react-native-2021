import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import {
  Container,
} from "./styles";

export function AppLoader() {
  const theme = useTheme();

  return (
    <Container>
      <ActivityIndicator
      color={theme.colors.primary}
      size="large"
    />
    </Container>
  );
}
