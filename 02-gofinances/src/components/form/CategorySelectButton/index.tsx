import { RectButtonProps } from "react-native-gesture-handler";

import {
  Container,
  CategoryTitle,
  Icon,
} from "./styles";

interface Props extends RectButtonProps {
  title: string;
}

export function CategorySelectButton({ title, ...rest }: Props) {
  return (
    <Container activeOpacity={0.7} {...rest}>
      <CategoryTitle>{title}</CategoryTitle>
      <Icon name="chevron-down" />
    </Container>
  );
}
