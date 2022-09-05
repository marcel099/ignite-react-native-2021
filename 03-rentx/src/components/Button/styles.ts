import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
  backgroundColor?: string;
}

export const Container = styled(RectButton)<ContainerProps>`
  align-items: center;
  justify-content: center;
  
  width: 100%;
  padding: ${RFValue(19)}px;

  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? backgroundColor : theme.colors.main
  };
`;

interface TitleProps {
  light?: boolean;
}

export const Title = styled.Text<TitleProps>`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme, light }) => light
    ? theme.colors.header : theme.colors.background_secondary};
`;
