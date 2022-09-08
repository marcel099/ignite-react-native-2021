import React, { useCallback, useState } from "react";
import { Alert, FlatList, StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { CarsLoader } from "../../components/CarsLoader";
import { BackButton } from "../../components/BackButton";
import { CarCard } from "../../components/CarCard";

import { CarModelDTO } from "../../database/models/Car";
import { api } from "../../services/api";
import { formatDateToLocaleDate } from "../../utils/formatters";

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

interface ScheduleDTO {
  id: string;
  start_date: string;
  end_date: string;
  car: CarModelDTO;
}

export function MyCars() {
  const theme = useTheme();

  const [cars, setCars] = useState<ScheduleDTO[]>([]);
  const [isFetchingCars, setIsFetchingCars] = useState(true);

  useFocusEffect(useCallback(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`/rentals`);

        setCars(response.data);
      } catch(error) {
        console.log(error);
        Alert.alert("Erro inesperado ao buscar carros")
      } finally {
        setIsFetchingCars(false);
      }
    }

    fetchCars()
  }, []));

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
            onPress={() => {}}
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
            <CarsLoader />
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
                  <CarCardWrapper key={item.id}>
                    <CarCard data={item.car} />
                    <CarCardFooter>
                      <CarCardFooterTitle>Período</CarCardFooterTitle>
                      <CarCardFooterPeriod>
                        <CarCardFooterDate>
                          {
                            formatDateToLocaleDate(
                              new Date(item.start_date)
                            )
                          }
                        </CarCardFooterDate>
                        <AntDesign
                          name="arrowright"
                          size={20}
                          color={theme.colors.title}
                          style={{ marginHorizontal: 10 }}
                        />
                        <CarCardFooterDate>
                          {
                            formatDateToLocaleDate(
                              new Date(item.end_date)
                            )
                          }
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
