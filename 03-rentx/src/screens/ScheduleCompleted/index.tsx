import { useWindowDimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
} from "./styles";
import { ConfirmButton } from "../../components/ConfirmButton";

export function ScheduleCompleted() {
  const { width } = useWindowDimensions();

  return (
    <Container>
      <LogoSvg
        width={width}
        height={RFValue(235)}
      />

      <Content>
        <DoneSvg
          width={RFValue(80)}
          height={RFValue(80)}
        />
        
        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="Ok" />
      </Footer>
    </Container>
  );
}
