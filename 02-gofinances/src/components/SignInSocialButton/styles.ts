import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Button = styled.View`
  align-items: center;
  flex-direction: row;

  height: ${RFValue(56)}px;
  margin-bottom: ${RFValue(16)}px;
  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;

  height: 100%;
  padding: ${RFValue(16)}px;
  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;
`;

export const Title = styled.Text`
  flex: 1;

  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  text-align: center;
`;
