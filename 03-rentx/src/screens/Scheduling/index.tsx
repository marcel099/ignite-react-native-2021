import { StatusBar } from "react-native";
import { useTheme } from "styled-components";

import ArrowSvg from "../../assets/arrow.svg";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";

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

export function Scheduling() {
  const theme = useTheme();

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
          />
        </Footer>
      </Container>
    </>
  );
}
