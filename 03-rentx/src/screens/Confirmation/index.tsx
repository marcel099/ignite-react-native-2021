import { StatusBar, useWindowDimensions } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
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

type ConfirmationScreenProp =
  StackScreenProps<AppStackParamList, 'Confirmation'>;

export function Confirmation() {
  const navigation =
    useNavigation<ConfirmationScreenProp['navigation']>();
  const { params: { title, message, nextScreenName }} =
    useRoute<ConfirmationScreenProp['route']>();

  const { width } = useWindowDimensions();

  function handleGoBackHome() {
    navigation.navigate(nextScreenName as any);
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
          
          <Title>{ title }</Title>
          <Message>{ message }</Message>
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
