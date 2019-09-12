import * as actionTypes from 'redux/actions/actionTypes';

const initialState = {
  byId: {
    devName: '',
    email: '',
    website: '',
    phone: '',
  },
  allIds: ['devName', 'email', 'website', 'phone'],
};

const setAccountSettingsSuccess = (state, action) => {
  console.log(action);
  return {
    ...state,
    byId: {
      devName: action.userInfo.devName,
      email: action.userInfo.email,
      website: action.userInfo.website,
      phone: action.userInfo.phone,
    },
  };
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACCOUNT_SETTINGS_SUCCESS:
      return setAccountSettingsSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
