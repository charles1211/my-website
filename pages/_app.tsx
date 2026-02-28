import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme, useScrollTrigger, Slide } from '@mui/material';
import dynamic from 'next/dynamic';

const ColorBends = dynamic(() => import('../components/ColorBends'), { ssr: false });

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import '../styles/globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/footer';
import ScrollToTopButton from '../common/scrollToTopButton';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'react-multi-carousel/lib/styles.css';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  window: () => Window;
  children: React.ReactElement;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, window, children } = props;

  React.useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='My personal porfolio' />
        <meta property='og:title' content='Charles Portfolio' />
        <meta property='og:description' content='Charles Portfolio' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://charlescabarrus.vercel.app/' />
        <title>Charles Portfolio</title>
        <link rel='icon' href='/images/crc-logo.png' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </Head>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={0}
          speed={0.5}
          scale={1}
          frequency={1.2}
          warpStrength={1}
          mouseInfluence={1}
          parallax={1.25}
          noise={0.1}
          transparent
          autoRotate={0}
        />
      </div>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />

          <Header window={window} />

          <Component {...pageProps} />
          {/* <Footer /> */}
          {/* <ScrollToTopButton /> */}
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
            transition={Zoom}
          />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default MyApp;
