import * as actionTypes from './actionTypes';

// ----- SIMPLE ACTIONS ----- //
export const setAccountSettingsSuccess = (userInfo) => ({
  type: actionTypes.SET_ACCOUNT_SETTINGS_SUCCESS,
  userInfo,
});

// ----- COMPLEX ACTIONS ----- //

export const setAccountSettings = (userInfo) => (dispatch) => {
  console.log(userInfo);
  dispatch(setAccountSettingsSuccess(userInfo));
};

// export const fetchAccountSettings = () => async (dispatch) => {
//   console.log(firebase.auth.currentUser);
//   const { uid } = firebase.auth.currentUser;
//   try {
//     const { data } = await firebase.db.collection('users').where('userId', '==', uid).get();
//     const values = Object.values(data);
//     dispatch(setAccountSettings(values[0]));
//   } catch (error) {
//     dispatch(fetchAccountSettingsFailed(error));
//   }
// };
