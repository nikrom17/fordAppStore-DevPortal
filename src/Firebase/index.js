import { auth, initializeApp, storage, ref, database } from 'firebase/app';

import config from './config';

// Initialize Firebase
initializeApp(config);

export const storage = storage();
export const authRef = auth();
export const storageRef = ref();
export const databaseRef = database().ref();