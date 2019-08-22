import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/database';

import config from './config';

// Initialize Firebase
firebase.initializeApp(config);

export const storage = firebase.storage();
export const authRef = firebase.auth();
export const storageRef = storage.ref();
export const databaseRef = firebase.database().ref();

export {
  firebase as default,
};
