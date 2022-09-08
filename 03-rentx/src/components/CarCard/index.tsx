import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { RectButtonProps } from 'react-native-gesture-handler';

import { CarModelDTO } from '../../database/models/Car';
import { getAccessoryIcon } from '../../global/utils/getAccessoryIcon';
import { formatNumberToCurrency } from '../../utils/formatters';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

interface Props extends RectButtonProps {
  data: CarModelDTO;
}

export function CarCard({
  data: {
    brand,
    name,
    thumbnail,
    period,
    price,
    fuel_type,
  },
  ...rest
}: Props) {
  const netInfo = useNetInfo();

  const MotorIcon = getAccessoryIcon(fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{period}</Period>
            <Price>
              {
                netInfo.isConnected
                ? formatNumberToCurrency(price)
                : 'R$ ...'
              }
            </Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{ uri: thumbnail }}
        resizeMode="contain"
      />
    </Container>
  );
}
