import firebase from 'firebase/app';
import initFirebase from '../auth/initFirebase';

initFirebase();

const db = firebase.firestore();

const createNewThook = async (data) => {
  let thookData = await new Promise(() => {
    db.collection('thooks').doc(data.id).set(data);
  });
  return thookData;
};

export default createNewThook;
