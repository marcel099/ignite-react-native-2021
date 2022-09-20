import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';

import { Button } from '@components/Button';
import { ButtonBack } from '@components/ButtonBack';
import { Input } from '@components/Input';
import { InputPrice } from '@components/InputPrice';
import { Photo } from '@components/Photo';

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters,
} from './styles';

export function Product() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priceSizeP, setPriceSizeP] = useState<string>('');
  const [priceSizeM, setPriceSizeM] = useState<string>('');
  const [priceSizeG, setPriceSizeG] = useState<string>('');

  const [isSaving, setIsSaving] = useState(false);

  async function handlePickImage() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    console.log(status);

    if (status === 'granted') {0
      console.log('should launch')
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      });

      console.log('was it cancelled?')
      console.log(result.cancelled)

      if (!result.cancelled) {
        console.log(result.uri)
        setImage(result.uri);
      }
    }
  }

  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert(
        'Cadastro',
        'Informe o nome da pizza.'
      );
    }

    if (!description.trim()) {
      return Alert.alert(
        'Cadastro',
        'Informe a descrição da pizza.'
      );
    }

    if (!image) {
      return Alert.alert(
        'Cadastro',
        'Selecione a imagem da pizza.'
      );
    }

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert(
        'Cadastro',
        'Informe o preço de todos os tamanhos da pizza.'
      );
    }

    try {
      setIsSaving(true);

      const fileName = new Date().getTime();
      const reference = storage().ref(`/pizzas/${fileName}.png`);

      await reference.putFile(image);
      const photo_url = await reference.getDownloadURL();

      await firestore()
        .collection('pizzas')
        .add({
          name: name.trim(),
          name_insensitive: name.toLowerCase().trim(),
          description: description.trim(),
          prices_sizes: {
            p: priceSizeP,
            m: priceSizeM,
            g: priceSizeG,
          },
          photo_url,
          photo_path: reference.fullPath,
        });

      Alert.alert('Cadastro', 'Pizza cadastrada com sucesso.');
    } catch (error) {
      console.log(error);
      Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input
              onChangeText={setName}
              value={name}
            />
          </InputGroup>
        
          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>
          <InputGroup>
            <Label>Tamanhos e preços</Label>
            <InputPrice
              size="P"
              onChangeText={setPriceSizeP}
              value={priceSizeP}
            />
            <InputPrice
              size="M"
              onChangeText={setPriceSizeM}
              value={priceSizeM}
            />
            <InputPrice
              size="G"
              onChangeText={setPriceSizeG}
              value={priceSizeG}
            />
          </InputGroup>
          <Button
            title="Cadastrar pizza"
            isLoading={isSaving}
            onPress={handleAdd}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}
