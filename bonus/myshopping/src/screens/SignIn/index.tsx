import React, { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth'

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInAnoanonymously() {
    const { user } = await auth().signInAnonymously();
  }

  async function handleCreateUerAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Usuário criado com sucesso!'))
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert(
            'Este e-mail já está em uso. Escolha outro e-mail para cadastrar.'
          );
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('E-mail inválido')
        } else if (error.code === 'auth/weak-password') {
          Alert.alert('A senha deve ter no mínimo 6 dígitos')
        }
      });
  }

  async function handleSignInWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => console.log(user))
      .catch((error) => {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          Alert.alert('Usúario não encontrado! E-mail e/ou senha inválida!');
        }
      })
  }

  async function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Enviamos um link ao seu e-mail para você redefinir sua senha.'))
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        onPress={handleSignInWithEmailAndPassword}
      />

      <Account>
        <ButtonText
          title="Recuperar senha"
          onPress={handleForgotPassword}
        />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUerAccount}
        />
      </Account>
    </Container>
  );
}