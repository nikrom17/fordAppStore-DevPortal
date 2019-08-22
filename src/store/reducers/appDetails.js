 import * as actionTypes from '../actions/actionTypes';
 import { updateObject } from '../../shared/utility';

 const initialState = {
    appSourceFile: {
        value: '',
        fileObject: null,
        sourceFileName: ''
    },
    appBannerFile: {
        value: '',
        fileObject: null,
        downloadUrl: '',
    },
    appIconFile: {
        value: '',
        fileObject: null,
        downloadUrl: '',
    },
    appDetails: {},
    loading: false
};


 const inputChangedHandlerAD = (state, action) => {
     const updatedAppDetails = updateObject(state.appDetails, {
         [action.inputIdentifier]: action.value
     });
     return updateObject(state, {
         appDetails: updatedAppDetails
     })
 };

 const fileInputChangedHandlerAD = (state, action) => {
    return updateObject(state, {
        [action.inputIdentifier]: { 
            ...state[action.inputIdentifier],
            value: action.value,
            fileObject: action.fileObject,
        }
    });
};

 const setDownloadUrls = (state, action) => {
    const updateState = updateObject(state[action.inputIdentifier], {
        downloadUrl : action.url
    });
     return updateObject(state, {
         [action.inputIdentifier]: updateState,
     });
 };

const loadAppDetails = (state, action) => {
    const updateSoruceState = updateObject(state.appSourceFile, {
        sourceFileName: action.appDetails.sourceFileName
    });
    return updateObject(state, {
        appDetails: action.appDetails,
        appSourceFile: updateSoruceState,
    });
};

const updateLoadingState = (state) => {
};

const resetAppDetails = (state) => {
    return updateObject(state, initialState);
}

const updateFileStart = (state) => {
    return updateObject(state, {
        loading: true
    });
}

const resetFileInputs = (state) => {
    const updateBanner = {
        ...state.appBannerFile,
        value: ''
    }
    const updateIcon = {
        ...state.appIconFile,
        value: ''
    }
    const updateSource = {
        ...state.appSourceFile,
        value: ''
    }
    return updateObject(state, {
        appBannerFile: updateBanner,
        appIconFile: updateIcon,
        appSourceFile: updateSource,
        loading: false
    });
}


 const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INPUT_CHANGED_HANDLER_AD:
            return inputChangedHandlerAD(state, action);
        case actionTypes.FILE_INPUT_CHANGED_HANDLER_AD:
            return fileInputChangedHandlerAD(state, action);
        case actionTypes.SET_DOWNLOAD_URLS:
            return setDownloadUrls(state, action);
        case actionTypes.LOAD_APP_DETAILS:
            return loadAppDetails(state, action);
        case actionTypes.RESET_APP_DETAILS:
            return resetAppDetails(state, action);
        case actionTypes.UPDATE_LOADING_STATE:
            return updateLoadingState(state);
        case actionTypes.UPDATE_FILE_START:
            return updateFileStart(state);
        case actionTypes.RESET_FILE_INPUTS:
            return resetFileInputs(state);
        default:
            return state;
    }
 };

 export default reducer;