import { StatusBar } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from "styled-components";

import ArrowSvg from "../../assets/arrow.svg";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";
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

type SchedulingScreenProp = StackNavigationProp<AppStackParamList, 'Scheduling'>;

export function Scheduling() {
  const navigation = useNavigation<SchedulingScreenProp>();
  const theme = useTheme();

  function handleGoBackCarDetails() {
    navigation.pop();
  }

  function handleShowSchedulingDetails() {
    navigation.navigate('SchedulingDetails');
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
              <DateValue isSelected={false}></DateValue>
            </DateInfo>

            <ArrowSvg />
            
            <DateInfo>
              <DateTitle>ATÉ</DateTitle>
              <DateValue isSelected={true}>24/08/2022</DateValue>
            </DateInfo>
          </RentalPeriod>
        </Header>

        <Content>
          <Calendar />
        </Content>

        <Footer>
          <Button
            title="Confirmar"
            onPress={handleShowSchedulingDetails}
          />
        </Footer>
      </Container>
    </>
  );
}
