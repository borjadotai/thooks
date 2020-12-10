import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, useField } from 'formik';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  InputGroup,
  InputRightElement
} from '@chakra-ui/core';

import initFirebase from '../../utils/auth/initFirebase';
import CreateUserDoc from '../../utils/firestore/CreateUserDoc';

// Get user context
import { useUser } from '../../utils/auth/useUser';

// Forms validation
import validate from './validation';

// Get forms
import EmailField from './EmailField';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

// Init the Firebase app.
initFirebase();

const AuthRoot = () => {
  const router = useRouter();
  let { user, userActions } = useUser();
  const [authType, setAuthType] = useState();

  console.log('user', user);
  if (user) router.push(`/${user.profile.username}`);

  const handleSubmission = async (values) => {
    console.log('Submitting: ', values);
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password);
    console.log('Created user: ', user);
    user && (await CreateUserDoc(user.uid, values));
    console.log('Added user to db:');
  };

  return (
    <Formik
      initialValues={{ email: '' }}
      validate={validate}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          handleSubmission(values);
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {({ values, errors }) => (
        <Form>
          {console.log('values', values)}
          {console.log('errors', errors)}
          {!authType && <EmailField setAuthType={setAuthType} />}
          {authType === 'signup' && <SignUpForm />}
          {authType === 'signin' && <SignInForm />}
        </Form>
      )}
    </Formik>
  );
};

export default AuthRoot;

// Auth flow
// 1. Ask for email
// 2. Check if email exists in userDB
// 3. If it does - show Sign In
//    3.1 Ask for password or show forgot password
// 4. If it doesn't - show Sign Up
//    4.1 Full name
//    4.2 Username (check userName availability)
//    4.3 Password
//    4.4 Upload profile pic (optional)
//    4.4 Write up a bio (optional)
// 5. Redirect to profile - thooks.me/username
