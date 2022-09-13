import { useMemo } from "react";
import { FlatList, Text, View } from "react-native";

import { Friend } from './Friend';

interface Props {
  data: {
    id: number;
    name: string;
    likes: number;
    online: string;
  }[];
  follow: () => void;
}

export function FriendList({
  data,
  follow,
}: Props) {

  const likesAmount = useMemo(() => {
    return data.reduce((acum, friend) => {
      return acum + friend.likes;
    }, 0);
  }, [data]);

  return (
    <View>
      <Text>
        Total de likes: {likesAmount}
      </Text>

      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item: friend }) => (
          <Friend
            key={String(friend.id)}
            data={friend}
            follow={follow}
          />
        )}
      />
    </View>
  );
}
