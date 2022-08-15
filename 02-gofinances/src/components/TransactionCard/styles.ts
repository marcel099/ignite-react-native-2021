import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { TransactionType } from "../../screens/Dashboard";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  padding: ${RFValue(17)}px ${RFValue(24)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

interface AmountProps {
  type: TransactionType
}

export const Amount = styled.Text<AmountProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, type }) =>
    type === 'deposit' ? theme.colors.success : theme.colors.danger
  };

  margin-top: 2px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${RFValue(19)}px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};

  margin-left: ${RFValue(17)}px;
`;

export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;
