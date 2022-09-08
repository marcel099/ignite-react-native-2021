import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { format } from 'date-fns';

import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";
import { getPlatformDate } from '../../components/Calendar';
import { ImageSlider } from "../../components/ImageSlider";

import { CarDTO } from '../../global/dtos/CarDTO';
import { getAccessoryIcon } from '../../global/utils/getAccessoryIcon'
import { AppHomeStackScreenProp } from "../../routes/appHome.stack.routes";
import { formatNumberToCurrency } from '../../utils/formatters';

import { api } from '../../services/api';

import {
  Container,
  Header,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPricetotal,
  Footer,
} from "./styles";

interface RentalPeriod {
  formattedStart: string;
  formattedEnd: string;
}

export function SchedulingDetails() {
  const theme = useTheme();
  const navigation = 
    useNavigation<AppHomeStackScreenProp<'SchedulingDetails'>['navigation']>();
  const route = 
    useRoute<AppHomeStackScreenProp<'SchedulingDetails'>['route']>();
  const { car, dates } = route.params;
  const netInfo = useNetInfo();

  const [
    rentalPeriod,
    setRentalPeriod
  ] = useState<RentalPeriod | null>(null);
  const [
    isSendingSchedule,
    setIsSendingSchedule
  ] = useState(false);
  const [
    updatedCar,
    setUpdatedCar
  ] = useState<CarDTO | null>(null);

  const rentTotal = car.price * dates.length;

  function handleGoBackScheduling() {
    navigation.pop();
  }

  async function handleConfirmRental() {
    try {
      setIsSendingSchedule(true);

      await api.post('/rentals', {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      });

      navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
        nextScreenName: 'Cars'
      });
    } catch (error) {
      console.log(error)
      Alert.alert("Não foi possível confirmar o agendamento");
    } finally {
      setIsSendingSchedule(false);
    }
  }

  useEffect(() => {
    const formattedStart = format(
      getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'
    );
    const formattedEnd = format(
      getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'
    );

    setRentalPeriod({
      formattedStart,
      formattedEnd,
    })
  }, []);

  useEffect(() => {
    async function fetchUpdatedCar() {
      const response = await api.get(`/cars/${car.id}`)
      setUpdatedCar(response.data);
    }

    if (netInfo.isConnected) {
      fetchUpdatedCar();
    }
  }, [netInfo.isConnected]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Container>
        <Header>
          <ImageSlider
            images={
              !!updatedCar?.photos
              ? updatedCar.photos
              : [{id: car.thumbnail, photo: car.thumbnail}]
            }
            handleGoBack={handleGoBackScheduling}
          />
        </Header> 

        <Content>
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.period}</Period>
              <Price>{formatNumberToCurrency(car.price)}</Price>
            </Rent>
          </Details>

          {
            updatedCar?.accessories && (
              <Accessories>
                {
                  updatedCar?.accessories.map(accessory => (
                    <Accessory
                      key={accessory.id}
                      name={accessory.name}
                      icon={getAccessoryIcon(accessory.type)}
                    />
                  ))
                }
              </Accessories>
            )
          }

          <RentalPeriod>
            <CalendarIcon>
              <Feather
                name="calendar"
                size={RFValue(24)}
                color={theme.colors.shape}
              />
            </CalendarIcon>

            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>{rentalPeriod?.formattedStart ?? ''}</DateValue>
            </DateInfo>

            <Feather
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.text}
            />

            <DateInfo>
              <DateTitle>ATÉ</DateTitle>
              <DateValue>{rentalPeriod?.formattedEnd ?? ''}</DateValue>
            </DateInfo>
          </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>
                {formatNumberToCurrency(car.price)} x{dates.length} diárias
              </RentalPriceQuota>
              <RentalPricetotal>
                {formatNumberToCurrency(rentTotal)}
              </RentalPricetotal> 
            </RentalPriceDetails>
          </RentalPrice>

        </Content>

        <Footer>
          <Button
            title="Alugar agora"
            color={theme.colors.success}
            onPress={handleConfirmRental}
            disabled={isSendingSchedule}
            isLoading={isSendingSchedule}
          />
        </Footer>
      </Container>
    </>
  );
}
