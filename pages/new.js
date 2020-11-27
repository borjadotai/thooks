import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import {
  Heading,
  Box,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/core';

import { useUser } from '../utils/auth/useUser';
import { updateUserInfo } from '../utils/firestore/UpdateUserInfo';
import Container from '../components/Container';

const NewThook = () => {
  const router = useRouter();
  let { user } = useUser();

  const handleSubmission = (values) => {
    updateUserInfo(user.id, values);
    router.push('/');
  };

  return (
    <Container>
      <Box
        width={[350, 600, 836]}
        maxW={836}
        bg="gray.800"
        p={[5, 10]}
        borderRadius="lg"
      >
        <Heading mb={5} size="lg">
          Create a new thook
        </Heading>
        <Formik
          initialValues={{ content: null }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = 'Please enter a title for this book';
            }
            return errors;
          }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              handleSubmission(values);
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    id="title"
                    mb={5}
                    isRequired
                    isInvalid={form.errors.title && form.touched.title}
                  >
                    <FormLabel htmlFor="title">Book title</FormLabel>
                    <Input
                      {...field}
                      id="title"
                      placeholder="The Alchemist"
                      errorBorderColor="red.500"
                    />
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Box></Box>
              <SimpleGrid mt={5} columns={2} spacing={10}>
                <Button
                  width="100%"
                  variant="outline"
                  isDisabled={!values}
                  onClick={() => router.push('/')}
                >
                  Cancel
                </Button>
                <Button
                  width="100%"
                  variant="solid"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Apply changes
                </Button>
              </SimpleGrid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default NewThook;
