import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { RFValue } from "react-native-responsive-fontsize";

import LogoSvg from '../../assets/logo.svg';
import { CarDTO } from "../../global/dtos/CarDTO";
import { CarCard } from "../../components/CarCard";
import { CarsLoader } from "../../components/CarsLoader";
import { api } from "../../services/api";
import { AppHomeStackScreenProp } from "../../routes/appHome.stack.routes";

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from "./styles";

export function Cars() {
  const navigation =
    useNavigation<AppHomeStackScreenProp<'Cars'>['navigation']>();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isFetchingCars, setIsFetchingCars] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');

        setCars(response.data);
      } catch(err) {
        console.log(err);
        Alert.alert("Erro inesperado ao buscar carros")
      } finally {
        setIsFetchingCars(false);
      }
    }

    fetchCars()
  }, []);

  function handleShowCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
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
            {
              !isFetchingCars && (
                <TotalCars>
                  Total de {cars.length} carros
                </TotalCars>
              )
            }
          </HeaderContent>
        </Header>

        {
          isFetchingCars ? (
            <CarsLoader />
          ) : (
            <FlatList
              data={cars}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CarCard
                  data={item}
                  onPress={() => handleShowCarDetails(item)}
                />
              )}
              contentContainerStyle={{
                padding: 24,
              }}
              showsVerticalScrollIndicator={false}
            />
          )
        }
      </Container>
    </>
  );
}
