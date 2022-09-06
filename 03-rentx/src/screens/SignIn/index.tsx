import { useState } from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as Yup from "yup";
import { useTheme } from "styled-components";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import { useAuth } from "../../contexts/AuthContext";
import { NonAuthStackScreenProp } from '../../routes/nonAuth.stack.routes';

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

const schema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string()
    .required('Senha obrigatória')
    .min(8, 'A senha deve conter, no mínimo, 8 caracteres'),
})

export function SignIn() {
  const theme = useTheme();
  const navigation =
    useNavigation<NonAuthStackScreenProp<'SignIn'>['navigation']>();
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    try {
      await schema.validate({ email, password });

      signIn({ email, password });
    } catch(error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login. Verifique as credenciais.'
        )
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

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
                disabled={!email || !password}
                onPress={handleSignIn}
              />
              <ButtonSpace />
              <Button
                title="Criar conta gratuita"
                onPress={handleNewAccount}
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
