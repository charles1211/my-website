import { Box, Button, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { BsDownload } from 'react-icons/bs';
import AboutMe from '../components/aboutMe';
import Projects from '../components/projects';
import { colors } from '../styles/theme/colors';
import Footer from '../components/footer';
import Contacts from '../components/contact';
import ScrollToTopButton from '../common/scrollToTopButton';

const Home: NextPage = () => {
  const router = useRouter();

  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.down('xl'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDownload = () => {
    // Replace 'path/to/your/local/file.pdf' with the actual path to your PDF file
    const fileUrl = '/CharlesRhobertCabarrusCV.pdf';

    // Create a link element
    const link = document.createElement('a');

    // Set the href attribute to the file URL
    link.href = fileUrl;

    // Set the download attribute with the desired filename
    link.download = 'CharlesRhobertCabarrusCV.pdf';

    // Append the link to the document body
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
  };

  return (
    <>
      <Grid
        container
        justifyContent='center'
        item
        xs={12}
        sx={{ padding: { xl: 3, xs: 3 }, mt: { lg: 20, xs: 3 } }}
        id='home-section'
      >
        <Grid item xs={12} lg={10}>
          <Grid container alignItems='center' item xs={12} lg={12}>
            <Grid
              item
              container
              justifyContent='center'
              xs={12}
              lg={6}
              data-aos={sm ? '' : 'fade-left'}
            >
              <Grid item xs={12} lg={12}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { lg: 75, xs: 40 },
                    textAlign: { xs: 'center', lg: 'start' },
                  }}
                >
                  Hello<span style={{ color: colors.tomato }}>.</span>
                </Typography>
              </Grid>
              <Grid container item xs={12} lg={12} sx={{ position: 'relative' }}>
                <Grid item xs={12} lg={2}>
                  <span>
                    <Divider
                      sx={{
                        position: 'absolute',
                        height: 5,
                        width: { lg: 300, xs: 100 },
                        backgroundColor: colors.tomato,
                        bottom: { lg: 25, xs: -4 },

                        right: 0,
                        ml: { lg: 0, xs: 'auto' },
                        mr: { lg: 0, xs: 'auto' },
                        left: { xl: -200, lg: -240, xs: 0 },
                      }}
                    />
                  </span>
                </Grid>
                <Grid item xs={12} lg={10}>
                  <Typography
                    sx={{
                      fontWeight: 300,
                      fontSize: { lg: 60, xs: 30 },
                      textAlign: { xs: 'center', lg: 'start' },
                    }}
                  >{`I'm Charles`}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: colors.orange,
                    fontSize: { lg: 75, xs: 30 },
                    textAlign: { xs: 'center', lg: 'start' },
                    mt: { lg: 0, xs: 3 },
                  }}
                >
                  Front-end Developer
                </Typography>
              </Grid>
              {!sm && (
                <Grid
                  container
                  alignItems='center'
                  justifyContent={sm ? 'center' : 'start'}
                  item
                  xs={12}
                  lg={12}
                >
                  <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    sx={{ mt: { lg: 2, xs: 0 }, border: `3px solid ${colors.tomato}` }}
                    onClick={handleDownload}
                  >
                    <Typography
                      sx={{
                        fontSize: { lg: 25, xs: 15 },
                        p: { lg: 1, xs: 0 },
                        textTransform: 'none',
                      }}
                    >
                      {' '}
                      My resume
                    </Typography>
                    <BsDownload style={{ fontSize: sm ? 15 : 25, marginLeft: 10 }} />
                  </Button>
                </Grid>
              )}
            </Grid>
            <Grid
              item
              container
              justifyContent='center'
              xs={12}
              lg={6}
              data-aos={sm ? '' : 'fade-right'}
            >
              <Box
                sx={{
                  borderRadius: '30% 70% 58% 42% / 30% 25% 75% 70%',
                  width: { xl: 450, lg: 400, xs: '100%' },
                  height: { xl: 450, lg: 400, xs: '100%' },
                  objectFit: 'cover',
                  borderColor: 'tomato',
                  // borderStyle: 'solid',
                  border: '7px solid tomato',
                  filter: 'grayscale(40%)',
                  boxShadow: '2px 2px 130px tomato',
                  mt: { lg: 0, xs: 3 },
                }}
                component='img'
                src={'./images/charles.jpg'}
                alt='me'
              />
            </Grid>
            {sm && (
              <Grid
                container
                alignItems='center'
                justifyContent={sm ? 'center' : 'start'}
                item
                xs={12}
                lg={12}
                sx={{ mt: 5, mb: 3 }}
              >
                <Button
                  size='large'
                  variant='contained'
                  color='primary'
                  sx={{ mt: { lg: 2, xs: 0 }, border: `3px solid ${colors.tomato}` }}
                >
                  <Typography
                    sx={{
                      fontSize: { lg: 25, xs: 15 },
                      p: { lg: 1, xs: 0 },
                      textTransform: 'none',
                    }}
                  >
                    {' '}
                    My resume
                  </Typography>
                  <BsDownload style={{ fontSize: sm ? 15 : 25, marginLeft: 10 }} />
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} sx={{ backgroundColor: colors.lightBlue, p: { lg: 4, xs: 2 } }}>
        <Grid container justifyContent='center' item xs={4} lg={4} xl={2}>
          <Typography color='GrayText' sx={{ fontSize: { lg: 35, xs: 20 } }}>
            Typescript
          </Typography>
        </Grid>
        <Grid container justifyContent='center' item xs={4} lg={4} xl={2}>
          <Typography color='GrayText' sx={{ fontSize: { lg: 35, xs: 20 } }}>
            Javascript
          </Typography>
        </Grid>
        <Grid container justifyContent='center' item xs={4} lg={3} xl={1}>
          <Typography color='GrayText' sx={{ fontSize: { lg: 35, xs: 20 } }}>
            Node.js
          </Typography>
        </Grid>
        <Grid container justifyContent='center' item xs={3} lg={3} xl={2}>
          <Typography color='GrayText' sx={{ fontSize: { lg: 35, xs: 20 } }}>
            React
          </Typography>
        </Grid>
        <Grid container justifyContent='center' item xs={3} lg={3} xl={1}>
          <Typography color='GrayText' sx={{ fontSize: { lg: 35, xs: 20 } }}>
            Next.js
          </Typography>
        </Grid>
        <Grid container justifyContent='center' item xs={3} lg={3} xl={2}>
          <Typography color='GrayText' sx={{ fontSize: { lg: 35, xs: 20 } }}>
            CSS
          </Typography>
        </Grid>
        <Grid container justifyContent='center' item xs={3} lg={3} xl={2}>
          <Typography color='GrayText' sx={{ fontSize: { lg: 35, xs: 20 } }}>
            HTMLS
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent='center' item xs={12}>
        <Grid item xs={10} sx={{ mt: 20 }} id='about-section'>
          <AboutMe />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ p: { lg: 20, xs: 5 }, mt: { lg: 0, xs: 10 } }} id='project-section'>
        <Projects />
      </Grid>
      <Grid item xs={12} id='contact-section'>
        <Contacts />
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
      <ScrollToTopButton />
    </>
  );
};

export default Home;
