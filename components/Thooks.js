import React, { useState } from 'react';
import { useUser } from '../utils/auth/useUser';
import getUserThooks from '../utils/firestore/getUserThooks';
import { Image, SimpleGrid, Text } from '@chakra-ui/core';

const ThooksSection = () => {
  let { user } = useUser();
  const [userThooks, setUserThooks] = useState();
  getUserThooks(user.id).then((thooks) => setUserThooks(thooks));

  return userThooks ? (
    <SimpleGrid mt={5} minChildWidth="180px" spacing={5}>
      {userThooks.map((thook) => {
        return (
          <Image
            src="https://images-na.ssl-images-amazon.com/images/I/41nzI1lhIVL._SX327_BO1,204,203,200_.jpg"
            w={180}
            h={270}
            borderRadius="lg"
            alt={thook.title}
            key={thook.id}
          />
        );
      })}
    </SimpleGrid>
  ) : (
    <Text>You have no thooks yet</Text>
  );
};

export default ThooksSection;
