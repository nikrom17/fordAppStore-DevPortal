import * as axiosInstances from 'api/axios-instances';
import { storageRef } from 'firebase/app';
import * as actionTypes from './actionTypes';

// ----- SIMPLE ACTIONS ----- //
export const deleteAppStart = () => ({
  type: actionTypes.DELETE_APP_START,
});

export const deleteAppForbidden = () => ({
  type: actionTypes.DELETE_APP_FORBIDDEN,
});

export const deleteAppSuccess = (fetchedApps) => ({
  type: actionTypes.DELETE_APP_SUCCESS,
  apps: fetchedApps,
});

export const deleteAppFailed = (error) => ({
  type: actionTypes.DELETE_APP_FAILED,
  error,
});

export const fetchAppsStart = () => ({
  type: actionTypes.FETCH_APP_START,
});

export const fetchAppsSuccess = (fetchedApps) => ({
  type: actionTypes.FETCH_APP_SUCCESS,
  apps: fetchedApps,
});

export const fetchAppsFailed = (error) => ({
  type: actionTypes.FETCH_APP_FAILED,
  error,
});

export const resetAppState = () => ({
  type: actionTypes.RESET_APP_STATE,
});


// ----- COMPLEX ACTIONS ----- //
export const fetchApps = (token, userId) => async (dispatch) => {
  dispatch(fetchAppsStart());
  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  try {
    const { data } = await axiosInstances.instanceData.get(`/apps.json${queryParams}`);
    const fetchedApps = Object.values(data);
    dispatch(fetchAppsSuccess(fetchedApps));
  } catch (error) {
    dispatch(fetchAppsFailed(error));
  }
};

export const deleteApp = (token, userId, appId, apps) => async (dispatch) => {
  if (userId !== 'iXahxNphVAdchMePQVnuGDr9jjq1') {
    dispatch(deleteAppStart());
    try {
      await axiosInstances.instanceData.delete(`/apps/${appId}.json?auth=${token}`);
      const imageTypes = ['banner', 'icon'];
      imageTypes.map((imageType) => (
        storageRef.child(`${userId}/${appId}/images/${imageType}/${apps[imageType]}`).delete()
      ));
      storageRef.child(`${userId}/${appId}/source/${apps.source}`).delete();
      dispatch(deleteAppSuccess(appId));
    } catch (error) {
      dispatch(deleteAppFailed(error));
    }
  } else {
    dispatch(deleteAppForbidden());
  }
};
