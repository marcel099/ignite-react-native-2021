import { TouchableOpacityProps } from 'react-native';
import GasolineSvg from '../../assets/gasoline.svg'
import { CarDTO } from '../../dtos/CarDTO';

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

interface Props extends TouchableOpacityProps {
  data: CarDTO;
}

export function CarCard({
  data: {
    brand,
    name,
    thumbnail,
    rent: {
      period,
      price,
    }
  },
  ...rest
}: Props) {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{period}</Period>
            <Price>{price}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
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
