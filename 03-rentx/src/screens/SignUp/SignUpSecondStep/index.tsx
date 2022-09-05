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

export function SignUpSecondStep() {
  const theme = useTheme();
  const navigation =
    useNavigation<SignUpSecondStepScreenProp['navigation']>();

  function handleBackToLogin() {
    navigation.goBack();
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
              />
              <InputSpace />
              <PasswordInput
                iconName="lock"
                placeholder="Repetir senha"
              />
            </Form>
            <Button
              color={theme.colors.success}
              title="Cadastrar"
            />
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
