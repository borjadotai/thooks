import React, { useState } from 'react';
import { Field, useFormikContext } from 'formik';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  FormErrorMessage
} from '@chakra-ui/core';

const SignUpForm = () => {
  const { isSubmitting } = useFormikContext();
  const [show, setShow] = useState(false);
  const handlePwClick = () => setShow(!show);

  return (
    <React.Fragment>
      <Text>Seems like you are new!</Text>
      <Field name="name">
        {({ field, form }) => (
          <FormControl
            id="name"
            mb={5}
            isRequired
            isInvalid={form.errors.name && form.touched.name}
          >
            <FormLabel htmlFor="name">Full name</FormLabel>
            <Input
              {...field}
              id="name"
              placeholder="John Smith"
              errorBorderColor="red.500"
            />
            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name="username">
        {({ field, form }) => (
          <FormControl
            id="username"
            mb={5}
            isRequired
            isInvalid={form.errors.username && form.touched.username}
          >
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              {...field}
              id="username"
              placeholder="johnsmith"
              errorBorderColor="red.500"
            />
            <FormErrorMessage>{form.errors.username}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name="password">
        {({ field, form }) => (
          <FormControl
            id="password"
            mb={5}
            isRequired
            isInvalid={form.errors.password && form.touched.password}
          >
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup size="md">
              <Input
                {...field}
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter a password"
                errorBorderColor="red.500"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handlePwClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Button type="submit" isLoading={isSubmitting}>
        Sign Up
      </Button>
    </React.Fragment>
  );
};

export default SignUpForm;
