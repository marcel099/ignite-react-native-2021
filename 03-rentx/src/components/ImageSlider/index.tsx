import { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";

import { BackButton } from "../BackButton";
import { Bullet } from "../Bullet";

import {
  Container,
  Header,
  ImageIndexes,
  CarImageWrapper,
  CarImage,
} from "./styles";

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

interface Props {
  images: {
    id: string;
    photo: string;
  }[];
  handleGoBack: () => void;
}

export function ImageSlider({ images, handleGoBack }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <Header>
        <BackButton
          onPress={handleGoBack}
        />
        <ImageIndexes>
          {
            images.map((image, idx) => (
              <Bullet
                key={image.id}
                active={idx === imageIndex}
              />
            ))
          }
        </ImageIndexes>
      </Header>
      
      <FlatList
        data={images}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage
              source={{ uri: item.photo }}
              resizeMode="contain"
            />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
