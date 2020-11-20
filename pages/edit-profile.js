import React, { useState, useEffect } from 'react';
import {
  Heading,
  Box,
  Input,
  Text,
  Textarea,
  Button,
  Flex
} from '@chakra-ui/core';

import { useUser } from '../utils/auth/useUser';
import Container from '../components/Container';

const EditProfile = () => {
  const { user } = useUser();

  const [form, setForm] = useState({
    name: null,
    email: user && user.email ? user.email : null,
    username: null,
    pic: null,
    bio: null
  });

  useEffect(() => {
    setForm({ ...form, email: user && user.email });
  }, [user]);

  const handleChange = (p, e) => setForm({ ...form, [p]: e.target.value });

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
          Edit your profile
        </Heading>
        {console.log('form', form)}
        <Text mb={1}>Name</Text>
        <Input
          mb={5}
          placeholder="i.e: John Smith"
          onChange={(e) => handleChange('name', e)}
        />
        <Text mb={1}>Email</Text>
        <Input
          mb={5}
          value={form.email}
          placeholder="i.e: johnsmith@thooks.me"
          onChange={(e) => handleChange('email', e)}
        />
        <Text mb={1}>Username</Text>
        <Input
          mb={5}
          placeholder="i.e: johnsmith"
          onChange={(e) => handleChange('username', e)}
        />
        <Text mb={1}>Profile picture url</Text>
        <Input
          mb={5}
          placeholder="i.e: https://images.com/asd3qf3q"
          onChange={(e) => handleChange('pic', e)}
        />
        <Text mb={1}>Bio</Text>
        <Textarea
          placeholder="Entrepreneur. Rocket scientist. Padel player. Cat lover."
          onChange={(e) => handleChange('bio', e)}
        />
        <Flex mt={5} justifyContent="flex-end">
          <Button width="100%" variant="outline">
            Apply changes
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};

export default EditProfile;
