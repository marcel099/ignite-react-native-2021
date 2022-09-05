import { TextInput } from 'react-native';
import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from 'react-native-gesture-handler';

interface NotContainerProps {
  isFocused: boolean;
}

export const Container = styled.View`
  width: 100%;

  flex-direction: row;
`;

export const IconContainer = styled.View<NotContainerProps>`
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

export const InputText = styled(TextInput)<NotContainerProps>`
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

export const ChangePasswordVisibilityButton = styled(BorderlessButton)`
  justify-content: center;
  align-items: center;

  height: ${RFValue(53)}px;
  width: ${RFValue(56)}px; 

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;