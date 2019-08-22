import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    developerName: "",
    email: "",
    website: "",
    phone: "",
    password: '',
    confirmPassword: '',
};

const inputChangedHandlerSettings = (state, action) => {
     return updateObject(state, {
         [action.inputIdentifier]: action.value
     });
 };

 const fetchAccountSettingsSuccess = (state, action) => {
     return updateObject(state, {
         developerName: action.userInfo.devName,
         email: action.userInfo.email,
         website: action.userInfo.website,
         phone: action.userInfo.phone
     });
 };


const reducer = (state=initialState, action )=> {
    switch(action.type) {
        case actionTypes.INPUT_CHANGED_HANDLER_SETTINGS:
            return inputChangedHandlerSettings(state, action);
        case actionTypes.FETCH_ACCOUNT_SETTINGS_SUCCESS:
            return fetchAccountSettingsSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;