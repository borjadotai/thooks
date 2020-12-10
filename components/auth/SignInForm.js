import React, { useState } from 'react';
import { Field } from 'formik';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  InputGroup,
  InputRightElement
} from '@chakra-ui/core';

const SignInForm = () => {
  const [show, setShow] = useState(false);
  const handlePwClick = () => setShow(!show);

  return (
    <React.Fragment>
      <Text>Welcome back!</Text>
      <Field name="password">
        {({ field, form }) => (
          <FormControl id="password" mb={5} isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup size="md">
              <Input
                {...field}
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handlePwClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        )}
      </Field>
    </React.Fragment>
  );
};

export default SignInForm;
