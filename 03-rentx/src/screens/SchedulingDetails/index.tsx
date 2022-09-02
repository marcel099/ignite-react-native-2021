import { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { format } from 'date-fns';

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { getPlatformDate } from '../../components/Calendar';
import { ImageSlider } from "../../components/ImageSlider";

import { getAccessoryIcon } from '../../global/utils/getAccessoryIcon'

import { AppStackParamList } from "../../routes/stack.routes";

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

type SchedulingDetailsScreenProp = StackScreenProps<AppStackParamList, 'SchedulingDetails'>;

interface RentalPeriod {
  formattedStart: string;
  formattedEnd: string;
}

export function SchedulingDetails() {
  const theme = useTheme();
  const navigation = 
    useNavigation<SchedulingDetailsScreenProp['navigation']>();
  const route = 
    useRoute<SchedulingDetailsScreenProp['route']>();
  const { car, dates } = route.params;

  const [
    rentalPeriod,
    setRentalPeriod
  ] = useState<RentalPeriod | null>(null);
  const [
    isSendingSchedule,
    setIsSendingSchedule
  ] = useState(false);

  function handleGoBackScheduling() {
    navigation.pop();
  }

  async function handleConfirmRental() {
    try {
      setIsSendingSchedule(true);
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ];

      await api.post('schedules_byuser', {
        user_id: 1,
        car,
        startDate: rentalPeriod?.formattedStart,
        endDate: rentalPeriod?.formattedEnd,
      })

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })

      navigation.navigate('ScheduleCompleted');
    } catch (err) {
      console.log(err)
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

  const rentTotal = car.rent.price * dates.length;

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
            imagesUrl={car.photos}
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
              <Period>{car.rent.period}</Period>
              <Price>{car.rent.price}</Price>
            </Rent>
          </Details>

          <Accessories>
            {
              car.accessories.map(accessory => (
                <Accessory
                  key={accessory.type}
                  name={accessory.name}
                  icon={getAccessoryIcon(accessory.type)}
                />
              ))
            }
          </Accessories>

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
                R$ {car.rent.price} x{dates.length} diárias
              </RentalPriceQuota>
              <RentalPricetotal>R$ {rentTotal}</RentalPricetotal> 
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
