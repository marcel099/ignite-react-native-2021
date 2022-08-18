import { TouchableOpacityProps } from "react-native";

import {
  Container,
  CategoryName,
  Icon,
} from "./styles";

interface Props extends TouchableOpacityProps {
  name: string;
}

export function CategorySelectButton({ name, ...rest }: Props) {
  return (
    <Container {...rest}>
      <CategoryName>{name}</CategoryName>
      <Icon name="chevron-down" />
    </Container>
  );
}
