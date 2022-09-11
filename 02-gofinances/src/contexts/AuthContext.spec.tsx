import { renderHook, act } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startAsync } from 'expo-auth-session'; 

import { AuthContextProvider, useAuth, } from './AuthContext';
import { SIGNED_IN_USER_COLLECTION } from '../global/configs/storage';

jest.mock('expo-auth-session');

describe("Auth Context", () => {
  beforeEach(async () => {
    await AsyncStorage.removeItem(SIGNED_IN_USER_COLLECTION)
 })

  it("should be able to sign in with an existent Google account", async () => {
    const googleMocked = jest.mocked(startAsync as any);

    googleMocked.mockResolvedValueOnce({  
      type: 'success',
      params: {
        access_token: 'google-token',
      }
    });
   
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

    expect(result.current.user).not.toBe(null);
  });

  it("should not connect if user cancels Google authentication", async () => {
    const googleMocked = jest.mocked(startAsync as any);

    googleMocked.mockResolvedValueOnce({
      type: 'cancel',
    });

    const { result } = renderHook(
      () => useAuth(),
      {
        wrapper: AuthContextProvider,
      }
    );

    await act(async () => {
      expect(
        result.current.signInWithGoogle()
      ).rejects.toEqual(new Error('Autenticação cancelada'));
    });

    expect(result.current.user).toBe(null);
  });
})