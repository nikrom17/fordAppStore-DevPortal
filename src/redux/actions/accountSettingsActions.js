import * as axiosInstance from 'api/axios-instances';
import * as actionTypes from './actionTypes';

export const setAccountSettings = (userInfo, data) => {
  const userInfoPayload = {
    ...userInfo,
    userId: data.localId,
  };
  return (dispatch) => {
    axiosInstance.instanceData.post(`/users.json?auth=${data.idToken}`, userInfoPayload)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response); // todo create success action for posting account settings
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('settings failed');
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
      console.log(error);
    });
};
