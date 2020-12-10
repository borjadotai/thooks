import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Flex, Text } from '@chakra-ui/core';
import { AiOutlineUpload } from 'react-icons/ai';
import storage from '../utils/storage/storage';

const UploadComponent = ({ setFieldValue, refPath, fieldName }) => {
  const [picName, setPicName] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      let fileToUpload = acceptedFiles[0];
      setPicName(fileToUpload.name);
      storage.ref(refPath).put(fileToUpload);
      storage
        .ref(refPath)
        .getDownloadURL()
        .then((url) => setFieldValue(fieldName, url));
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

export default UploadComponent;
