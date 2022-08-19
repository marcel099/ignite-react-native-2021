import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  padding: ${RFValue(13)}px ${RFValue(24)}px;
  margin-bottom: ${RFValue(8)}px;
  border-radius: 5px;
  border-left-width: ${RFValue(4)}px;
  border-left-color: ${({ color }) => color};

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
`;

