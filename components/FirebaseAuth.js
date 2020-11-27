import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../utils/auth/initFirebase';
import createUserDoc from '../utils/firestore/CreateUserDoc';
import { setUserCookie } from '../utils/auth/userCookies';
import { mapUserData } from '../utils/auth/mapUserData';

// Init the Firebase app.
initFirebase();

const firebaseAuthConfig = (redirect) => {
  return {
    signInFlow: 'popup',
    // Auth providers
    // https://github.com/firebase/firebaseui-web#configure-oauth-providers
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      }
    ],
    credentialHelper: 'none',
    callbacks: {
      signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
        const userData = await mapUserData(user);
        const newData = { ...userData.profile, id: userData.id };
        console.log('printing signed in user: ', newData);
        if (!userData.name) {
          await createUserDoc(userData.id, newData);
          redirect();
        }
        setUserCookie(userData);
        return false;
      }
    }
  };
};

const FirebaseAuth = () => {
  const router = useRouter();
  const redirect = () => {
    console.log('redirecting');
    router.push('/edit-profile');
  };

  return (
    <StyledFirebaseAuth
      uiConfig={firebaseAuthConfig(redirect)}
      firebaseAuth={firebase.auth()}
    />
  );
};

export default FirebaseAuth;
