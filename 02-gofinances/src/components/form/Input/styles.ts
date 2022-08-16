import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TextInput`
  width: 100%;
  padding: ${RFValue(18)}px ${RFValue(16)}px;
  margin-bottom: ${RFValue(8)}px;
  border-radius: 5px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.darkText};

  background-color: ${({ theme }) => theme.colors.shape};
`;
