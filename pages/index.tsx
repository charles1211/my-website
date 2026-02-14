import { Box, Button, Chip, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { BsDownload } from 'react-icons/bs';
import AboutMe from '../components/aboutMe';
import Projects from '../components/projects';
import { colors } from '../styles/theme/colors';
import Footer from '../components/footer';
import Contacts from '../components/contact';
import ScrollToTopButton from '../common/scrollToTopButton';

const skills = ['TypeScript', 'JavaScript', 'Node.js', 'React', 'Next.js', 'CSS', 'HTML'];

const Home: NextPage = () => {
  const router = useRouter();

  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.down('xl'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDownload = () => {
    const fileUrl = '/CharlesRhobertCabarrusCV.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'CharlesRhobertCabarrusCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resumeButton = (
    <Button
      size='large'
      variant='contained'
      color='primary'
      onClick={handleDownload}
      sx={{
        mt: { lg: 2, xs: 0 },
        border: `2px solid ${colors.tomato}`,
        borderRadius: '14px',
        px: { lg: 4, xs: 3 },
        py: { lg: 1.5, xs: 1 },
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          borderColor: colors.orange,
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 28px ${colors.glow}`,
        },
      }}
    >
      <Typography
        sx={{
          fontSize: { lg: 22, xs: 15 },
          p: { lg: 0.5, xs: 0 },
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.02em',
        }}
      >
        My resume
      </Typography>
      <BsDownload style={{ fontSize: sm ? 15 : 22, marginLeft: 12 }} />
    </Button>
  );

  return (
    <>
      {/* Hero Section */}
      <Grid
        container
        justifyContent='center'
        item
        xs={12}
        sx={{ padding: { xl: 3, xs: 3 }, mt: { lg: 20, xs: 10 } }}
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
                    letterSpacing: '-0.03em',
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
                        borderRadius: '2px',
                        boxShadow: `0 2px 8px ${colors.glow}`,
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
                      letterSpacing: '-0.01em',
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
                    letterSpacing: '-0.02em',
                    textShadow: '0 4px 20px rgba(252, 163, 17, 0.15)',
                  }}
                >
                  Front-end Developer
                </Typography>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography
                  sx={{
                    color: colors.textSecondary,
                    fontSize: { lg: 20, xs: 16 },
                    textAlign: { xs: 'center', lg: 'start' },
                    mb: { lg: 2, xs: 1 },
                    fontFamily: 'Roboto Slab',
                    fontWeight: 300,
                    lineHeight: 1.6,
                  }}
                >
                  Building intuitive, scalable, and impactful digital experiences.
                </Typography>
              </Grid>
              {!sm && (
                <Grid
                  container
                  alignItems='center'
                  justifyContent='start'
                  item
                  xs={12}
                  lg={12}
                >
                  {resumeButton}
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
                  width: { xl: 450, lg: 400, xs: '80%' },
                  height: { xl: 450, lg: 400, xs: 'auto' },
                  maxWidth: { lg: 'none', xs: 320 },
                  mx: { lg: 0, xs: 'auto' },
                  objectFit: 'cover',
                  border: `5px solid ${colors.tomato}`,
                  filter: 'grayscale(30%)',
                  boxShadow: `0 0 80px ${colors.glow}`,
                  mt: { lg: 0, xs: 3 },
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    filter: 'grayscale(0%)',
                    boxShadow: `0 0 100px rgba(255, 113, 91, 0.35)`,
                    transform: 'scale(1.02)',
                  },
                }}
                component='img'
                src={'./images/charles.jpg'}
                alt='Charles Cabarrus - Front-end Developer'
              />
            </Grid>
            {sm && (
              <Grid
                container
                alignItems='center'
                justifyContent='center'
                item
                xs={12}
                lg={12}
                sx={{ mt: 5, mb: 3 }}
              >
                {resumeButton}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* Skills Bar */}
      <Box
        sx={{
          backgroundColor: colors.lightBlue,
          py: { lg: 5, xs: 3 },
          px: { lg: 4, xs: 2 },
          borderTop: `1px solid ${colors.border}`,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { lg: 3, xs: 1.5 },
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          {skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              sx={{
                backgroundColor: 'rgba(255, 113, 91, 0.08)',
                color: colors.textSecondary,
                border: `1px solid ${colors.border}`,
                fontSize: { lg: 18, xs: 14 },
                fontWeight: 500,
                px: { lg: 3, xs: 1.5 },
                py: { lg: 3, xs: 2.5 },
                letterSpacing: '0.03em',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 113, 91, 0.15)',
                  borderColor: colors.borderHover,
                  color: colors.textPrimary,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 12px ${colors.glow}`,
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* About Section */}
      <Grid container justifyContent='center' item xs={12}>
        <Grid item xs={10} sx={{ mt: { lg: 20, xs: 8 } }} id='about-section'>
          <AboutMe />
        </Grid>
      </Grid>

      {/* Projects Section */}
      <Grid item xs={12} sx={{ p: { lg: 20, xs: 5 }, mt: { lg: 0, xs: 10 } }} id='project-section'>
        <Projects />
      </Grid>

      {/* Contact Section */}
      <Grid item xs={12} id='contact-section'>
        <Contacts />
      </Grid>

      {/* Footer */}
      <Grid item xs={12}>
        <Footer />
      </Grid>

      <ScrollToTopButton />
    </>
  );
};

export default Home;
