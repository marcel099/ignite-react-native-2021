import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;

  width: ${RFValue(80)}px;
  height: ${RFValue(56)}px;

  background-color: ${({ theme }) => theme.colors.dark_shape};
`;

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};
`;
