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
