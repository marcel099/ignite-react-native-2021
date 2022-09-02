import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.header};

  width: 100%; 
  height: ${RFValue(243)}px;

  padding: ${RFValue(25)}px;
  padding-top: ${getStatusBarHeight() + RFValue(31)}px;
  padding-bottom: 0;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};
  line-height: ${RFValue(34)}px;

  margin-top: ${RFValue(24)}px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  color: ${({ theme }) => theme.colors.shape};
  line-height: ${RFValue(34)}px;

  margin-top: ${RFValue(14)}px;
  margin-bottom: ${RFValue(34)}px;
`;

export const Content = styled.View`
  flex: 1;

  width: 100%;
  padding: 0 ${RFValue(16)}px;
`;

export const Appointments = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: ${RFValue(24)}px 0;
`;

export const AppointimentsTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const AppointimentsQuantity = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.title};
`;

export const CarCardWrapper = styled.View`
  margin-bottom: ${RFValue(16)}px;
`;

export const CarCardFooter = styled.View`
  flex-direction: row;
  align-items:  center;
  justify-content: space-between;

  width: 100%;
  padding: ${RFValue(12)}px;
  margin-top: ${RFValue(-10)}px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const CarCardFooterTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_details};
`;

export const CarCardFooterPeriod = styled.View`
  flex-direction: row;
`;

export const CarCardFooterDate = styled.Text`
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.title};
`;
