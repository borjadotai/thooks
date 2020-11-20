import React from 'react';
import { Global, css } from '@emotion/core';
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  useColorMode
} from '@chakra-ui/core';
import Head from 'next/head';

import theme from '../styles/theme';
import { prismLightTheme, prismDarkTheme } from '../styles/prism';

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          ${colorMode === 'light' ? prismLightTheme : prismDarkTheme};

          ::selection {
            background-color: #47a3f3;
            color: #fefefe;
          }

          html {
            min-width: 360px;
            min-height: 100vh;
            scroll-behavior: smooth;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === 'light' ? 'white' : '#171923'};
          }
        `}
      />
      {children}
    </>
  );
};

const App = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <ColorModeProvider value="dark">
      <GlobalStyle>
        <Head>
          <title>Thooks • Turning books into thoughts</title>
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta content="#ffffff" name="theme-color" />
          <meta content="#ffffff" name="msapplication-TileColor" />
        </Head>
        <Component {...pageProps} />
      </GlobalStyle>
    </ColorModeProvider>
  </ThemeProvider>
);

export default App;
