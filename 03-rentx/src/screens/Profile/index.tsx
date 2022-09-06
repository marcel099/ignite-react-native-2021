import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  ChangePhotoButton,
} from "./styles";
import { StatusBar } from 'react-native';

export function Profile() {
  const theme = useTheme();

  function handleBack() {

  }

  function handleSignOut() {

  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
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
      </Container>
    </>
  );
}
