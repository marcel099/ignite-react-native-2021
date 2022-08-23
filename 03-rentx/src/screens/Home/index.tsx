import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import LogoSvg from '../../assets/logo.svg';
import { CarCard } from "../../components/CarCard";

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from "./styles";

export interface Car {
  brand_name: string;
  car_name: string;
  car_thumbnail_url: string;
  rent: {
    period: string;
    price: number;
  }
}

export function Home() {
  const car: Car = {
    brand_name: 'Audi',
    car_name: 'RS 5  Coupé',
    car_thumbnail_url: 'https://w7.pngwing.com/pngs/174/445/png-transparent-audi-car-audi-a4-cars.png',
    rent: {
      period: 'Ao dia',
      price: 120,
    }
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Container>
        <Header>
          <HeaderContent>
            <LogoSvg
              width={RFValue(108)}
              height={RFValue(12)}
            />
            <TotalCars>
              Total de 12 carros
            </TotalCars>
          </HeaderContent>
        </Header>

        <CarCard data={car} />
      </Container>
    </>
  );
}
