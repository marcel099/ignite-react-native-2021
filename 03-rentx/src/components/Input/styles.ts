import { TextInput } from 'react-native';
import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;

  flex-direction: row;
`;

interface InputContainerProps {
  isFocused: boolean;
}

export const IconContainer = styled.View<InputContainerProps>`
  justify-content: center;
  align-items: center;

  height: ${RFValue(53)}px;
  width: ${RFValue(55)}px; 
  margin-right: ${RFValue(2)}px;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  border-bottom-width: ${RFValue(2)}px;
  border-bottom-color: transparent;

  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-color: ${theme.colors.main};
  `}
`;

interface InputTextProps {
  isFocused: boolean;
}

export const InputText = styled(TextInput)<InputTextProps>`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 ${RFValue(23)}px;

  border-bottom-width: ${RFValue(2)}px;
  border-bottom-color: transparent;

  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-color: ${theme.colors.main};
  `}
`;
