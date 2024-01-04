import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme, useScrollTrigger, Slide } from '@mui/material';

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
      once: false,
      offset: 500,
    });
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />

        <Header window={window} />

        <Component {...pageProps} />
        {/* <Footer /> */}
        {/* <ScrollToTopButton /> */}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
