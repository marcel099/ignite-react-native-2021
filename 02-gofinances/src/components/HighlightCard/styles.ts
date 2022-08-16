import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const icon = Feather;

import { HightlightCardType } from ".";

interface ContainerProps {
  type: HightlightCardType
}

export const Container = styled.View<ContainerProps>`
  background-color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.secondary : theme.colors.shape 
  };

  width: ${RFValue(300)}px;
  border-radius: 5px;

  padding: ${RFValue(19)}px ${RFValue(20)}px ${RFValue(42)}px ${RFValue(22)}px;
  margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

interface TitleProps {
  type: HightlightCardType
}

export const Title = styled.Text<TitleProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.darkText
  };
`;

interface IconProps {
  type: HightlightCardType
}

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(40)}px;

  ${({ type }) => type === 'deposit' && css`
    color: ${({ theme }) => theme.colors.success};
  `};

  ${({ type }) => type === 'withdraw' && css`
    color: ${({ theme }) => theme.colors.danger};
  `};

  ${({ type }) => type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
  `};
`;

export const Content = styled.View``;

interface AmountProps {
  type: HightlightCardType
}

export const Amount = styled.Text<AmountProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.darkText
  };

  margin-top: ${RFValue(38)}px;
`;

interface LastTransactionProps {
  type: HightlightCardType
}

export const LastTransaction = styled.Text<LastTransactionProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.text
  };
`;

