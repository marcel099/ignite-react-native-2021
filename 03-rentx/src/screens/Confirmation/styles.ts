import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};

  padding-top: ${getStatusBarHeight() + RFValue(66)}px;
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};

  margin-top: ${RFValue(40)}px;
`;

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text_details};
  line-height: ${RFValue(25)}px;
  text-align: center;

  margin-top: ${RFValue(16)}px;
`;

export const Footer = styled.View`
  align-items: center;
  
  width: 100%;
  margin-top: ${RFValue(80)}px;
  margin-bottom: ${RFValue(46)}px;
  /* margin: ${RFValue(80)}px 0; */
`;