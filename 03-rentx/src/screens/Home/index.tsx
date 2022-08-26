import { useEffect, useState } from "react";
import { Alert, FlatList, StatusBar } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RFValue } from "react-native-responsive-fontsize";

import LogoSvg from '../../assets/logo.svg';
import { CarDTO } from "../../global/dtos/CarDTO";
import { CarCard } from "../../components/CarCard";
import { AppLoader } from "../../components/AppLoader";
import { api } from "../../services/api";
import { AppStackParamList } from "../../routes/stack.routes";

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from "./styles";

type HomeScreenProp = StackNavigationProp<AppStackParamList, 'Home'>;

export function Home() {
  const navigation = useNavigation<HomeScreenProp>();

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
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          </HeaderContent>
        </Header>

        {
          isFetchingCars ? (
            <AppLoader />
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
