import * as actionTypes from './actionTypes';
import { storageRef, databaseRef } from '../../Firebase';

export const inputChangedHandlerAD = (event, inputIdentifier) => {
    return {
        type: actionTypes.INPUT_CHANGED_HANDLER_AD,
        inputIdentifier: inputIdentifier,
        value: event.target.value
    };
};

export const fileInputChangedHandlerAD = (event, inputIdentifier) => {
    return {
        type: actionTypes.FILE_INPUT_CHANGED_HANDLER_AD,
        inputIdentifier: inputIdentifier,
        value: event.target.value,
        fileObject: event.target.files[0]
    };
};

const setDownloadUrl = (url, inputIdentifier) => {
    return {
        type: actionTypes.SET_DOWNLOAD_URLS,
        url: url,
        inputIdentifier: inputIdentifier
    };
};

export const resetAppDetails = () => {
    return {
        type: actionTypes.RESET_APP_DETAILS
    }
}

export const updateDownloadUrls = (urls) => {
    return dispatch => {
        for (let url in urls) {
            storageRef.child(urls[url]).getDownloadURL()
                .then(downloadUrl => dispatch(setDownloadUrl(downloadUrl, url)))
                .catch(error => console.log(error));
        }
    }
};

export const loadAppDetails = (appDetails) => {
    return {
        type: actionTypes.LOAD_APP_DETAILS,
        appDetails: appDetails
    };
};

export const updateFileStart = () => {
    return {
        type: actionTypes.UPDATE_FILE_START
    }
}

export const resetFileInputs = () => {
    return {
        type: actionTypes.RESET_FILE_INPUTS
    }
}

const updateFileAsync = ( files, auth, appId, path) => {
    return async dispatch => {
        const deletePath = `${auth.userId}/${appId}/${path}/${files.oldFile}`;;
        const uploadPath = `${auth.userId}/${appId}/${path}/${files.newFile.name}`;
        const inputIdentifier = path === 'images/banner' ? 'appBannerFile' : 'appIconFile';
        let fileName;
        if (path === 'images/banner'){
            fileName = 'bannerFileName'
        }
        else if (path === 'images/icon'){
            fileName = 'iconFileName'
        }
        else {
            fileName = 'sourceFileName'
        }
        try {
            storageRef.child(deletePath).delete()
            await storageRef.child(uploadPath).put(files.newFile);
            const downloadUrl = await storageRef.child(uploadPath).getDownloadURL();
            await dispatch(setDownloadUrl(downloadUrl, inputIdentifier));
            await databaseRef.update({[`/apps/${appId}/${fileName}`]: files.newFile.name});
            dispatch(resetFileInputs())
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateFile = (files, auth, appId, path) => {
    return dispatch => {
        dispatch(updateFileStart());
        dispatch(updateFileAsync(files, auth, appId, path));
    };
};