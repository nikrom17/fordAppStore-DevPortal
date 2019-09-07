import * as actionTypes from './actionTypes';
import * as axiosInstances from 'api/axios-instances';
import { storageRef } from 'firebase';


export const resetAppState = () => ({
        type: actionTypes.RESET_APP_STATE
    });

export const fetchAppsStart = () => ({
        type: actionTypes.FETCH_APP_START
    });

export const fetchAppsSuccess = (fetchedApps) => ({
        type: actionTypes.FETCH_APP_SUCCESS,
        apps: fetchedApps
    });

export const fetchAppsFailed = (error) => ({
        type: actionTypes.FETCH_APP_FAILED,
        error: error
    });

export const fetchApps = (token, userId) => dispatch => {
        dispatch(fetchAppsStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axiosInstances.instanceData.get('/apps.json' + queryParams)
            .then(response => {
                const fetchedApps = []
                for (let key in response.data) {
                    fetchedApps.push( {
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchAppsSuccess(fetchedApps))
            })
            .catch(error => {
                dispatch(fetchAppsFailed(error));
            });
    };

export const deleteAppStart = () => ({
        type: actionTypes.DELETE_APP_START
    });

export const deleteAppForbidden = () => ({
        type: actionTypes.DELETE_APP_FORBIDDEN
    });

export const deleteAppSuccess = (fetchedApps) => ({
        type: actionTypes.DELETE_APP_SUCCESS,
        apps: fetchedApps
    });

export const deleteAppFailed = (error) => ({
        type: actionTypes.DELETE_APP_FAILED,
        error: error
    });

export const deleteApp = (token, userId, appId, apps) => dispatch => {
        if (userId !== 'iXahxNphVAdchMePQVnuGDr9jjq1') {
            dispatch(deleteAppStart());
            axiosInstances.instanceData.delete('/apps/' + appId + '.json?auth=' + token)
                .then(response => {
                    dispatch(fetchApps(token, userId));
                })
                .catch(error => {
                    dispatch(deleteAppFailed(error));
                });
            const loopObjectImages = {
                bannerFileName: 'banner',
                iconFileName: 'icon'
            };
            const loopObjectAppFile = {
            sourceFileName: 'source'
            };
            for (let imageCategory in loopObjectImages) {
                storageRef.child(`${userId}/${appId}/images/${loopObjectImages[imageCategory]}/${apps[imageCategory]}`).delete()
            }
            for (let file in loopObjectAppFile) {
                storageRef.child(`${userId}/${appId}/${loopObjectAppFile[file]}/${apps[file]}`).delete()
            }
        }
        else {
            dispatch(deleteAppForbidden());
        }
    };
