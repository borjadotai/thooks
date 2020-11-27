import firebase from 'firebase/app';
import initFirebase from '../auth/initFirebase';

initFirebase();

const db = firebase.firestore();

const createUserDoc = async (id, data) => {
  let userData = await new Promise(() => {
    db.collection('users').doc(id).set(data);
  });
  return userData;
};

export default createUserDoc;
