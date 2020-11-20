import React from 'react';
import { useColorMode, Box, Text, Flex } from '@chakra-ui/core';

const Footer = () => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400'
  };

  const bgColor = {
    light: 'gray.100',
    dark: 'gray.800'
  };

  return (
    <Box
      d="flex"
      justifyContent="center"
      py={4}
      direction="column"
      bg={bgColor[colorMode]}
    >
      <Text align="center" color={secondaryTextColor[colorMode]}>
        Made with 💖 by <b>borja</b> in Canary Islands 🏝
      </Text>
    </Box>
  );
};

export default Footer;
