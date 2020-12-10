import firebase from 'firebase/app';
import initFirebase from '../../utils/auth/initFirebase';

initFirebase();

const db = firebase.firestore();

const doesEmailExist = async (email) => {
  let matchUsers = await new Promise((resolve, reject) => {
    db.collection('users')
      .where('email', '==', email)
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
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject([]);
      });
  });

  return matchUsers.length > 0;
};

const hasEmailBeenUsed = async (email) => {
  const emailExistsInDb = await doesEmailExist(email);
  console.log('result', emailExistsInDb);

  return emailExistsInDb;
};

export default hasEmailBeenUsed;
