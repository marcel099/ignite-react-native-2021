import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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

    const [name, setName] = useState(user?.name ?? '');
    const [driverLicense, setDriverLicense] =
      useState(user?.driver_license ?? '');
    const [avatarUri, setAvatarUri] =
      useState(user?.avatar ?? 'https://github.com/marcel099.png');

  function handleBack() {

  }

  function handleSignOut() {

  }

  function handleOptionChange(optionSelected: OptionTypes) {
    setCurrentOption(optionSelected);
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatarUri(result.uri);
    }
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
                {
                  !!avatarUri && <Photo source={{ uri: avatarUri }} />
                }
                <ChangePhotoButton onPress={handleSelectAvatar}>
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
                      onChangeText={setName}
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
                      onChangeText={setDriverLicense}
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
