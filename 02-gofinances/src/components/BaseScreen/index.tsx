import { ReactNode } from "react";

import {
  Container,
  Header,
  Title,
} from "./styles";

interface Props {
  title: string;
  children: ReactNode;
}

export function BaseScreen({ title, children }: Props) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      { children }
    </Container>
  );
}
