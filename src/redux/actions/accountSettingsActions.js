import * as axiosInstance from 'api/axios-instances';
import * as actionTypes from './actionTypes';
import { authSuccess, authFailed } from './authActions';

export const setAccountSettings = (userInfo, data) => {
  userInfo = {
    ...userInfo,
    userId: data.localId,
  };
  return (dispatch) => {
    axiosInstance.instanceData.post(`/users.json?auth=${data.idToken}`, userInfo)
      .then((response) => {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch((error) => {
        console.log('settings failed');
        dispatch(authFailed(error));
      });
  };
};

export const fetchAccountSettingsSuccess = (userInfo) => ({
  type: actionTypes.FETCH_ACCOUNT_SETTINGS_SUCCESS,
  userInfo,
});

export const fetchAccountSettings = (token, userId) => (dispatch) => {
  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  axiosInstance.instanceData.get(`/users.json${queryParams}`)
    .then((response) => {
      let accountSettings = {};
      for (const key in response.data) {
        accountSettings = {
          ...response.data[key],
          id: key,
        };
      }
      dispatch(fetchAccountSettingsSuccess(accountSettings));
    })
    .catch((error) => {
      // dispatch(fetchACcountSettingsFailed(error));
    });
};
