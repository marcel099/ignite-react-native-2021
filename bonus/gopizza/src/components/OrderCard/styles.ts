import styled, { css } from 'styled-components/native';

type ContainerProps = {
  index: number;
}

export type StatusTypeProps = 'Preparando' | 'Pronto' | 'Entregue';

type StatusProps = {
  status: StatusTypeProps;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  align-items: center;

  width: 50%;
  padding: 24px;

  ${({ index, theme }) => css`
    border-right-width: ${index % 2 === 1 ? 0 : 1}px;
    border-right-color: ${theme.COLORS.SHAPE};
  `}
`;

export const Image = styled.Image`
  width: 104px;
  height: 104px;
  border-radius: 52px;
`;

export const Name = styled.Text`
  margin-top: 21px;
  font-size: 20px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Description = styled.Text`
  margin-top: 11px;
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_400};
  `}
`;

export const StatusContainer = styled.View<StatusProps>`
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
  margin-top: 16px;
  border-radius: 12px;

  ${({ status, theme }) => status === 'Preparando' && css`
    background-color: ${theme.COLORS.ALERT_50};
    border: 1px solid ${theme.COLORS.ALERT_900};
  `}

  ${({ status, theme }) => status === 'Pronto' && css`
    background-color: ${theme.COLORS.SUCCESS_900};
  `}

  ${({ status, theme }) => status === 'Entregue' && css`
    background-color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const StatusLabel = styled.Text<StatusProps>`
  font-size: 12px;
  line-height: 20px;

  ${({ status, theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${status === 'Preparando'
      ? theme.COLORS.ALERT_900 : theme.COLORS.TITLE};
  `}
`;