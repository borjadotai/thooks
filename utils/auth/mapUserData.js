import firebase from 'firebase/app';
import initFirebase from '../../utils/auth/initFirebase';

initFirebase();

const db = firebase.firestore();

const fetchUserData = async (id) => {
  let userData =
    id &&
    (await new Promise((resolve, reject) => {
      db.collection('users')
        .where('id', '==', id)
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
    }));
  return userData;
};

export const mapUserData = async (user) => {
  const { uid, email } = user;
  const token = await user.getIdToken(true);
  const userProfile = await fetchUserData(uid);
  return {
    id: uid,
    token,
    profile: { ...userProfile[0], email }
  };
};
