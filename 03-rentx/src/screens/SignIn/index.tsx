import { useState } from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTheme } from "styled-components";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  InputSpace,
  Footer,
  ButtonSpace,
} from "./styles";

export function SignIn() {
  const theme = useTheme();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background_primary}
        translucent
      />
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                onChangeText={setEmail}
                value={email}
              />
              <InputSpace />
              <PasswordInput
                iconName="lock"
                placeholder="Senha"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setPassword}
                value={password}
              />
            </Form>
            <Footer>
              <Button
                title="Login"
                onPress={() => {}}
              />
              <ButtonSpace />
              <Button
                title="Criar conta gratuita"
                onPress={() => {}}
                color={theme.colors.background_secondary}
                light
              />
            </Footer>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
