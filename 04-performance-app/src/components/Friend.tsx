import { Text } from "react-native";

interface Props {
  data: {
    name: string;
    likes: number;
  }
}

export function Friend({
  data: {
    name,
    likes,
  }
}: Props) {
  return (
    <Text>
      { name } - Likes: { likes }
    </Text>
  );
}
