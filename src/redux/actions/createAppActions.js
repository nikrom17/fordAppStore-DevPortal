import Firebase from 'firebase/fireClass';
import * as actionTypes from './actionTypes';


export const setFileObject = (fileObject) => ({
  type: actionTypes.SET_FILE_OBJECT,
  value: fileObject,
});

export const uploadNewAppStart = () => ({
  type: actionTypes.UPLOAD_NEW_APP_START,
});

export const resetNewApp = () => ({
  type: actionTypes.RESET_NEW_APP,
});

export const uploadNewAppSuccess = (firestoreResponse, storageResponse) => ({
  type: actionTypes.UPLOAD_NEW_APP_SUCCESS,
  loading: false,
  firestoreResponse,
  storageResponse,
});

export const createAppFailed = (error) => ({
  type: actionTypes.UPLOAD_NEW_APP_FAILED,
  error,
  loading: false,
});

export const uploadNewApp = (appData, files) => async (dispatch) => {
  dispatch(uploadNewAppStart());
  try {
    const firestoreResponse = await Firebase.newAppFirestore(appData);
    const StorageResponse = await Firebase.newAppStorage(files);
    dispatch(uploadNewAppSuccess(firestoreResponse, StorageResponse));
  } catch (error) {
    dispatch(createAppFailed(error));
  }
};
