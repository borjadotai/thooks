import React, { useContext } from 'react';
import { Box } from '@chakra-ui/core';

import { useUser } from '../utils/auth/useUser';

import Container from '../components/Container';
import Profile from '../components/Profile';
import Landing from '../components/Landing';

const Index = () => {
  const { user } = useUser();

  return (
    <Container>
      <Box maxW={836}>{user ? <Profile /> : <Landing />}</Box>
    </Container>
  );
};

export default Index;
