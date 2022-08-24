import styled, { css } from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.header};

  width: 100%; 
  height: ${RFValue(325)}px;

  padding: ${RFValue(25)}px;
  padding-top: ${getStatusBarHeight() + RFValue(30)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(34)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};

  margin-top: ${RFValue(24)}px;
`;

export const RentalPeriod = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin: ${RFValue(32)}px 0;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text};
`;

interface DateValueProps {
  isSelected: boolean;
}

export const DateValue = styled.Text<DateValueProps>`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};

  ${({ isSelected, theme }) => !isSelected && css`
    border-bottom-width: ${RFValue(1)}px;
    border-bottom-color: ${theme.colors.text};
    padding-bottom: ${RFValue(5)}px;
  `};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
  showsVerticalScrollIndicator: false,
})``;

export const Footer = styled.View`
  padding: ${RFValue(24)}px;
`;
