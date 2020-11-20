import React from 'react';
import NextLink from 'next/link';
import {
  useColorMode,
  Heading,
  Stack,
  Button,
  IconButton
} from '@chakra-ui/core';
import { useUser } from '../utils/auth/useUser';

const Menu = () => {
  const { user, logout } = useUser();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack align="center" justify="center" mt="20vh">
      {user && (
        <NextLink href="/new" passHref>
          <Heading letterSpacing="tight" mb={12} as="a" size="xl">
            New vook
          </Heading>
        </NextLink>
      )}
      {user && (
        <Button variant="link" p={[1, 4]} onClick={() => logout()}>
          <Heading letterSpacing="tight" mb={10} size="xl">
            Logout
          </Heading>
        </Button>
      )}
      {!user && (
        <NextLink href="/auth" passHref>
          <Button as="a" variant="outline" p={[1, 4]}>
            Sign In
          </Button>
        </NextLink>
      )}
      <Button variant="link" p={[1, 4]} onClick={toggleColorMode}>
        <Heading letterSpacing="tight" size="xl">
          Toggle theme
        </Heading>
      </Button>
    </Stack>
  );
};

export default Menu;
