import React, { createContext, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../auth/initFirebase';
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie
} from './userCookies';
import { mapUserData } from './mapUserData';

initFirebase();

const UserContext = createContext();

const UserStore = ({ children }) => {
  const [user, setUser] = useState();
  const router = useRouter();

  const userActions = {
    updateUserInfo: (newData) => setUser({ ...user, profile: newData }),
    logout: async () => {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          router.push('/');
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if (user) {
          const userData = await mapUserData(user);
          setUserCookie(userData);
          setUser(userData);
        } else {
          removeUserCookie();
          setUser();
        }
      });

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie) {
      router.push('/');
      return;
    }
    setUser(userFromCookie);

    return () => {
      cancelAuthListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, userActions }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserStore, useUser, UserContext };
