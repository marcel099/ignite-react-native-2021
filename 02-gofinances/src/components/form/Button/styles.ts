import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  align-items: center;

  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};

  padding: ${RFValue(18)}px;
  border-radius: 5px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
`;
