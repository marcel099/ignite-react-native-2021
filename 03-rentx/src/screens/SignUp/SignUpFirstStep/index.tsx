import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { useTheme } from "styled-components";
import * as Yup from "yup";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";
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

type SignUpFirstStepScreenProp =
  StackScreenProps<AppStackParamList, 'SignUpFirstStep'>;

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Nome obrigatório'),
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  driverLicense: Yup.string()
    .required('CNH obrigatória'),
});

export function SignUpFirstStep() {
  const theme = useTheme();
  const navigation =
    useNavigation<SignUpFirstStepScreenProp['navigation']>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  function handleBackToLogin() {
    navigation.goBack();
  }

  async function handleNavigateToNextStep() {
    try {
      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', { user: data });
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
                <Bullet active />
                <Bullet />
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
              <FormTitle>1. Dados</FormTitle>
              <Input
                iconName="user"
                placeholder="Nome"
                autoCorrect={false}
                autoCapitalize="sentences"
                onChangeText={setName}
                value={name}
              />
              <InputSpace />
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
              <Input
                iconName="credit-card"
                placeholder="CNH"
                keyboardType="numeric"
                autoCorrect={false}
                onChangeText={setDriverLicense}
                value={driverLicense}
              />
            </Form>
            <Button
              title="Próximo"
              onPress={handleNavigateToNextStep}
              disabled={!name || !email || !driverLicense}
            />
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
