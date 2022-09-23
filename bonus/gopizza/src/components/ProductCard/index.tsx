import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import {
  Container,
  Content,
  Image,
  Details,
  Name,
  Description,
  Line,
  Identification,
} from './styles';

export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  photo_url: string;
}

interface Props extends RectButtonProps {
  data: ProductDTO;
}

export function ProductCard({ data, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.photo_url }} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Feather
              name="chevron-right"
              size={18}
              color={theme.COLORS.SHAPE}
            />
          </Identification>

          <Description>{data.description}</Description>
        </Details>
      </Content>

      <Line />
    </Container>
  );
}
