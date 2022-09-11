import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';

import {
  AuthContextProvider
} from '../../contexts/AuthContext';
import {
  TransactionsContextProvider
} from '../../contexts/TransactionsContext';
import { theme } from '../../global/styles/theme';
import { Register } from '.';

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AuthContextProvider>
      <TransactionsContextProvider>
        <NavigationContainer>
          { children }
        </NavigationContainer>
      </TransactionsContextProvider>
    </AuthContextProvider>
  </ThemeProvider>
);

describe('Register Screen', () => {
  it('should open category modal when user clicks on the category button', () => {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers,
      }
    );

    const categoryModal = getByTestId('category-modal');
    expect(categoryModal.props.visible).toBe(false);

    const categorySelectButton = getByTestId('category-select-button');

    fireEvent.press(categorySelectButton);

    expect(categoryModal.props.visible).toBe(true);
  });
});
