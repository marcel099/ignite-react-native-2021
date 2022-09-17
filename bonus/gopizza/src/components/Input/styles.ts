import styled, { css } from "styled-components/native";
import { TextInput } from 'react-native';

export type InputTypes = 'primary' | 'secondary';

interface Props {
  type: InputTypes;
}

export const Container = styled(TextInput).attrs<Props>(({ theme, type }) => ({
  placeholderTextColor: type === 'primary'
    ? theme.COLORS.SECONDARY_900 : theme.COLORS.PRIMARY_50,
}))<Props>`
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  font-size: 12px;

  width: 100%;
  height: 56px;
  padding: 7px 0;
  padding-left: 20px;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.COLORS.SHAPE};
  border-radius: 12px;

  background-color: transparent;

  ${({ theme, type }) => css`
    color: ${type === 'primary' ?
      theme.COLORS.SECONDARY_900 : theme.COLORS.TITLE};
  `}
`;
