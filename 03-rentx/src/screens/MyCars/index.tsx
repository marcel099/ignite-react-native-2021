import { useEffect, useState } from "react";
import { Alert, FlatList, StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { AppLoader } from "../../components/AppLoader";
import { BackButton } from "../../components/BackButton";

import { CarDTO } from "../../global/dtos/CarDTO";
import { AppStackParamList } from "../../routes/stack.routes";
import { api } from "../../services/api";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointimentsTitle,
  AppointimentsQuantity,
  CarCardWrapper,
  CarCardFooter,
  CarCardFooterTitle,
  CarCardFooterPeriod,
  CarCardFooterDate,
} from "./styles";
import { CarCard } from "../../components/CarCard";

type MyCarsScreenProp = StackScreenProps<AppStackParamList, 'MyCars'>;

interface ScheduleDTO {
  id: string;
  user_id: string;
  startDate: string;
  endDate: string;
  car: CarDTO;
}

export function MyCars() {
  const theme = useTheme();
  const navigation = 
    useNavigation<MyCarsScreenProp['navigation']>();
  // const route = 
  //   useRoute<SchedulingDetailsScreenProp['route']>();

  const [cars, setCars] = useState<ScheduleDTO[]>([]);
  const [isFetchingCars, setIsFetchingCars] = useState(true);

  function handleGoBackHome() {
    navigation.pop();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');

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

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Container>
        <Header>
          <BackButton
            color={theme.colors.shape}
            onPress={handleGoBackHome}
          />

          <Title>
            Seus agendamentos {'\n'}
            estão aqui.
          </Title>

          <SubTitle>
            Conforto, segurança e praticidade.
          </SubTitle>
        </Header>
        {
          isFetchingCars ? (
            <AppLoader />
          ) : (
            <Content>
              <Appointments>
                <AppointimentsTitle>
                  Agendamentos feitos
                </AppointimentsTitle>
                <AppointimentsQuantity>
                  {cars.length}
                </AppointimentsQuantity>
              </Appointments>
              
              <FlatList
                data={cars}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CarCardWrapper>
                    <CarCard data={item.car} />
                    <CarCardFooter>
                      <CarCardFooterTitle>Período</CarCardFooterTitle>
                      <CarCardFooterPeriod>
                        <CarCardFooterDate>
                          {item.startDate}
                        </CarCardFooterDate>
                        <AntDesign
                          name="arrowright"
                          size={20}
                          color={theme.colors.title}
                          style={{ marginHorizontal: 10 }}
                        />
                        <CarCardFooterDate>
                          {item.endDate}
                        </CarCardFooterDate>
                      </CarCardFooterPeriod>
                    </CarCardFooter>
                  </CarCardWrapper>
                )}
              />
            </Content>
          )
        }
      </Container>
    </>
  );
}
