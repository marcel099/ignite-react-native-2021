import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
  About,
  Footer,
} from "./styles";

type CarDetailsScreenProp = StackNavigationProp<AppStackParamList, 'CarDetails'>;

export function CarDetails() {
  const navigation = useNavigation<CarDetailsScreenProp>();

  function handleGoBackHome() {
    navigation.pop();
  }

  function handleShowScheduling() {
    navigation.navigate('Scheduling');
  }

  return (
    <Container>
      <Header>
        <BackButton
          onPress={handleGoBackHome}
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

        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maenstranza de SEvilla. É um belíssimo caro para quem gosta de acelerar.
        </About>

      </Content>

      <Footer>
        <Button
          title="Escolher período de aluguel"
          onPress={handleShowScheduling}
        />
      </Footer>
    </Container>
  );
}
