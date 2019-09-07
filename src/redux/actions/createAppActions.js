import * as axios from 'api/axios-instances';
import { storageRef } from 'firebase/app';
import * as actionTypes from './actionTypes';

export const setFileObject = (fileObject) => ({
  type: actionTypes.SET_FILE_OBJECT,
  value: fileObject,
});

export const createAppStart = () => ({
  type: actionTypes.CREATE_APP_START,
});

export const resetNewApp = () => ({
  type: actionTypes.RESET_NEW_APP,
});

export const createAppSuccess = () => ({
  type: actionTypes.CREATE_APP_SUCCESS,
  loading: false,
});

export const createAppFailed = (error) => ({
  type: actionTypes.CREATE_APP_FAILED,
  error,
  loading: false,
});

export const uploadFiles = (appData, files, auth, history, appId) => async (dispatch) => {
  const { images } = files;
  const { source } = files;
  try {
    const image = Object.keys(images); // todo this var name should be imageKeys
    // todo the line below needs to loop through the images object
    await storageRef.child(`${auth.userId}/${appId}/images/${image}/${images[image].name}`).put(images[image]);
    await storageRef.child(`${auth.userId}/${appId}/source/${source.name}`).put(source);
    dispatch(createAppSuccess());
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const createApp = (appData, files, auth, history) => (dispatch) => {
  dispatch(createAppStart());
  axios.instanceData.post(`/apps.json?auth=${auth.token}`, appData)
    .then((response) => {
      dispatch(uploadFiles(appData, files, auth, history, response.data.name));
    })
    .catch((error) => {
      dispatch(createAppFailed(error));
    });
};
