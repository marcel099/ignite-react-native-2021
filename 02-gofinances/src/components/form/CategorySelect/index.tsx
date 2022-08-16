import {
  Container,
  CategoryTitle,
  Icon,
} from "./styles";

interface Props {
  title: string;
}

export function CategorySelect({ title }: Props) {
  return (
    <Container>
      <CategoryTitle>{title}</CategoryTitle>
      <Icon name="chevron-down" />
    </Container>
  );
}
