import * as axiosInstance from 'api/axios-instances';
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

export const setAccountSettingsStart = () => ({
  type: actionTypes.SET_ACCOUNT_SETTINGS_START,
});

export const setAccountSettingsSuccess = (data) => ({
  type: actionTypes.SET_ACCOUNT_SETTINGS_START,
  data,
});

export const setAccountSettingsFailed = (error) => ({
  type: actionTypes.SET_ACCOUNT_SETTINGS_START,
  error,
});

// ----- COMPLEX ACTIONS ----- //
export const fetchAccountSettings = (token, userId) => async (dispatch) => {
  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  try {
    const { data } = await axiosInstance.instanceData.get(`/users.json${queryParams}`);
    const values = Object.values(data);
    dispatch(fetchAccountSettingsSuccess(values[0]));
  } catch (error) {
    dispatch(fetchAccountSettingsFailed(error));
  }
};

export const setAccountSettings = (userInfo, data) => async (dispatch) => {
  dispatch(setAccountSettingsStart());
  const userInfoPayload = {
    ...userInfo,
    userId: data.localId,
  };
  try {
    const response = await axiosInstance.instanceData.post(`/users.json?auth=${data.idToken}`, userInfoPayload);
    dispatch(setAccountSettingsSuccess(response));
  } catch (error) {
    dispatch(setAccountSettingsFailed(error));
  }
};
