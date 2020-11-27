import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import { useDropzone } from 'react-dropzone';
import {
  Heading,
  Box,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Text
} from '@chakra-ui/core';
import { AiOutlineUpload } from 'react-icons/ai';

import { useUser } from '../utils/auth/useUser';
import storage from '../utils/storage/storage';
import isUsernameAvailable from '../utils/users/isUsernameAvailable';
import { updateUserInfo } from '../utils/firestore/UpdateUserInfo';
import Container from '../components/Container';

const UploadComponent = (props) => {
  const { setFieldValue } = props;
  const [picName, setPicName] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      let fileToUpload = acceptedFiles[0];
      setPicName(fileToUpload.name);
      storage.ref(`/profile/${props.user}`).put(fileToUpload);
      storage
        .ref(`/profile/${props.user}`)
        .getDownloadURL()
        .then((url) => setFieldValue('pic', url));
    }
  });

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderStyle="dashed"
      borderColor="white"
      minH={20}
      {...getRootProps({ className: 'dropzone' })}
    >
      <input {...getInputProps()} />
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        py={3}
      >
        <AiOutlineUpload style={{ height: '2rem', width: '2rem' }} />
        <Text>
          {picName ? picName : 'Drop your picture here or click to upload'}
        </Text>
      </Flex>
    </Box>
  );
};

const EditProfile = () => {
  const router = useRouter();
  let { user, userActions } = useUser();

  const handleSubmission = (values) => {
    userActions.updateUserInfo(values);
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
        mb={10}
      >
        <Heading mb={5} size="lg">
          Edit your profile
        </Heading>
        <Formik
          initialValues={{ ...(user && user.profile) }}
          validate={async (values) => {
            let usernameAvailable = await isUsernameAvailable(values.username);
            const errors = {};
            if (!values.name) {
              errors.name = 'Please enter your name';
            }
            if (!values.email) {
              errors.email = 'Please enter your email';
            }
            if (!values.username) {
              errors.username = 'Please choose a username';
            } else {
              if (
                !usernameAvailable &&
                values.username !== user.profile.username
              ) {
                errors.username =
                  'Sadly someone already has that username, please pick another one';
              }
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
              {console.log(values)}
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    id="name"
                    mb={5}
                    isRequired
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel htmlFor="name">Name</FormLabel>
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
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    id="email"
                    mb={5}
                    isRequired
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" isDisabled />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
              <Field name="pic">
                {({ form }) => (
                  <FormControl
                    id="pic"
                    mb={5}
                    isInvalid={form.errors.pic && form.touched.pic}
                  >
                    <FormLabel htmlFor="pic">Profile picture</FormLabel>
                    <UploadComponent
                      user={user && user.id}
                      setFieldValue={setFieldValue}
                    />
                    <FormErrorMessage>{form.errors.pic}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="bio">
                {({ field, form }) => (
                  <FormControl
                    id="bio"
                    mb={5}
                    isInvalid={form.errors.bio && form.touched.bio}
                  >
                    <FormLabel htmlFor="bio">Bio</FormLabel>
                    <Textarea
                      {...field}
                      id="bio"
                      placeholder="Entrepreneur. Rocket scientist. Padel player. Cat lover."
                      errorBorderColor="red.500"
                    />
                    <FormErrorMessage>{form.errors.bio}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <SimpleGrid mt={5} columns={2} spacing={10}>
                <Button
                  width="100%"
                  variant="outline"
                  isDisabled={!values.name || !values.username}
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

export default EditProfile;
