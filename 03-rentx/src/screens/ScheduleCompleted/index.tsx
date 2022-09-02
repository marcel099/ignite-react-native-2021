import { StatusBar, useWindowDimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RFValue } from "react-native-responsive-fontsize";

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from "../../components/ConfirmButton";
import { AppStackParamList } from "../../routes/stack.routes";

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
} from "./styles";

type SchedulingDetailsScreenProp = StackNavigationProp<AppStackParamList, 'SchedulingDetails'>;

export function ScheduleCompleted() {
  const navigation = useNavigation<SchedulingDetailsScreenProp>();
  const { width } = useWindowDimensions();

  function handleGoBackHome() {
    navigation.navigate('Home');
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
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
          <ConfirmButton
            title="Ok"
            onPress={handleGoBackHome}
          />
        </Footer>
      </Container>
    </>
  );
}
