import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { useAuth } from '../../contexts/AuthContext';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  ChangePhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";

type OptionTypes = 'dataEdit' | 'passwordEdit'

export function Profile() {
  const theme = useTheme();

  const { user } = useAuth();

  const [currentOption, setCurrentOption] =
    useState<OptionTypes>('dataEdit');

  function handleBack() {

  }

  function handleSignOut() {

  }

  function handleOptionChange(optionSelected: OptionTypes) {
    setCurrentOption(optionSelected);
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Header>
              <HeaderTop>
                <BackButton
                  color={theme.colors.shape}
                  onPress={handleBack}
                />
                <HeaderTitle>
                  Editar Perfil
                </HeaderTitle>
                <LogoutButton onPress={handleSignOut}>
                  <Feather
                    name="power"
                    size={24}
                    color={theme.colors.shape}
                  />
                </LogoutButton>
              </HeaderTop>
              <PhotoContainer>
                <Photo source={{ uri: 'https://github.com/marcel099.png' }} />
                <ChangePhotoButton onPress={() => {}}>
                  <Feather
                    name="camera"
                    size={24}
                    color={theme.colors.shape}
                  />
                </ChangePhotoButton>
              </PhotoContainer>
            </Header>

            <Content>
              <Options>
                <Option
                  active={currentOption === 'dataEdit'}
                  onPress={() => handleOptionChange('dataEdit')}
                >
                  <OptionTitle active={currentOption === 'dataEdit'}>
                    Dados
                  </OptionTitle>
                </Option>
                <Option
                  active={currentOption === 'passwordEdit'}
                  onPress={() => handleOptionChange('passwordEdit')}
                >
                  <OptionTitle active={currentOption === 'passwordEdit'}>
                    Trocar senha
                  </OptionTitle>
                </Option>
              </Options>

              {
                currentOption === 'dataEdit' ?
                (
                  <Section>
                    <Input
                      iconName="user"
                      placeholder="Nome"
                      autoCapitalize="sentences"
                      autoCorrect={false}
                      defaultValue={user?.name ?? ''}
                    />
                    <Input
                      iconName="mail"
                      editable={false}
                      defaultValue={user?.email ?? ''}
                    />
                    <Input
                      iconName="credit-card"
                      placeholder="CNH"
                      keyboardType="numeric"
                      defaultValue={user?.driver_license ?? ''}
                    />
                  </Section>
                ) : (
                  <Section>
                    <PasswordInput
                      iconName="lock"
                      placeholder="Senha atual"
                    />
                    <PasswordInput
                      iconName="lock"
                      placeholder="Nova senha"
                    />
                    <PasswordInput
                      iconName="lock"
                      placeholder="Repetir senha"
                    />
                  </Section>
                )
              }
            </Content>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
