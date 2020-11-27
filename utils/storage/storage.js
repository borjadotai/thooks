import firebase from 'firebase/app';
import 'firebase/storage';
import initFirebase from '../auth/initFirebase';

initFirebase();

const storage = firebase.storage();

export default storage;
