import * as actionTypes from 'redux/actions/actionTypes';
import { updateObject } from 'utils/utility';

const initialState = {
  appDetails: null,
  loading: false,
  apps: [],
  forbiddenModal: false,
  error: null,
};

const fetchAppsSuccess = (state, action) => updateObject(state, {
  apps: action.apps,
  loading: false,
});

const fetchAppsFailed = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

const fetchAppsStart = (state) => updateObject(state, {
  loading: true,
});

const deleteAppFailed = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

const deleteAppStart = (state) => updateObject(state, {
  loading: true,
});

const deleteAppSuccess = (state, action) => {
  const updatedApps = state.apps.filter((index) => {
    // eslint-disable-next-line no-console
    console.log(index); // todo remove this console.log
    return index !== action.appId;
  });
  return updateObject(state, {
    apps: updatedApps,
  });
};

const deleteAppForbidden = (state) => updateObject(state, {
  forbiddenModal: !state.forbiddenModal,
});

const resetStateOnLogout = (state) => updateObject(state, {
  apps: [],
  appDetails: null,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_APP_START:
      return fetchAppsStart(state);
    case actionTypes.FETCH_APP_SUCCESS:
      return fetchAppsSuccess(state, action);
    case actionTypes.FETCH_APP_FAILED:
      return fetchAppsFailed(state, action);
    case actionTypes.DELETE_APP_SUCCESS:
      return deleteAppSuccess(state, action);
    case actionTypes.DELETE_APP_FAILED:
      return deleteAppFailed(state, action);
    case actionTypes.DELETE_APP_START:
      return deleteAppStart(state);
    case actionTypes.RESET_APP_STATE:
      return resetStateOnLogout(state);
    case actionTypes.DELETE_APP_FORBIDDEN:
      return deleteAppForbidden(state);
    default:
      return state;
  }
};

export default reducer;
