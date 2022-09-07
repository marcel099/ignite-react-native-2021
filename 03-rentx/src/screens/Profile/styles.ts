import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  align-items: center;

  width: 100%;
  height: ${getStatusBarHeight() + RFValue(227)}px;
  padding: 0 ${RFValue(24)}px;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const HeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: ${getStatusBarHeight() + RFValue(31)}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};

  color: ${({ theme }) => theme.colors.background_secondary};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: ${RFValue(180)}px;
  height: ${RFValue(180)}px;
  border-radius: ${RFValue(90)}px;

  background-color: ${({ theme }) => theme.colors.shape};
  margin-top: ${RFValue(48)}px;
`;

export const Photo = styled.Image`
  width: ${RFValue(180)}px;
  height: ${RFValue(180)}px;
  border-radius: ${RFValue(90)}px;
`;

export const ChangePhotoButton = styled(RectButton)`
  justify-content: center;
  align-items: center;

  height: ${RFValue(40)}px;
  width: ${RFValue(40)}px;

  background-color: ${({ theme }) => theme.colors.main};

  position: absolute;
  bottom: ${RFValue(10)}px;
  right: ${RFValue(10)}px;
`;

export const Content = styled.View`
  padding: 0 ${RFValue(24)}px;
  margin-top: ${RFValue(122)}px;
`;

export const Options = styled.View`
  flex-direction: row;
  justify-content: space-evenly;

  margin-bottom: ${RFValue(24)}px;

  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

interface OptionProps {
  active: boolean;
}

export const Option = styled.TouchableOpacity<OptionProps>`
  padding-bottom: ${RFValue(14)}px;

  border-bottom-width: ${RFValue(2)}px;
  border-bottom-color: ${({ theme, active }) =>
    active ? theme.colors.main : 'transparent'};
`;

interface OptionTitleProps {
  active: boolean;
}

export const OptionTitle = styled.Text<OptionTitleProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme, active }) =>
    active ? theme.fonts.secondary_600 : theme.fonts.secondary_500};
  color: ${({ theme, active }) =>
    active ? theme.colors.header : theme.colors.text_details };
`;

export const Section = styled.View``;