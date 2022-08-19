import { FlatList } from "react-native";

import { Button } from "../../components/form/Button";
import { CategoryDTO } from "../Register";
import { categories } from "../../global/utils/categories";

import {
  Container,
  CategoryItem,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";
import { AppScreenHeader } from "../../components/AppScreenHeader";

interface Props {
  selectedCategory: CategoryDTO | null;
  setSelectedCategory: (item: CategoryDTO) => void;
  closeCategorySelectModal: () => void;
}

export function CategorySelectModal({
  selectedCategory,
  setSelectedCategory,
  closeCategorySelectModal,
}: Props) {
  return (
    <Container>
      <AppScreenHeader title="Categoria" />

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryItem
            onPress={() => setSelectedCategory(item)}
            isActive={selectedCategory?.id === item.id}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </CategoryItem>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button
          title="Selecionar"
          onPress={closeCategorySelectModal}
        />
      </Footer>
    </Container>
  );
}
