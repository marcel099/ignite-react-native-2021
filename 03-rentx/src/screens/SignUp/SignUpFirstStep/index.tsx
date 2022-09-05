import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback
} from "react-native";
import { useTheme } from "styled-components";

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

export function SignUpFirstStep() {
  const theme = useTheme();
  const navigation =
    useNavigation<SignUpFirstStepScreenProp['navigation']>();

  function handleBackToLogin() {
    navigation.goBack();
  }

  function handleNavigateToNextStep() {
    navigation.navigate('SignUpSecondStep');
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
              />
              <InputSpace />
              <Input
                iconName="mail"
                placeholder="E-mail"
                keyboardType="email-address"
              />
              <InputSpace />
              <Input
                iconName="credit-card"
                placeholder="CNH"
                keyboardType="numeric"
              />
            </Form>
            <Button
              title="Próximo"
              onPress={handleNavigateToNextStep}
            />
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
