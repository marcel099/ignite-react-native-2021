import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface ContainerProps {
  active: boolean;
}

export const Container = styled.TextInput<ContainerProps>`
  width: 100%;
  padding: ${RFValue(18)}px ${RFValue(16)}px;
  margin-bottom: ${RFValue(8)}px;
  border-radius: 5px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.darkText};

  background-color: ${({ theme }) => theme.colors.shape};

  ${({ active, theme }) => active && css`
    border-width: 3px;
    border-color: ${theme.colors.danger};
  `}
`;
