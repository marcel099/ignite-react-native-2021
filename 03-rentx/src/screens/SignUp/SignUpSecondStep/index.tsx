import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { useTheme } from "styled-components";
import * as Yup from 'yup';

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { PasswordInput } from "../../../components/PasswordInput";
import { Button } from "../../../components/Button";

import { AppStackParamList } from "../../../routes/stack.routes";

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
  InputSpace,
} from "./styles";

type SignUpSecondStepScreenProp =
  StackScreenProps<AppStackParamList, 'SignUpSecondStep'>;

const schema = Yup.object().shape({
  password: Yup.string()
    .required('Senha obrigatória')
    .min(8, 'A senha deve conter, no mínimo, 8 caracteres'),
  repeatedPassword: Yup.string()
    .required('Repetir a senha é obrigatório')
    .oneOf([Yup.ref('password'), null], 'Senhas não são iguais'),
});

export function SignUpSecondStep() {
  const theme = useTheme();
  const navigation =
    useNavigation<SignUpSecondStepScreenProp['navigation']>();
  const { params: { user } } =
    useRoute<SignUpSecondStepScreenProp['route']>();

  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  function handleBackToLogin() {
    navigation.goBack();
  }

  async function handleRegister() {
    try {
      const data = { password, repeatedPassword };
      await schema.validate(data);

      navigation.navigate('Confirmation', {
        title: 'Conta criada!',
        message: `Agora é só fazer login\ne aproveitar.`,
        nextScreenName: 'SignIn',
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Erro inesperado');
      }
    }
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
              <BackButton onPress={handleBackToLogin} />
              <Steps>
                <Bullet />
                <Bullet active />
              </Steps>
            </Header>

            <Title>
              Crie sua {'\n'}
              conta
            </Title>
            <Subtitle>
              Faça seu cadastro de {'\n'}
              forma rápida e fácil
            </Subtitle>

            <Form>
              <FormTitle>2. Senha</FormTitle>
              <PasswordInput
                iconName="lock"
                placeholder="Senha"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setPassword}
                value={password}
              />
              <InputSpace />
              <PasswordInput
                iconName="lock"
                placeholder="Repetir senha"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setRepeatedPassword}
                value={repeatedPassword}
              />
            </Form>
            <Button
              color={theme.colors.success}
              title="Cadastrar"
              onPress={handleRegister}
              disabled={!password || !repeatedPassword}
            />
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
