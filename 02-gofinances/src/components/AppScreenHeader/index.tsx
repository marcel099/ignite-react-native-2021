import {
  Container,
  Header,
  Title,
} from "./styles";

interface Props {
  title: string;
}

export function AppScreenHeader({ title }: Props) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
    </Container>
  );
}
