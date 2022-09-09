import { Text, TextInput, View, Button } from "react-native";

export function Profile() {
  return (
    <View>
      <Text testID="title-text">
        Perfil
      </Text>

      <TextInput
        testID="name-input"
        placeholder="Nome"
        autoCorrect={false}
        value="Marcelo"
      />

      <TextInput
        testID="last-name-input"
        placeholder="Sobrenome"
        autoCorrect={false}
        value="Lupatini"
      />

      <Button
        title="Salvar"
        onPress={() => {}}
      />
    </View>
  );
}
