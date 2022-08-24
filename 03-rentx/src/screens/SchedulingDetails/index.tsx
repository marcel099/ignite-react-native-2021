import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { ImageSlider } from "../../components/ImageSlider";

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

import { AppStackParamList } from "../../routes/stack.routes";

import {
  Container,
  Header,
  CarImages,
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

type SchedulingDetailsScreenProp = StackNavigationProp<AppStackParamList, 'SchedulingDetails'>;

export function SchedulingDetails() {
  const navigation = useNavigation<SchedulingDetailsScreenProp>();
  const theme = useTheme();

  function handleGoBackScheduling() {
    navigation.pop();
  }

  function handleShowScheduleCompleted() {
    navigation.navigate('ScheduleCompleted');
  }

  return (
    <Container>
      <Header>
        <BackButton
          onPress={handleGoBackScheduling}
        />
      </Header> 

      <CarImages>
        <ImageSlider imagesUrl={['https://w7.pngwing.com/pngs/174/445/png-transparent-audi-car-audi-a4-cars.png']} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580,00</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380 km/h" icon={SpeedSvg} />
          <Accessory name="3.2 s" icon={AccelerationSvg} />
          <Accessory name="800 HP" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 pessoas" icon={PeopleSvg} />
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
            <DateValue>24/08/2022</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>26/08/2022</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPricetotal>R$ 2.900</RentalPricetotal> 
          </RentalPriceDetails>
        </RentalPrice>

      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleShowScheduleCompleted}
        />
      </Footer>
    </Container>
  );
}
