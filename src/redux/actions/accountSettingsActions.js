import * as axiosInstance from 'api/axios-instances';
import firebase from 'firebase/fireClass';
import { firestore } from 'firebase';
import * as actionTypes from './actionTypes';

// ----- SIMPLE ACTIONS ----- //
export const fetchAccountSettingsStart = () => ({
  type: actionTypes.FETCH_ACCOUNT_SETTINGS_START,
});

export const fetchAccountSettingsSuccess = (userInfo) => ({
  type: actionTypes.FETCH_ACCOUNT_SETTINGS_SUCCESS,
  userInfo,
});

export const fetchAccountSettingsFailed = (error) => ({
  type: actionTypes.FETCH_ACCOUNT_SETTINGS_FAILED,
  error,
});

// ----- COMPLEX ACTIONS ----- //
export const fetchAccountSettings = () => async (dispatch) => {
  console.log(firebase.auth.currentUser);
  const { uid } = firebase.auth.currentUser;
  try {
    const { data } = await firebase.db.collection('users').where('userId', '==', uid).get();
    const values = Object.values(data);
    dispatch(fetchAccountSettingsSuccess(values[0]));
  } catch (error) {
    dispatch(fetchAccountSettingsFailed(error));
  }
};
