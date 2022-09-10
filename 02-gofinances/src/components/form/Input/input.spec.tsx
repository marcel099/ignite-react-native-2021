import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { theme } from '../../../global/styles/theme';
import { Input } from '.';

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);

describe('Input Component', () => {
  it('must have specfic border color when active', () => {
    const { getByTestId } = render(
      <Input
        testID="email-input"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        active
      />,
      {
        wrapper: Providers,
      }
    );

    const inputComponent = getByTestId('email-input');

    expect(inputComponent.props.style[0].borderColor)
      .toBe(theme.colors.danger);

    expect(inputComponent.props.style[0].borderWidth)
      .toBe(3);
  });
})