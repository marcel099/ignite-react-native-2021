import { TextInput } from 'react-native';
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;

  flex-direction: row;
`;

export const IconContainer = styled.View`
  justify-content: center;
  align-items: center;

  height: ${RFValue(55)}px;
  width: ${RFValue(55)}px; 
  margin-right: ${RFValue(2)}px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const InputText = styled(TextInput)`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 ${RFValue(23)}px;
`;
