import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  useColorMode,
  useDisclosure,
  Flex,
  IconButton,
  Heading,
  Text
} from '@chakra-ui/core';
import styled from '@emotion/styled';
import { FiMenu } from 'react-icons/fi';

import { useUser } from '../utils/auth/useUser';

import Footer from './Footer';
import Menu from './Menu';

import styles from '../styles/styles.module.css';

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

const Container = ({ children }) => {
  const { user, userActions } = useUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = {
    light: 'white',
    dark: 'gray.900'
  };
  const primarytextColor = {
    light: 'black',
    dark: 'white'
  };
  const navBgColor = {
    light: 'rgba(255, 255, 255, 0.8)',
    dark: 'rgba(23, 25, 35, 0.8)'
  };

  return (
    <>
      <StickyNav
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="900px"
        width="100%"
        bg={navBgColor[colorMode]}
        as="nav"
        p={8}
        mt={[0, 8]}
        mb={8}
        mx="auto"
      >
        <NextLink href="/" passHref>
          <Heading>thooks</Heading>
        </NextLink>
        <Flex flexDirection="row">
          <IconButton
            aria-label="Toggle menu"
            icon={isOpen ? 'close' : FiMenu}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            className={styles.desktopHidden}
          />
          <Box className={styles.mobileHidden}>
            {user && (
              <NextLink href="/new" passHref>
                <Button as="a" variant="ghost" p={[1, 4]}>
                  New thook
                </Button>
              </NextLink>
            )}
            {user && (
              <Button
                variant="ghost"
                p={[1, 4]}
                onClick={() => userActions.logout()}
              >
                Logout
              </Button>
            )}
            {!user && (
              <NextLink href="/auth" passHref>
                <Button as="a" variant="outline" p={[1, 4]}>
                  Sign In
                </Button>
              </NextLink>
            )}
          </Box>
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === 'dark' ? 'sun' : 'moon'}
            onClick={toggleColorMode}
            className={styles.mobileHidden}
            ml={3}
          />
        </Flex>
      </StickyNav>
      <Flex
        as="main"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="column"
        flexGrow={1}
        bg={bgColor[colorMode]}
        color={primarytextColor[colorMode]}
        px={8}
      >
        {isOpen ? <Menu /> : children}
      </Flex>
      <Footer />
    </>
  );
};

export default Container;
