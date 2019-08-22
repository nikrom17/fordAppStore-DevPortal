import * as actionTypes from './actionTypes';
import * as axios from '../../axios-instances';
import { storageRef } from '../../Firebase';

export const inputChangedHandler = (event, inputIdentifier) => {
    return {
        loading: false,
        type: actionTypes.INPUT_CHANGED_HANDLER,
        inputIdentifier: inputIdentifier,
        value: event.target.value
    };
};

export const fileInputChangedHandler = (event, inputIdentifier) => {
    return {
        type: actionTypes.FILE_INPUT_CHANGED_HANDLER,
        inputIdentifier: inputIdentifier,
        value: event.target.value,
        fileObject: event.target.files[0]
    };
};

export const setFileObject = (fileObject) => {
    return {
        type: actionTypes.SET_FILE_OBJECT,
        value: fileObject
    };
};

export const createAppStart = () => {
    return {
        type: actionTypes.CREATE_APP_START,
    };
};

export const resetNewApp = () => {
    return {
        type: actionTypes.RESET_NEW_APP,
    };
};

export const createAppSuccess = () => {
    return {
        type: actionTypes.CREATE_APP_SUCCESS,
        loading: false
    };
};

export const createAppFailed = (error) => {
    return {
        type: actionTypes.CREATE_APP_FAILED,
        error: error,
        loading: false
    };
};

export const createApp = (appData, files, auth, history) => {
    return dispatch => {
        dispatch(createAppStart());
        axios.instanceData.post('/apps.json?auth=' + auth.token, appData)
        .then(response => {
            dispatch(uploadFiles(appData, files, auth, history, response.data.name));
        })
        .catch(error => {
            dispatch(createAppFailed(error));
        });
    };
};


export const uploadFiles = (appData, files, auth, history, appId) => {
    const images = files.images;
    const source = files.source;
    return dispatch => {
        for (let image in images) {
            storageRef.child(`${auth.userId}/${appId}/images/${image}/${images[image].name}`).put(images[image])
                .catch(error => {
                    console.log(error);
                });
            }
            storageRef.child(`${auth.userId}/${appId}/source/${source.name}`).put(source)
                .then(response => {
                    dispatch(createAppSuccess());
                    history.push("/");
                })
                .catch(error => {
                    console.log(error);
                });
        
    };
};