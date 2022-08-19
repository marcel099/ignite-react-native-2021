import {
  Header,
  Title,
} from "./styles";

interface Props {
  title: string;
}

export function AppScreenHeader({ title }: Props) {
  return (
    <Header>
      <Title>{title}</Title>
    </Header>
  );
}
