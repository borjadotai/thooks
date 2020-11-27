import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  useColorMode,
  Box,
  Image,
  Heading,
  Flex,
  Button,
  Spinner,
  Text,
  SimpleGrid
} from '@chakra-ui/core';

import { useUser } from '../utils/auth/useUser';
import storage from '../utils/storage/storage';

const Profile = () => {
  let { user } = useUser();
  let userProfile = user && user.profile;
  const { colorMode } = useColorMode();

  const [profilePic, setProfilePic] = useState();
  storage
    .ref(`/profile/${user.id}`)
    .getDownloadURL()
    .then((url) => setProfilePic(url));

  const bgColor = {
    light: 'gray.200',
    dark: 'gray.800'
  };

  return (
    <>
      <Box
        width={[350, 600, 836]}
        maxW={836}
        bg={bgColor[colorMode]}
        p={10}
        borderRadius="lg"
      >
        {userProfile ? (
          <Flex flexDirection="row" justifyContent="space-between">
            <SimpleGrid columns={[1, 2]}>
              <Image
                src={profilePic}
                w={120}
                h={120}
                borderRadius="full"
                objectFit="cover"
                alt={userProfile.name}
                fallbackSrc="https://referralguidestorage.blob.core.windows.net/webcontent/fallback/avatarFallback.png"
              />
              <Flex flexDirection="column" ml={5}>
                <Heading size="lg">{userProfile.name || 'Anonymous'}</Heading>
                <Heading color="gray.500" size="sm" mt={2}>
                  @{userProfile.username || userProfile.id}
                </Heading>
                <Text mt={3}>{userProfile.bio}</Text>
              </Flex>
            </SimpleGrid>
            <NextLink href="/edit-profile" passHref>
              <Button variant="outline">Edit</Button>
            </NextLink>
          </Flex>
        ) : (
          <Flex justifyContent="center">
            <Spinner size="xl" />
          </Flex>
        )}
      </Box>
      <SimpleGrid mt={5} minChildWidth="180px" spacing={5}>
        <Image
          src="https://images-na.ssl-images-amazon.com/images/I/41nzI1lhIVL._SX327_BO1,204,203,200_.jpg"
          w={180}
          h={270}
          borderRadius="lg"
        />
        <Image
          src="https://images-na.ssl-images-amazon.com/images/I/41YYbVCk+fL._SX352_BO1,204,203,200_.jpg"
          w={180}
          h={270}
          borderRadius="lg"
        />
        <Image
          src="https://images-na.ssl-images-amazon.com/images/I/41YYbVCk+fL._SX352_BO1,204,203,200_.jpg"
          w={180}
          h={270}
          borderRadius="lg"
        />
        <Image
          src="https://images-na.ssl-images-amazon.com/images/I/41YYbVCk+fL._SX352_BO1,204,203,200_.jpg"
          w={180}
          h={270}
          borderRadius="lg"
        />
        <Image
          src="https://images-na.ssl-images-amazon.com/images/I/41YYbVCk+fL._SX352_BO1,204,203,200_.jpg"
          w={180}
          h={270}
          borderRadius="lg"
        />
      </SimpleGrid>
    </>
  );
};

export default Profile;
