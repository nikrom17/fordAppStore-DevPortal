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
