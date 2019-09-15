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
    const { id } = await Firebase.newAppFirestore(appData);
    const [sourcePath, bannerPath, iconPath] = await Firebase.newAppStorage(files, id);
    Firebase.addFilePaths(id, sourcePath, bannerPath, iconPath);
    dispatch(uploadNewAppSuccess());
  } catch (error) {
    console.log(error);
    dispatch(createAppFailed(error));
  }
};
