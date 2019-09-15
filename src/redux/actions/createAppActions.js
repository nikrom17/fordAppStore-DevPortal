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
  console.log(appData, files);
  dispatch(uploadNewAppStart());
  try {
    const [sourceURL, bannerURL, iconURL] = await Firebase.newAppStorage(files);
    const firestoreResponse = await Firebase.newAppFirestore({
      ...appData, sourceURL, bannerURL, iconURL,
    });
    console.log(firestoreResponse);
    dispatch(uploadNewAppSuccess(firestoreResponse));
  } catch (error) {
    console.log(error);
    dispatch(createAppFailed(error));
  }
};
