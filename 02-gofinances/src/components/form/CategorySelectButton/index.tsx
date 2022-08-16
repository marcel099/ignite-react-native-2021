import { TouchableOpacityProps } from "react-native";

import {
  Container,
  CategoryTitle,
  Icon,
} from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
}

export function CategorySelectButton({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <CategoryTitle>{title}</CategoryTitle>
      <Icon name="chevron-down" />
    </Container>
  );
}
