import { TouchableOpacity } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1; 

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View` 
  width: 100%;
  height: ${RFValue(113)}px;

  background-color: ${({ theme }) => theme.colors.header};
  padding: 0 ${RFValue(16)}px ${RFValue(28)}px ${RFValue(16)}px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: auto;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const MyCarsButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;

  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(30)}px;

  background-color: ${({ theme }) => theme.colors.main};

  position: absolute;
  right: ${RFValue(22)}px;
  bottom: ${getBottomSpace() + RFValue(13)}px;
`;
