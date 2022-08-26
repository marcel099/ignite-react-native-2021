import { useMemo, useState } from "react";
import { Alert, StatusBar } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from "styled-components";
import { format } from "date-fns";

import ArrowSvg from "../../assets/arrow.svg";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import {
  Calendar,
  DayProps,
  generateInterval,
  getPlatformDate,
  MarkedDateProps
} from "../../components/Calendar";
import { AppStackParamList } from "../../routes/stack.routes";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";

type SchedulingScreenProp = StackScreenProps<AppStackParamList, 'Scheduling'>;

interface RentalPeriod {
  formattedStart: string;
  formattedEnd: string;
}

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation<SchedulingScreenProp['navigation']>();
  const route = useRoute<SchedulingScreenProp['route']>();
  const { car } = route.params;

  const [
    lastSelectedDate, setLastSelectedDate
  ] = useState<DayProps | null>(null);
  const [
    markedDates, setMarkedDates
  ] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [
    rentalPeriod,
    setRentalPeriod
  ] = useState<RentalPeriod | null>(null);

  function handleGoBackCarDetails() {
    navigation.pop();
  }

  function handleConfirmRentalPeriod() {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleChangeDate(date: DayProps) {
    const timeZoneDifferenceInMiliseconds = 3 * 60 * 60 * 1000;
    date.timestamp += timeZoneDifferenceInMiliseconds;

    let start = lastSelectedDate === null ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      let swap = start;
      start = end;
      end = swap;
    }

    setLastSelectedDate(date);

    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const formattedStart = format(
      getPlatformDate(new Date(start.timestamp)), 'dd/MM/yyyy'
    );
    const formattedEnd = format(
      getPlatformDate(new Date(end.timestamp)), 'dd/MM/yyyy'
    );

    setRentalPeriod({
      formattedStart,
      formattedEnd,
    });
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
          <BackButton
            color={theme.colors.shape}
            onPress={handleGoBackCarDetails}
          />

          <Title>
            Escolha uma {'\n'}
            data de início e {'\n'}
            fim do aluguel
          </Title>

          <RentalPeriod>
            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue
                isSelected={rentalPeriod !== null}
              >
                {rentalPeriod?.formattedStart ?? ''}
              </DateValue>
            </DateInfo>

            <ArrowSvg />
            
            <DateInfo>
              <DateTitle>ATÉ</DateTitle>
              <DateValue
                isSelected={rentalPeriod !== null}
              >
                {rentalPeriod?.formattedEnd ?? ''}
              </DateValue>
            </DateInfo>
          </RentalPeriod>
        </Header>

        <Content>
          <Calendar
            onDayPress={handleChangeDate}
            markedDates={markedDates}
          />
        </Content>

        <Footer>
          <Button
            title="Confirmar"
            onPress={handleConfirmRentalPeriod}
            disabled={rentalPeriod === null}
          />
        </Footer>
      </Container>
    </>
  );
}
