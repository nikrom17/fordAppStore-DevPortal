import * as actionTypes from './actionTypes';
import { setAccountSettings, fetchAccountSettings } from './accountSettings';
import * as axiosInstance from '../../axios-instances';
import { authRef } from '../../Firebase';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationDate) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationDate * 1000)
    };
};

export const auth = (userInfo, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: userInfo.email,
            password: password,
            returnSecureToken: true
        }
        let url = isSignup ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDughZWs2UYSt-CEZUXtY9HUVch2NZxOU8' : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDughZWs2UYSt-CEZUXtY9HUVch2NZxOU8'
        axiosInstance.instanceData.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(checkAuthTimeout(response.data.expiresIn));
                if (isSignup) {
                    dispatch(setAccountSettings(userInfo, response)) 
                } else {
                    dispatch(authSuccess(response.data.idToken, response.data.localId));
                    dispatch(fetchAccountSettings(response.data.idToken, response.data.localId));
                }
                authRef.signInWithEmailAndPassword(userInfo.email, password);
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId'); 
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000));
                dispatch(fetchAccountSettings(token, userId));
            } else {
                dispatch(logout());
            }
        }
    };
};