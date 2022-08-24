import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  justify-content: center;
  align-items: center;

  width: ${RFValue(103)}px;
  height: ${RFValue(92)}px;
  padding: ${RFValue(16)}px;
  margin-bottom: ${RFValue(8)}px;
  /* margin-left: ${RFValue(1)}px; */

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Name = styled.Text`
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text};
`
