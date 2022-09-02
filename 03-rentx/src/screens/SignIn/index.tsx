import { StatusBar } from "react-native";
import { useTheme } from "styled-components";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer,
  FooterSpace,
} from "./styles";

export function SignIn() {
  const theme = useTheme();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        background-color="transparent"
        translucent
      />
      <Container>
        <Header>
          <Title>
            Estamos {'\n'}
            quase lá.
          </Title>
          <SubTitle>
            Faça seu login para começar {'\n'}
            uam experiência incrível.
          </SubTitle>
        </Header>

        <Form>
          <Input
            iconName="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Form>

        <Footer>
          <Button
            title="Login"
            onPress={() => {}}
          />
          <FooterSpace/>
          <Button
            title="Criar conta gratuita"
            onPress={() => {}}
            color={theme.colors.background_secondary}
            light
          />
        </Footer>
      </Container>
    </>
  );
}
