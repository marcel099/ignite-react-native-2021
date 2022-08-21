import { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../contexts/AuthContext";

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function SignIn() {
  const theme = useTheme();
  const { signInWithGoogle, signInWithApple } = useAuth();

  const [isSigningIn, setIsSigningIn] = useState(false);

  async function handleSignInWithGoogle() {
    try {
      setIsSigningIn(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Falha no login',
        'Não foi possível conectar a conta Google'
      );
      setIsSigningIn(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsSigningIn(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Falha no login',
        'Não foi possível conectar a conta Apple'
      );
      setIsSigningIn(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {
            Platform.OS === 'ios' && (
              <SignInSocialButton
                title="Entrar com Apple"
                svg={AppleSvg}
                onPress={handleSignInWithApple}
              />
            )
          }
        </FooterWrapper>
        {
          isSigningIn && (
            <ActivityIndicator
              color={theme.colors.shape}
              style={{ marginTop: RFValue(18) }}
            />
          )
        }
      </Footer>
    </Container>
  );
}
