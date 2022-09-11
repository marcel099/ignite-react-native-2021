import { renderHook, act } from '@testing-library/react-hooks';

import { AuthContextProvider, useAuth, } from './AuthContext';

jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => {
      return {
        type: 'success',
        params: {
          access_token: 'google-token'
        }
      }
    }
  }
});

describe("Auth Context", () => {
  it("should be able to sign in with an existent Google account", async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        id: 'userInfo.id',
        email: 'userInfo.email',
        name: 'userInfo.given_name',
        photo: 'userInfo.photo',
        locale: 'userInfo.locale',
        verified_email: 'userInfo.verified_email',
      })
    })) as jest.Mock;

    const { result } = renderHook(
      () => useAuth(),
      {
        wrapper: AuthContextProvider,
      }
    );

    await act(() => result.current.signInWithGoogle());

    console.log(result.current.user);
    expect(result.current.user).not.toBe(null);
  });
})