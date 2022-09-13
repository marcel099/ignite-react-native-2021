import { memo } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import lodash from 'lodash';

interface Props {
  data: {
    id: number;
    name: string;
    likes: number;
    online: string;
  },
  follow: () => void;
}

function FriendComponent({
  data: {
    name,
    likes,
    online,
  },
  follow,
}: Props) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text>
        { name } - Likes: { likes }
      </Text>

      <TouchableOpacity onPress={follow}>
        <Text>Deixar de seguir</Text>
      </TouchableOpacity>

      <Text>
        Online em {online}
      </Text>
    </View>
  );
}

export const Friend = memo(FriendComponent, (previousProps, nextProps) => {
  return lodash.isEqual(previousProps.data, nextProps.data);
});