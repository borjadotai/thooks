import firebase from 'firebase/app';
import initFirebase from '../../utils/auth/initFirebase';

initFirebase();

const db = firebase.firestore();

const getUserThooks = async (userId) => {
  let userThooks = await db
    .collection('thooks')
    .where('owner', '==', userId)
    .get()
    .then((snapshot) => {
      let data = [];
      snapshot.forEach((doc) => {
        data.push(
          Object.assign(
            {
              id: doc.id
            },
            doc.data()
          )
        );
      });
      return data;
    });

  return userThooks;
};

export default getUserThooks;
