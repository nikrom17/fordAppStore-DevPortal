import firebase from 'firebase/fireClass';

import { fetchAccountSettings } from './accountSettingsActions';
import * as actionTypes from './actionTypes';

export const loginStart = () => ({
  type: actionTypes.AUTH_START,
});

export const loginSuccess = () => ({
  type: actionTypes.AUTH_SUCCESS,
});

export const loginFailed = (error) => ({
  type: actionTypes.AUTH_FAILED,
  error,
});

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const setLoginRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const login = (
  email, password, { devName, phone, website }, isSignup,
) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = isSignup
      ? await firebase.register(
        email.value, password.value, devName.value, phone.value, website.value,
      )
      : await firebase.login(email.value, password.value);
    dispatch(fetchAccountSettings());
    dispatch(loginSuccess());
  } catch (error) {
    console.log(error);
    dispatch(loginFailed(error));
  }
};
