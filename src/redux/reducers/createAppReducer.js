 import * as actionTypes from 'redux/actions/actionTypes';
 import { updateObject } from 'utils/utility';

 const initialState = {
    loading: false,
    newApp: false,
    appSourceFile: {
        value: '',
        fileObject: null
    },
    appBannerFile: {
        value: '',
        fileObject: null
    },
    appIconFile: {
        value: '',
        fileObject: null
    },
    title: '',
    description: '',
    category: 'Auto & Vehicles',
    fileObjects: []
 };

 const inputChangedHandler = (state, action) => {
     return updateObject(state, {
        [action.inputIdentifier]: action.value
     });
 };

 const fileInputChangedHandler = (state, action) => {
     return updateObject(state, {
         [action.inputIdentifier]: {
             value: action.value,
             fileObject: action.fileObject
         }
     });
 };

 const createAppStart = (state) => {
     return updateObject(state, {
        loading: true,
     });
 };
 
 const resetNewApp = (state) => {
     return updateObject(state, {
        newApp: false,
     });
 };

 const createAppSuccess = (state) => {
     return updateObject(state, {
         ...initialState,
        newApp: true
    });
 };

 const createAppFailed = (state) => {
     return updateObject(state, {
        loading: false
     });
 };

 const setFileObject = (state, action) => {
     const oldFileObjectArray = state.fileObjects;
     oldFileObjectArray.push(action.value);
     return updateObject(state, {
         fileObjects: oldFileObjectArray
     })
 }
 const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INPUT_CHANGED_HANDLER:
            return inputChangedHandler(state, action);
        case actionTypes.FILE_INPUT_CHANGED_HANDLER:
            return fileInputChangedHandler(state, action);
        case actionTypes.CREATE_APP_START:
            return createAppStart(state);
        case actionTypes.CREATE_APP_SUCCESS:
            return createAppSuccess(state);
        case actionTypes.CREATE_APP_FAILED:
            return createAppFailed(state);
        case actionTypes.SET_FILE_OBJECT:
            return setFileObject(state, action);
        case actionTypes.RESET_NEW_APP:
            return resetNewApp(state);
        default:
            return state;
    }
 };

 export default reducer;