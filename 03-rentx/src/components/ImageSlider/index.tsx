import { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";

import { BackButton } from "../BackButton";

import {
  Container,
  Header,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./styles";

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

interface Props {
  imagesUrl: string[];
  handleGoBack: () => void;
}

export function ImageSlider({ imagesUrl, handleGoBack }: Props) {
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
            imagesUrl.map((_, idx) => (
              <ImageIndex
                key={String(idx)}
                active={idx === imageIndex}
              />
            ))
          }
        </ImageIndexes>
      </Header>
      
      <FlatList
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({ item: imageUrl }) => (
          <CarImageWrapper>
            <CarImage
              source={{ uri: imageUrl }}
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
