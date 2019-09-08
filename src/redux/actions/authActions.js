import firebase from 'firebase/fireClass';

import { fetchAccountSettings } from './accountSettingsActions';
import * as actionTypes from './actionTypes';

export const loginStart = () => ({
  type: actionTypes.AUTH_START,
});

export const loginSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId,
});

export const loginFailed = (error) => ({
  type: actionTypes.AUTH_FAILED,
  error,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationDate) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationDate * 1000);
};

export const setLoginRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const loginCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate > new Date()) {
      const userId = localStorage.getItem('userId');
      dispatch(loginSuccess(token, userId));
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      dispatch(fetchAccountSettings(token, userId));
    } else {
      dispatch(logout());
    }
  }
};

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
    dispatch(loginSuccess());
    dispatch(fetchAccountSettings(response.data.idToken, response.data.localId));
  } catch (error) {
    console.log(error);
    dispatch(loginFailed(error));
  }
};
