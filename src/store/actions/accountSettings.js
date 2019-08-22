import * as axiosInstance from '../../axios-instances';
import * as actionTypes from './actionTypes';
import { authSuccess, authFailed } from './auth';

export const inputChangedHandlerSettings = (event, inputIdentifier) => {
    return {
        type: actionTypes.INPUT_CHANGED_HANDLER_SETTINGS,
        inputIdentifier: inputIdentifier,
        value: event.target.value
    };
};

export const setAccountSettings = (userInfo, response) => {
    userInfo = {
        ...userInfo,
        userId: response.data.localId
    }
    return dispatch => {
        axiosInstance.instanceData.post('/users.json?auth=' + response.data.idToken, userInfo)
        .then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(error => {
            dispatch(authFailed(error));
        });
    };
};

export const fetchAccountSettingsSuccess = (userInfo) => {
    return {
        type: actionTypes.FETCH_ACCOUNT_SETTINGS_SUCCESS,
        userInfo: userInfo
    };
};

export const fetchAccountSettings = (token, userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axiosInstance.instanceData.get('/users.json' + queryParams)
            .then(response => {
                let accountSettings = {}
                for (let key in response.data) {
                    accountSettings = {
                        ...response.data[key],
                        id: key
                    }
                }
                dispatch(fetchAccountSettingsSuccess(accountSettings));
            })
            .catch(error => {
                //dispatch(fetchACcountSettingsFailed(error));
            });
    };
};