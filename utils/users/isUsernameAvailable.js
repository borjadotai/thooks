import firebase from 'firebase/app';
import initFirebase from '../../utils/auth/initFirebase';

initFirebase();

const db = firebase.firestore();

const doesUsernameExist = async (username) => {
  let matchUsers = await new Promise((resolve, reject) => {
    db.collection('users')
      .where('username', '==', username)
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
        reject([]);
      });
  });

  return matchUsers.length > 0;
};

const isUsernameAvailable = async (username) => {
  const matchUsers = await doesUsernameExist(username);

  return !matchUsers;
};

export default isUsernameAvailable;
