import * as actionTypes from '../actions/actionTypes';

const initialState = {
  byId: {
    devName: '',
    email: '',
    website: '',
    phone: '',
  },
  allIds: ['devName', 'email', 'website', 'phone'],
};

const fetchAccountSettingsSuccess = (state, action) => (
  {
    ...state,
    byId: {
      ...state.byId,
      devName: action.userInfo.devName,
      email: action.userInfo.email,
      website: action.userInfo.website,
      phone: action.userInfo.phone,
    },
  });


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACCOUNT_SETTINGS_SUCCESS:
      return fetchAccountSettingsSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
