import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerProps {
  backgroundColor?: string;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  align-items: center;
  justify-content: center;
  
  width: 100%;
  padding: ${RFValue(19)}px;

  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? backgroundColor : theme.colors.main
  };
`;

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};
`;
