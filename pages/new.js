import React from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import {
  Heading,
  Box,
  Input,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/core';
import { uuid } from 'uuidv4';
import { convertToRaw } from 'draft-js';

import { useUser } from '../utils/auth/useUser';
import createNewThook from '../utils/firestore/CreateNewThook';
import Container from '../components/Container';
import TextEditor from '../components/TextEditor';
import UploadComponent from '../components/UploadComponent';

const NewThook = () => {
  const router = useRouter();
  let { user } = useUser();
  const newThookId = uuid();

  const handleSubmission = (values) => {
    let data = {
      id: newThookId,
      owner: user && user.id,
      content: JSON.stringify(convertToRaw(values.content.getCurrentContent())),
      title: values.title
    };
    console.log('handlesubmission', data);
    createNewThook(data);
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
        mb={5}
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
            if (!values.cover) {
              errors.cover = 'Please choose a cover for this thook';
            }
            if (!values.content) {
              errors.content = 'You need to write something in your thook';
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
              {console.log('vals', values)}
              <Field name="title">
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

              <Field name="cover">
                {({ form }) => (
                  <FormControl
                    id="cover"
                    mb={5}
                    isRequired
                    isInvalid={form.errors.cover && form.touched.cover}
                  >
                    <FormLabel htmlFor="cover">Book cover</FormLabel>
                    <UploadComponent
                      setFieldValue={setFieldValue}
                      refPath={`/thooks/${newThookId}`}
                      fieldName="pic"
                    />
                    <FormErrorMessage>{form.errors.cover}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="content">
                {({ form }) => (
                  <FormControl
                    id="content"
                    mb={5}
                    isRequired
                    isInvalid={form.errors.content && form.touched.content}
                  >
                    <FormLabel htmlFor="content">Thook content</FormLabel>
                    <Box
                      p={5}
                      borderWidth="1px"
                      borderRadius="lg"
                      bg="gray.800"
                    >
                      <TextEditor
                        id="content"
                        setValue={(data) => setFieldValue('content', data)}
                      />
                    </Box>
                    <FormErrorMessage>{form.errors.content}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
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
