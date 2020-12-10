import firebase from 'firebase/app';
import initFirebase from '../../utils/auth/initFirebase';

initFirebase();

const db = firebase.firestore();

const fetchUserData = async (id) => {
  console.log('called');
  let userData = id && (await db.collection('users').doc(id).get());

  return userData;
};

export const mapUserData = async (user) => {
  const { uid, email } = user;
  const token = await user.getIdToken(true);
  const userProfile = await fetchUserData(uid);
  console.log('retrieved', userProfile);
  return {
    id: uid,
    token,
    profile: { ...userProfile[0], email }
  };
};
