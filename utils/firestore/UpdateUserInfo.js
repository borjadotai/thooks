import firebase from 'firebase/app';
import initFirebase from '../auth/initFirebase';

initFirebase();

const db = firebase.firestore();

export const updateDocument = async (col, id, newData) => {
  let userData =
    id &&
    (await new Promise(() => {
      db.collection(col).doc(id).set(newData);
    }));
  return userData;
};

export const updateUserInfo = (id, newData) =>
  updateDocument('users', id, newData);
