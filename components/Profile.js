import React from 'react';
import {
  useColorMode,
  Box,
  Image,
  Heading,
  Flex,
  Button
} from '@chakra-ui/core';
import { useUser } from '../utils/auth/useUser';

const Profile = () => {
  const { user, logout } = useUser();
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = {
    light: 'gray.200',
    dark: 'gray.800'
  };

  return (
    <Box
      width={[350, 600, 836]}
      maxW={836}
      bg={bgColor[colorMode]}
      p={10}
      borderRadius="lg"
    >
      <Flex flexDirection="row" justifyContent="space-between">
        <Flex flexDirection="row">
          <Image
            src="https://scontent-mad1-1.cdninstagram.com/v/t51.2885-19/s320x320/43985448_1751793204931399_196765293781975040_n.jpg?_nc_ht=scontent-mad1-1.cdninstagram.com&_nc_ohc=O1yOzzwqkqcAX83YKBM&tp=1&oh=323d928843eba92cc035ddec96d7be82&oe=5FE2BED5"
            w={120}
            borderRadius="full"
          />
          <Flex flexDirection="column" ml={5}>
            <Heading size="lg">Borja Leiva</Heading>
            <Heading color="gray.500" size="sm" mt={2}>
              @borjadotai
            </Heading>
          </Flex>
        </Flex>
        <Button variant="outline">Edit</Button>
      </Flex>
    </Box>
  );
};

export default Profile;
