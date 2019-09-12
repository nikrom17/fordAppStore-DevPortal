import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

import config from './config';

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  accountSettings() {
    const { uid } = this.auth.currentUser;
    return this.db.collection('users').where('userId', '==', uid);
  }

  appList() {
    const { uid } = this.auth.currentUser;
    return this.db.collection('apps').where('uid', '==', uid);
  }

  newAppFirestore(appData) {
    return this.db.collection('apps').add(appData);
  }

  async newAppStorage(files, appId) {
    const { uid } = this.auth.currentUser;
    const { icon, banner, source } = files;
    const storageRefIcon = this.storage.ref(`${uid}/${appId}/images/icon/${icon.name}`);
    const storageRefBanner = this.storage.ref(`${uid}/${appId}/images/banner/${banner.name}`);
    const storageRefSource = this.storage.ref(`${uid}/${appId}/source/${source.name}`);

    await console.log(storageRefIcon.put(icon));
    await console.log(storageRefBanner.put(banner));
    await console.log(storageRefSource.put(source));
  }

  async register(email, password, devName, phone, website) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    const userId = this.auth.currentUser.uid;
    return this.db.collection('users').add({
      email,
      password,
      devName,
      phone,
      website,
      userId,
    });
  }

  // helper function for moving data into firestore from real-time db
  async addUserData(email, password, devName, phone, website) {
    await this.auth.signInWithEmailAndPassword(email, password);
    const userId = this.auth.currentUser.uid;
    return this.db.collection('users').add({
      email,
      password,
      devName,
      phone,
      website,
      userId,
    });
  }
}

export default new Firebase();
