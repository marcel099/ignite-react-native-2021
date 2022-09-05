import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerProps {
  active: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: ${RFValue(6)}px;
  height: ${RFValue(6)}px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape
  };

  margin-left: ${RFValue(8)}px;
  border-radius: ${RFValue(4)}px;
`;
