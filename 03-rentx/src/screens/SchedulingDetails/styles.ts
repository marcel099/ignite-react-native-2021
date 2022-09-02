import styled from "styled-components/native";
import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
  margin-top: ${getStatusBarHeight()}px;
  margin-left: ${RFValue(24)}px;
  margin-right: ${RFValue(24)}px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
    alignItems: 'center',
  },
  showsVerticalScrollIndicator: true,
})``;

export const Details = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_details};

  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.title};
`;

export const Rent = styled.View``;

export const Period = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_details};

  text-transform: uppercase;
`;

export const Price = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.main};
`;

export const Accessories = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  
  width: 100%;
  margin-top: ${RFValue(16)}px;
`;

// export const About = styled.Text`
//   font-size: ${RFValue(15)}px;
//   font-family: ${({ theme }) => theme.fonts.primary_400};
//   color: ${({ theme }) => theme.colors.text};
//   line-height: ${RFValue(25)}px;

//   margin-top: ${RFValue(23)}px;
// `;

export const RentalPeriod = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: ${RFValue(40)}px;
  padding-bottom: ${RFValue(16)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const CalendarIcon = styled.View`
  justify-content: center;
  align-items: center;

  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  background-color: ${({ theme }) => theme.colors.main};
`;

export const DateInfo = styled.View``;

export const DateTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text_details};

  text-transform: uppercase;
`;

export const DateValue = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.title};
`;

export const RentalPrice = styled.View`
  width: 100%;
  margin-top: ${RFValue(16)}px;
`;

export const RentalPriceLabel = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text_details};

  text-transform: uppercase;
`;

export const RentalPriceDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  width: 100%;
`;

export const RentalPriceQuota = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.title};
`;

export const RentalPricetotal = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.success};
`;


export const Footer = styled.View`
  width: 100%;
  padding:
    ${RFValue(24)}px
    ${RFValue(24)}px
    ${getBottomSpace() + RFValue(24)}px;
  
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;
