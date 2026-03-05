import { Box, Button, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsDownload, BsCheck2 } from 'react-icons/bs';
import { SiTypescript, SiJavascript, SiNodedotjs, SiReact, SiNextdotjs, SiCss3, SiHtml5 } from 'react-icons/si';
import AboutMe from '../components/aboutMe';
import Projects from '../components/projects';
import { colors } from '../styles/theme/colors';
import Footer from '../components/footer';
import Contacts from '../components/contact';
import ScrollToTopButton from '../common/scrollToTopButton';

const roles = ['Full-Stack Developer', 'Frontend Developer', 'Backend Developer', 'Problem Solver'];

const skills = [
  { label: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { label: 'Node.js',    Icon: SiNodedotjs,  color: '#339933' },
  { label: 'React',      Icon: SiReact,      color: '#61DAFB' },
  { label: 'Next.js',    Icon: SiNextdotjs,  color: '#ffffff' },
  { label: 'CSS',        Icon: SiCss3,       color: '#1572B6' },
  { label: 'HTML',       Icon: SiHtml5,      color: '#E34F26' },
];

const Home: NextPage = () => {
  const router = useRouter();

  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.down('xl'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [dlState, setDlState] = useState<'idle' | 'loading' | 'done'>('idle');

  useEffect(() => {
    const t = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const role = roles[roleIndex];
    if (!isDeleting && displayText === role) {
      const t = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
      return;
    }
    const speed = isDeleting ? 45 : 90;
    const t = setTimeout(() => {
      setDisplayText(
        isDeleting ? role.slice(0, displayText.length - 1) : role.slice(0, displayText.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [displayText, isDeleting, roleIndex]);

  const handleDownload = () => {
    if (dlState !== 'idle') return;
    setDlState('loading');
    const fileUrl = '/CharlesRhobertCabarrusCV.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'CharlesRhobertCabarrusCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      setDlState('done');
      setTimeout(() => setDlState('idle'), 1800);
    }, 800);
  };

  const isDone = dlState === 'done';
  const isLoading = dlState === 'loading';
  const btnColor = isDone ? '#4caf50' : colors.tomato;
  const btnColorHover = isDone ? '#66bb6a' : colors.orange;

  const resumeButton = (
    <Button
      size='large'
      variant='contained'
      color='primary'
      onClick={handleDownload}
      disabled={isLoading}
      sx={{
        mt: { lg: 2, xs: 0 },
        position: 'relative',
        overflow: 'hidden',
        border: `2px solid ${btnColor}`,
        borderRadius: '14px',
        px: { lg: 4, xs: 3 },
        py: { lg: 1.5, xs: 1 },
        background: isDone ? 'rgba(76,175,80,0.1)' : 'rgba(255,113,91,0.08)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '@keyframes shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        '@keyframes borderGlow': {
          '0%,100%': { boxShadow: `0 4px 15px ${colors.glow}` },
          '50%': { boxShadow: `0 4px 32px rgba(255,113,91,0.55), 0 0 0 3px ${colors.glow}` },
        },
        '@keyframes bounce': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(5px)' },
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
          transform: 'translateX(-100%)',
          transition: 'none',
          pointerEvents: 'none',
        },
        '&:hover::after': {
          animation: 'shimmer 0.55s ease forwards',
        },
        animation: dlState === 'idle' ? 'borderGlow 3s ease-in-out infinite' : 'none',
        '&:hover': {
          borderColor: btnColorHover,
          background: isDone ? 'rgba(76,175,80,0.18)' : 'rgba(255,113,91,0.18)',
          transform: 'translateY(-5px)',
          boxShadow: `0 16px 32px ${colors.glow}`,
          animation: 'none',
        },
        '&:active': { transform: 'translateY(-2px)' },
        '&.Mui-disabled': {
          border: `2px solid ${colors.tomato}`,
          opacity: 0.8,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { lg: 1.5, xs: 1 } }}>
        <Typography
          sx={{
            fontSize: { lg: 22, xs: 15 },
            p: { lg: 0.5, xs: 0 },
            textTransform: 'none',
            fontWeight: 600,
            letterSpacing: '0.02em',
            color: isDone ? '#4caf50' : 'inherit',
            transition: 'color 0.3s ease',
          }}
        >
          {isLoading ? 'Downloading…' : isDone ? 'Downloaded!' : 'My Resume'}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: isDone ? '#4caf50' : 'inherit',
            transition: 'color 0.3s ease',
            animation: isLoading ? 'bounce 0.55s ease-in-out infinite' : 'none',
          }}
        >
          {isDone
            ? <BsCheck2 style={{ fontSize: sm ? 18 : 24 }} />
            : <BsDownload style={{ fontSize: sm ? 15 : 22 }} />}
        </Box>
      </Box>
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
                    minHeight: { lg: '92px', xs: '44px' },
                  }}
                >
                  {displayText}
                  <span
                    style={{
                      display: 'inline-block',
                      width: '3px',
                      height: '0.8em',
                      backgroundColor: colors.orange,
                      marginLeft: '4px',
                      verticalAlign: 'middle',
                      borderRadius: '2px',
                      opacity: showCursor ? 1 : 0,
                      transition: 'opacity 0.08s',
                    }}
                  />
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
              <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: { lg: 0, xs: 4 } }}>

                {/* Rotating glow blob behind image */}
                <Box sx={{
                  position: 'absolute',
                  width: { xl: '115%', lg: '115%', xs: '105%' },
                  height: { xl: '115%', lg: '115%', xs: '105%' },
                  borderRadius: '30% 70% 58% 42% / 30% 25% 75% 70%',
                  background: `conic-gradient(from 0deg, ${colors.tomato}55, #8a5cff55, #00ffd135, ${colors.tomato}55)`,
                  '@keyframes glowSpin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                  animation: 'glowSpin 9s linear infinite',
                  filter: 'blur(22px)',
                  zIndex: 0,
                }} />

                {/* Dashed orbit ring */}
                <Box sx={{
                  position: 'absolute',
                  width: { xl: 520, lg: 465, xs: '108%' },
                  height: { xl: 520, lg: 465, xs: '108%' },
                  borderRadius: '50%',
                  border: `1.5px dashed ${colors.tomato}45`,
                  '@keyframes orbitSpin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                  animation: 'orbitSpin 18s linear infinite',
                  zIndex: 0,
                }} />

                {/* Floating code chips — desktop only */}
                {[
                  { label: '</>', color: '#61DAFB', top: '4%',  left: '-22%', delay: '0s' },
                  { label: '{ }', color: '#F7DF1E', top: '2%',  right: '-20%', delay: '0.7s' },
                  { label: 'const', color: '#3178C6', top: '44%', left: '-24%', delay: '1.3s' },
                  { label: '=> ()', color: colors.tomato, bottom: '18%', right: '-22%', delay: '0.4s' },
                  { label: 'git push', color: '#339933', bottom: '4%', left: '-16%', delay: '1s' },
                ].map((chip, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: { xs: 'none', lg: 'flex' },
                      alignItems: 'center',
                      position: 'absolute',
                      top: chip.top,
                      bottom: (chip as any).bottom,
                      left: (chip as any).left,
                      right: (chip as any).right,
                      zIndex: 3,
                      px: 1.5,
                      py: 0.7,
                      borderRadius: '8px',
                      background: 'rgba(10, 16, 30, 0.78)',
                      border: `1px solid ${chip.color}55`,
                      backdropFilter: 'blur(10px)',
                      fontFamily: '"Fira Code", "Courier New", monospace',
                      fontSize: '13px',
                      color: chip.color,
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      boxShadow: `0 4px 20px ${chip.color}30`,
                      letterSpacing: '0.04em',
                      '@keyframes chipFloat': {
                        '0%,100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-9px)' },
                      },
                      animation: `chipFloat 3.8s ease-in-out ${chip.delay} infinite`,
                      userSelect: 'none',
                    }}
                  >
                    <Box component='span' sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: chip.color, mr: 1, flexShrink: 0 }} />
                    {chip.label}
                  </Box>
                ))}

                {/* Profile image */}
                <Box
                  component='img'
                  src={'./images/charles.jpg'}
                  alt='Charles Cabarrus - Full-Stack Developer'
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    borderRadius: '30% 70% 58% 42% / 30% 25% 75% 70%',
                    width: { xl: 450, lg: 400, xs: '80%' },
                    height: { xl: 450, lg: 400, xs: 'auto' },
                    maxWidth: { lg: 'none', xs: 320 },
                    mx: { lg: 0, xs: 'auto' },
                    objectFit: 'cover',
                    border: `5px solid ${colors.tomato}`,
                    filter: 'grayscale(25%)',
                    boxShadow: `0 0 80px ${colors.glow}`,
                    '@keyframes floatImg': {
                      '0%,100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-18px)' },
                    },
                    animation: 'floatImg 4.8s ease-in-out infinite',
                    transition: 'filter 0.6s ease, box-shadow 0.6s ease',
                    '&:hover': {
                      filter: 'grayscale(0%)',
                      boxShadow: `0 0 130px rgba(255, 113, 91, 0.5)`,
                    },
                  }}
                />
              </Box>
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
          position: 'relative',
          py: { lg: 4, xs: 3 },
          overflow: 'hidden',
          background: 'rgba(22, 35, 44, 0.65)',
          backdropFilter: 'blur(12px)',
          borderTop: `1px solid ${colors.border}`,
          borderBottom: `1px solid ${colors.border}`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, bottom: 0,
            width: { lg: 140, xs: 60 },
            background: `linear-gradient(to right, ${colors.lightBlue} 0%, transparent 100%)`,
            zIndex: 2,
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0, right: 0, bottom: 0,
            width: { lg: 140, xs: 60 },
            background: `linear-gradient(to left, ${colors.lightBlue} 0%, transparent 100%)`,
            zIndex: 2,
            pointerEvents: 'none',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 'max-content',
            animation: 'scrollLeft 28s linear infinite',
            '&:hover': { animationPlayState: 'paused' },
          }}
        >
          {[...skills, ...skills].map(({ label, Icon, color }, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mx: { lg: 2, xs: 1.5 },
                px: { lg: 3, xs: 2 },
                py: { lg: 1.5, xs: 1 },
                borderRadius: '50px',
                border: `1px solid ${colors.border}`,
                background: 'rgba(255, 113, 91, 0.04)',
                whiteSpace: 'nowrap',
                cursor: 'default',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'rgba(255, 113, 91, 0.12)',
                  borderColor: colors.borderHover,
                  transform: 'translateY(-3px)',
                  boxShadow: `0 8px 24px ${colors.glow}`,
                },
              }}
            >
              <Icon style={{ fontSize: 20, color, flexShrink: 0 }} />
              <Typography
                sx={{
                  color: colors.textSecondary,
                  fontSize: { lg: 16, xs: 13 },
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  transition: 'color 0.3s ease',
                  '.MuiBox-root:hover &': { color: colors.textPrimary },
                }}
              >
                {label}
              </Typography>
            </Box>
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
