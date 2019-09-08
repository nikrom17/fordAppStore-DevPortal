import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

import config from './config';

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.database();
    this.storage = firebase.storage();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(email, password, devName, phone, website) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    const userId = this.auth.currentUser.uid;
    return this.db.ref(`users/${userId}`).set({
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
