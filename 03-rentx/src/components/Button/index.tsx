import { TouchableOpacityProps } from "react-native";

import {
  Container,
  Title,
} from "./styles";

interface Props extends TouchableOpacityProps {
  title: string; 
  color?: string;
}

export function Button({
  title,
  color,
  ...rest
}: Props) {
  return (
    <Container backgroundColor={color} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
