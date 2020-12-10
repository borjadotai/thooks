import React from 'react';
import NextLink from 'next/link';
import { Box, useColorMode, Flex, IconButton, Heading } from '@chakra-ui/core';
import styled from '@emotion/styled';

import Footer from '../components/Footer';
import FirebaseAuth from '../components/FirebaseAuth';
import AuthRoot from '../components/auth/AuthRoot';

import styles from '../styles/styles.module.css';

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

const Auth = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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
        <Heading>thooks</Heading>
        <Flex flexDirection="row">
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
        justifyContent="start"
        flexDirection="column"
        flexGrow={1}
        bg={bgColor[colorMode]}
        color={primarytextColor[colorMode]}
        px={8}
        py={16}
      >
        <AuthRoot />
      </Flex>
      <Footer />
    </>
  );
};

export default Auth;
