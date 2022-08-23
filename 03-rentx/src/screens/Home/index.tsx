import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import LogoSvg from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from "./styles";

export function Home() {
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
              Total de 12 carros
            </TotalCars>
          </HeaderContent>
        </Header>
      </Container>
    </>
  );
}
