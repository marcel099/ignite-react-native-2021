import GasolineSvg from '../../assets/gasoline.svg'
import { Car } from "../../screens/Home";

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

interface Props {
  data: Car;
}

export function CarCard({
  data: {
    brand_name,
    car_name,
    car_thumbnail_url,
    rent: {
      period,
      price,
    }
  }
}: Props) {
  return (
    <Container>
      <Details>
        <Brand>{brand_name}</Brand>
        <Name>{car_name}</Name>

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
        source={{ uri: car_thumbnail_url }}
        resizeMode="contain"
      />
    </Container>
  );
}
