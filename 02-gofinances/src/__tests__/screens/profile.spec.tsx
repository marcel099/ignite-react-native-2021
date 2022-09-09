import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile', () => {
  it('checks if it correctly shows input user name placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />);
  
    const inputName = getByPlaceholderText('Nome');
  
    expect(inputName.props.placeholder).toBe('Nome');
  });
  
  it('checks if user data has been loaded', () => {
    const { getByTestId } = render(<Profile />);
  
    const inputName = getByTestId("name-input");
    const inputLastName = getByTestId("last-name-input");
  
    expect(inputName).toBeTruthy();
    expect(inputName.props.value).toBe('Marcelo');
    expect(inputLastName).toBeTruthy();
    expect(inputLastName.props.value).toBe('Lupatini');
  });
  
  it("checks if title render correctly", () => {
    const { getByTestId } = render(<Profile />);
  
    const textTitle = getByTestId('title-text');
  
    expect(textTitle.props.children).toContain('Perfil');
  });
});
