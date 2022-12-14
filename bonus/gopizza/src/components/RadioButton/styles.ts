import styled, { css } from 'styled-components/native';

export type RadioButtonProps = {
  isSelected: boolean;
}

export const Container = styled.TouchableOpacity<RadioButtonProps>`
  width: 104px;
  height: 82px;
  padding: 14px 16px;
  border-radius: 8px;

  ${({ isSelected, theme }) => css`
    border-width: 1px;
    border-color: ${isSelected
      ? theme.COLORS.SUCCESS_900 : theme.COLORS.SHAPE};
    background-color: ${isSelected
      ? theme.COLORS.SUCCESS_50 : theme.COLORS.TITLE};
  `}
`;

export const Title = styled.Text`
  font-size: 16px;

  ${({ theme }) => css`
    border-color: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Radio = styled.View`
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 20px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.SECONDARY_900};
  border-radius: 10px;
`;

export const Selected = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;

  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
`;