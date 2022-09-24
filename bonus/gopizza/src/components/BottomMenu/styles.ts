import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

type TitleProps = {
  color: string;
}

export const Title = styled.Text<TitleProps>`
  ${({ color, theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${color};
  `}
`;

type NotificationProps = {
  noNotifications: boolean;
}

export const Notification = styled.View<NotificationProps>`
  align-items: center;
  justify-content: center;

  height: 20px;
  padding: 0 12px;
  margin-left: 8px;
  border-radius: 12px;

  ${({ noNotifications, theme }) => noNotifications === false && css`
    background-color: ${theme.COLORS.SUCCESS_900};
  `}

  ${({ noNotifications, theme }) => noNotifications === true && css`
    background-color: transparent;
    border: 1px solid ${theme.COLORS.SHAPE};
  `}
`;

export const Quantity = styled.Text<NotificationProps>`
  font-size: 12px;

  ${({ noNotifications, theme }) => css`
    color: ${noNotifications
      ? theme.COLORS.SECONDARY_500 : theme.COLORS.TITLE};
    font-family: ${theme.FONTS.TEXT};
  `}
`;
