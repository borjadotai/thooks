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
        console.log(error);
        reject([]);
      });
  });

  console.log('api', matchUsers.length);
  return matchUsers.length > 0;
};

const usernameCheck = async (req, res) => {
  const username = req.headers.token;

  try {
    const matchUsers = await doesUsernameExist(username);
    return res.status(200).json(matchUsers);
  } catch (error) {
    return res.status(401).send('You are unauthorised');
  }
};

export default usernameCheck;
