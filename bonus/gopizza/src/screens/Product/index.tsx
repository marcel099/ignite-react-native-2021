import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';

import { Button } from '@components/Button';
import { BackButton } from '@components/BackButton';
import { Input } from '@components/Input';
import { InputPrice } from '@components/InputPrice';
import { Photo } from '@components/Photo';
import { UserStackScreenProp } from '@routes/user.stack.routes';

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

interface ProductDTO {
  id: string;
  name: string;
  description: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
  photo_url: string;
  photo_path: string;
}

export function Product() {
  const navigation = 
    useNavigation<UserStackScreenProp<'Product'>['navigation']>();
  const { params: { id } } = 
    useRoute<UserStackScreenProp<'Product'>['route']>();

  const [image, setImage] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priceSizeP, setPriceSizeP] = useState<string>('');
  const [priceSizeM, setPriceSizeM] = useState<string>('');
  const [priceSizeG, setPriceSizeG] = useState<string>('');

  const [isSaving, setIsSaving] = useState(false);

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

      handleGoBack();
    } catch (error) {
      console.log(error);
      setIsSaving(false);
      Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza.');
    }
  }

  async function handleGoBack() {
    navigation.pop();
  }

  async function handleDelete() {
    try {
      if (id === undefined || imagePath === null) {
        throw new Error('Valores necessários não preenchidos');
      }

      await firestore()
        .collection('pizzas')
        .doc(id)
        .delete();

      await storage()
        .ref(imagePath)
        .delete();

      handleGoBack();
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Falha ao excluir',
        'Não foi possível excluir esta pizza'
      );
    }
  }

  useEffect(() => {
    async function fetchPizza() {
      try {
        const response = await firestore()
          .collection('pizzas')
          .doc(id)
          .get();

        const product = response.data() as ProductDTO;

        setName(product.name);
        setImage(product.photo_url);
        setImagePath(product.photo_path);
        setDescription(product.description);
        setPriceSizeP(product.prices_sizes.p);
        setPriceSizeM(product.prices_sizes.m);
        setPriceSizeG(product.prices_sizes.g);
      } catch(error) {
        console.log(error);
        Alert.alert(
          'Falha no carregamento',
          'Não foi possível carregar as informações da pizza.'
        );
      }
    }

    if (id) {
      fetchPizza();
    }
  }, [id])

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <BackButton onPress={handleGoBack} />
          <Title>Cadastrar</Title>
          {
            id !== undefined ? (
              <TouchableOpacity onPress={handleDelete}>
                <DeleteLabel>Deletar</DeleteLabel>
              </TouchableOpacity>
            ) : (
              <View />
            )
          }
        </Header>
        <Upload>
          <Photo uri={image} />
          {
            id === undefined && (
              <PickImageButton
                title="Carregar"
                type="secondary"
                onPress={handlePickImage}
              />
            )
          }
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
              <MaxCharacters>
                {description.length} de 60 caracteres
              </MaxCharacters>
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
          
          {
            id === undefined && (
              <Button
                title="Cadastrar Pizza"
                isLoading={isSaving}
                onPress={handleAdd}
              />
            )
          }
        </Form>
      </ScrollView>
    </Container>
  );
}
