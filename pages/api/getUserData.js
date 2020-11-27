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

const getUserData = async (req, res) => {
  const id = req.headers.token;

  try {
    const userData = await fetchUserData(id);
    return res.status(200).json({
      userData: userData
    });
  } catch (error) {
    return res.status(401).send('You are unauthorised');
  }
};

export default getUserData;
