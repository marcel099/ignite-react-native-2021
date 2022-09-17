import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
} from './styles';

export function Product() {
  const [image, setImage] = useState<string | null>(null);

  async function handlePickImage() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack />
        <Title>Cadastrar</Title>
        <TouchableOpacity>
          <DeleteLabel>Deletar</DeleteLabel>
        </TouchableOpacity>
      </Header>

      <Upload>
        <Photo uri={image} />
        <PickImageButton
          title="Carregar"
          type="secondary"
          onPress={handlePickImage}
        />
      </Upload>
    </Container>
  );
}
