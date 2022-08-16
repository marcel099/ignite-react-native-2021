import { RectButton } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { TransactionType } from "../../../screens/Register";

interface ContainerProps {
  isActive: boolean;
  type: TransactionType;
}

export const Container = styled.View<ContainerProps>`
  border-width: ${({ isActive }) => isActive ? 0 : 1.5 }px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  
  width: 48%;
  
  ${({ isActive, type }) => isActive && type === 'deposit' && css`
    background-color: ${({ theme }) => theme.colors.lightSuccess};
  `}

  ${({ isActive, type }) => isActive && type === 'withdraw' && css`
    background-color: ${({ theme }) => theme.colors.lightDanger};
  `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  padding: ${RFValue(16)}px 0;
`;

interface IconProps {
  type: TransactionType;
}

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) =>
    type === 'deposit' ? theme.colors.success : theme.colors.danger
  }
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  margin-left: ${RFValue(12)}px;
`;
