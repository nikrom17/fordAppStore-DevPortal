import * as actionTypes from './actionTypes';
import { setAccountSettings, fetchAccountSettings } from './accountSettings';
import * as axiosInstance from '../../api/axios-instances';
import { authRef } from '../../Firebase';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId,
});

export const authFailed = (error) => ({
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

export const auth = (userInfo, password, isSignup) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email: userInfo.email.value,
    password: password.value,
    returnSecureToken: true,
  };
  const url = isSignup
    ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDughZWs2UYSt-CEZUXtY9HUVch2NZxOU8'
    : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDughZWs2UYSt-CEZUXtY9HUVch2NZxOU8';
  axiosInstance.instanceData.post(url, authData)
    .then((response) => {
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);
      dispatch(checkAuthTimeout(response.data.expiresIn));
      if (isSignup) {
        dispatch(setAccountSettings(userInfo, response.data));
      } else {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(fetchAccountSettings(response.data.idToken, response.data.localId));
      }
      authRef.signInWithEmailAndPassword(userInfo.email.value, password.value);
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response.data.error.message);
      dispatch(authFailed(error.response.data.error));
    });
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate > new Date()) {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      dispatch(fetchAccountSettings(token, userId));
    } else {
      dispatch(logout());
    }
  }
};
