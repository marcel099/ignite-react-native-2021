import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { ImageSlider } from "../../components/ImageSlider";

import { getAccessoryIcon } from '../../global/utils/getAccessoryIcon';

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

type CarDetailsScreenProp = StackScreenProps<AppStackParamList, 'CarDetails'>;

export function CarDetails() {
  const navigation = useNavigation<CarDetailsScreenProp['navigation']>();
  const route = useRoute<CarDetailsScreenProp['route']>();
  const { car } = route.params;

  function handleGoBackHome() {
    navigation.pop();
  }

  function handleShowScheduling() {
    navigation.navigate('Scheduling', { car });
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Container>
        <Header>
          <BackButton
            onPress={handleGoBackHome}
          />
        </Header> 

        <CarImages>
          <ImageSlider imagesUrl={car.photos} />
        </CarImages>

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

          <About>{ car.about }</About>

        </Content>

        <Footer>
          <Button
            title="Escolher período de aluguel"
            onPress={handleShowScheduling}
          />
        </Footer>
      </Container>
    </>
  );
}
