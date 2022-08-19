import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Form = styled.View`
  justify-content: space-between;
  flex: 1;

  width: 100%;
  padding: ${RFValue(24)}px;
`;

export const Fields = styled.View``;

export const TransactionTypeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: ${RFValue(8)}px;
  margin-bottom: ${RFValue(16)}px;
`;