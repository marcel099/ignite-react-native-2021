import styled, { css } from 'styled-components/native';

export const Image = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
`;

export const Placeholder = styled.View`
  justify-content: center;
  align-items: center;

  width: 160px;
  height: 160px;
  border-radius: 80px;
  border: 1px dashed ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const PlaceholderTitle = styled.Text`
  font-size: 14px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`
