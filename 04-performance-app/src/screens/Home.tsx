import { useCallback, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { FriendList } from '../components/FriendList';

interface FriendData {
  id: number;
  name: string;
  likes: number;
}

export function Home() {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([]);

  async function handleSearch() {
    try {
      const response =
        await fetch(`${process.env.API_URL}/friends?q=${name}`);

      const data = await response.json();

      const online
        = `${new Date().getHours()}:${new Date().getMinutes()}`;

      const formattedData = data.map((item: FriendData) => {
        return {
          id: item.id,
          name: item.name,
          likes: item.likes,
          online,
        }
      });

      setFriends(formattedData);
    } catch(error) {
      console.log(error);
    }
  }

  const handleFollow = useCallback(() => {
    console.log('follow friend');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Amigos
      </Text>

      <TextInput
        placeholder="Nome do amigo"
        onChangeText={setName}
        style={styles.input}
      />

      <Button
        title="Buscar"
        onPress={handleSearch}
      />

      <FriendList data={friends} follow={handleFollow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 7,
    marginVertical: 10,
  },
  list: {
    marginTop: 20,
  },
})
