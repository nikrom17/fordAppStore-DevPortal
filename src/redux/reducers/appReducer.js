import * as actionTypes from 'redux/action/actionTypes.action';
import { updateObject } from 'utils/utility';

const initialState = {
    appDetails: null,
    loading: false,
    apps: [],
    forbiddenModal: false,
    error: null
};

const fetchAppsSuccess = (state, action ) => {
    return updateObject(state, {
        apps: action.apps,
        loading: false
    });
};

const fetchAppsFailed = (state, action ) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const fetchAppsStart = (state) => {
    return updateObject(state, {
        loading: true
    });
};

const deleteAppFailed = (state, action ) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const deleteAppStart = (state) => {
    return updateObject(state, {
        loading: true
    });
};

const deleteAppSuccess = (state, action) => {
    return updateObject(state, {
        apps: action.apps,
        loading:false
    });
};

const deleteAppForbidden = (state) => {
    return updateObject(state, {
        forbiddenModal: !state.forbiddenModal
    });
};

const resetStateOnLogout = (state) => {
    return updateObject(state, {
        apps: [],
        appDetails: null
    });
};

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
}

export default reducer;