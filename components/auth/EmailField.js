import React from 'react';
import { useField } from 'formik';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from '@chakra-ui/core';
import hasEmailBeenUsed from '../../utils/users/hasEmailBeenUsed';

const selectAuthType = async (setAuthType, email) => {
  const existingUser = await hasEmailBeenUsed(email);
  if (existingUser) {
    setAuthType('signin');
    return 'signin';
  } else {
    setAuthType('signup');
    return 'signup';
  }
};

const EmailField = ({ setAuthType }) => {
  const [field, meta] = useField('email');
  return (
    <React.Fragment>
      <FormControl
        id="email"
        mb={5}
        isRequired
        isInvalid={meta.touched && meta.error}
      >
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input {...field} id="email" errorBorderColor="red.500" />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
      <Button
        isDisabled={field.value === '' || (meta.touched && meta.error)}
        onClick={() => selectAuthType(setAuthType, field.value)}
      >
        Next
      </Button>
    </React.Fragment>
  );
};

export default EmailField;
