import React, { useCallback, useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import happyEmoji from '@assets/happy.png';
import { Search } from '@components/Search';
import { ProductCard, ProductDTO } from '@components/ProductCard';
import { UserStackScreenProp } from '@routes/user.stack.routes';

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItemsNumber,
  HeaderTitle,
  NewProductButton,
} from './styles';

export function Home() {
  const theme = useTheme();
  const navigation =
    useNavigation<UserStackScreenProp<'Home'>['navigation']>();

  const [pizzas, setPizzas] = useState<ProductDTO[]>([]);
  const [search, setSearch] = useState('');

  async function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    try {
      const response = await firestore()
        .collection('pizzas')
        .orderBy('name_insensitive')
        .startAt(formattedValue)
        .endAt(`${formattedValue}\uf8ff`)
        .get();

      const fetchedPizzas = response.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as ProductDTO[];

      setPizzas(fetchedPizzas);

    } catch ( error ) {
      console.log(error);
      Alert.alert('Consulta', 'Não foi possível realizar a consulta');
    }
  }

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleClear() {
    setSearch('');
    fetchPizzas('');
  }

  function handleOpen(id: string) {
    navigation.navigate('Product', { id });
  }

  function handleAdd() {
    navigation.navigate('Product', {});
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas('');
    }, [])
  );
  
  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText> 
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons
            name="logout"
            color={theme.COLORS.TITLE}
            size={24}
          />
        </TouchableOpacity>
      </Header>

      <Search
        onSearch={handleSearch}
        onClear={handleClear}
        onChangeText={setSearch}
        value={search}
      />

      <MenuHeader>
        <HeaderTitle>Cardápio</HeaderTitle> 
        <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            onPress={() => handleOpen(item.id)}
            data={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />

      <NewProductButton
        title="Cadastrar Pizza"
        type="secondary"
        onPress={handleAdd}
      />
    </Container>
  );
}
