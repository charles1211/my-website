// pages/_app.tsx
import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import dynamic from 'next/dynamic';

const SoftAurora = dynamic(() => import('../components/SoftAurora'), { ssr: false });

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

// Note: react-multi-carousel/lib/styles.css import removed — carousel replaced with scroll-snap
// Note: Header import removed — replaced by Navbar below
// Note: Footer (including ScrollToTopButton) is rendered from pages/index.tsx via the Footer component

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  React.useEffect(() => {
    AOS.init({ easing: 'ease-out-cubic', once: true, offset: 80 });
  }, []);

  return (
    <>
      <Head>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='My personal portfolio' />
        <meta property='og:title' content='Charles Portfolio' />
        <meta property='og:description' content='Charles Portfolio' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://charlescabarrus.vercel.app/' />
        <title>Charles Portfolio</title>
        <link rel='icon' href='/images/crc-logo.png' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Slab:wght@300;400;600;700&display=swap' />
      </Head>

      {/* SoftAurora — WebGL aurora background, fixed behind all content */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1}
          color1="#f7f7f7"
          color2="#e100ff"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
      </div>

      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          {/* Navbar: INSIDE ThemeProvider — uses MUI breakpoints (spec Section 2.2) */}
          <Navbar />
          <Component {...pageProps} />
          <ToastContainer
            position='top-right' autoClose={3000} hideProgressBar
            newestOnTop={false} closeOnClick rtl={false}
            pauseOnFocusLoss draggable pauseOnHover
            theme='colored' transition={Zoom}
          />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default MyApp;
