import { Box, Container, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Lottie from 'lottie-react-web';
import Zoom from 'react-reveal/Zoom';

import helloAnination from '../public/animations/hello.json';
import backgroundCity from '../public/animations/backgroundcity.json';
import AboutMe from '../components/aboutMe';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const aboutSection: any = useRef();
  const router = useRouter();

  useEffect(() => {
    console.log(router);

    console.log(aboutSection.current.offsetTop);
  }, []);

  return (
    <>
      <Grid container item xs={12} sx={{ padding: 3, backgroundColor: '#F2F5F7' }}>
        <Grid item container justifyContent='center' xs={6}>
          <Zoom>
            <Box
              boxShadow={5}
              sx={{ borderRadius: '10%', width: '95%' }}
              component='img'
              src={'./images/me.jpg'}
              alt='me'
            />
          </Zoom>
        </Grid>
        <Grid item container justifyContent='center' alignContent='center' xs={6}>
          <Grid sx={{ position: 'absolute' }}>
            <Lottie
              height='100%'
              width='100%'
              options={{
                animationData: backgroundCity,
                loop: true,
              }}
            />
          </Grid>
          <Lottie
            height='50%'
            width='50%'
            options={{
              animationData: helloAnination,
              loop: true,
            }}
          />
          <Zoom>
            <Typography variant='h1' sx={{ fontWeight: 400 }}>
              I am Charles, a front-end developer
            </Typography>
          </Zoom>
        </Grid>
      </Grid>
      <div className='section section2' ref={aboutSection}>
        <Container maxWidth='xl'>
          <AboutMe />
        </Container>
      </div>
    </>
  );
};

export default Home;
