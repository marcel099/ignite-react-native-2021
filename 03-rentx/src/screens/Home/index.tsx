import { FlatList, StatusBar } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RFValue } from "react-native-responsive-fontsize";

import LogoSvg from '../../assets/logo.svg';
import { CarCard } from "../../components/CarCard";
import { AppStackParamList } from "../../routes/stack.routes";

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

type HomeScreenProp = StackNavigationProp<AppStackParamList, 'Home'>;

export function Home() {
  const navigation = useNavigation<HomeScreenProp>();

  const cars: Car[] = [
    {
      brand_name: 'Audi',
      car_name: 'RS 5  Coupé',
      car_thumbnail_url: 'https://w7.pngwing.com/pngs/174/445/png-transparent-audi-car-audi-a4-cars.png',
      rent: {
        period: 'Ao dia',
        price: 120,
      }
    },
  ];

  function handleShowCarDetails() {
    navigation.navigate('CarDetails');
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

        <FlatList
          data={cars}
          keyExtractor={(item) => item.car_name}
          renderItem={({ item }) => (
            <CarCard
              data={item}
              onPress={handleShowCarDetails}
            />
          )}
          contentContainerStyle={{
            padding: 24,
          }}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    </>
  );
}
