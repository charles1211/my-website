// components/footer.tsx
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { colors } from '../styles/theme/colors';
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import ScrollToTopButton from '../common/scrollToTopButton';

interface FooterProps {}

const socialIconSx = {
  p: 2,
  borderRadius: '12px',
  backgroundColor: 'rgba(255,113,91,0.1)',
  border: `1px solid ${colors.glow}`,
  cursor: 'pointer',
  display: 'inline-flex',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: colors.tomato,
    transform: 'translateY(-6px) rotate(5deg)',
    boxShadow: `0 8px 20px rgba(255,113,91,0.35)`,
    borderColor: colors.tomato,
  },
  // Ripple: ::after starts visible (opacity:1) at full size on :active via keyframe,
  // then fades out — uses @keyframes rippleFade defined inline via MUI sx
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.25)',
    transform: 'scale(0)',
    opacity: 0,
    pointerEvents: 'none',
  },
  '&:active::after': {
    // Snap to visible full-size on click, then CSS transition on base state animates it back
    animation: 'rippleFade 0.5s ease-out forwards',
  },
  '@keyframes rippleFade': {
    '0%':   { transform: 'scale(0)',   opacity: 1 },
    '100%': { transform: 'scale(2.5)', opacity: 0 },
  },
};

const Footer = ({}: FooterProps) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const iconSize = sm ? 28 : 36;

  return (
    <>
      <Grid
        container item xs={12}
        sx={{
          backgroundColor: colors.lightBlue,
          position: 'relative',
          pt: 6, pb: 4,
          pl: { lg: 0, xs: 2 },
          pr: { lg: 0, xs: 2 },
          // Animated gradient top border
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: 2,
            background: `linear-gradient(90deg, ${colors.tomato}, ${colors.orange}, ${colors.tomato})`,
            backgroundSize: '200% 100%',
            animation: 'borderShift 4s linear infinite',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '100%',
            background: 'linear-gradient(180deg, rgba(255,113,91,0.03) 0%, transparent 100%)',
            pointerEvents: 'none',
          },
          '@keyframes borderShift': {
            '0%':   { backgroundPosition: '0% 0%'   },
            '100%': { backgroundPosition: '200% 0%' },
          },
        }}
        spacing={3}
      >
        <Grid container justifyContent="center" item xs={12}>
          <Typography
            sx={{
              fontSize: { lg: 35, xs: 25 }, fontWeight: 700, letterSpacing: '0.02em',
              background: `linear-gradient(135deg, ${colors.tomato} 0%, ${colors.orange} 100%)`,
              backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}
          >
            Charles Cabarrus
          </Typography>
        </Grid>
        <Grid container justifyContent="center" item xs={12}>
          <Typography
            sx={{ fontFamily: 'Roboto Slab', fontSize: { lg: 18, xs: 14 }, textAlign: 'center', color: colors.textSecondary, letterSpacing: '0.01em' }}
          >
            Designed with love, all rights reserved for Charles Cabarrus
          </Typography>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" item xs={12} sx={{ gap: 2 }}>
          <Box sx={socialIconSx} onClick={() => window.open('https://www.facebook.com/charles.cabarrus', '_blank', 'noopener,noreferrer')}>
            <BsFacebook style={{ fontSize: iconSize, color: 'white' }} />
          </Box>
          <Box sx={socialIconSx} onClick={() => window.open('https://www.instagram.com/ltscharlesilog/', '_blank', 'noopener,noreferrer')}>
            <BsInstagram style={{ fontSize: iconSize, color: 'white' }} />
          </Box>
          <Box sx={socialIconSx} onClick={() => window.open('https://www.linkedin.com/in/charles-rhobert-cabarrus-3201ba138/', '_blank', 'noopener,noreferrer')}>
            <BsLinkedin style={{ fontSize: iconSize, color: 'white' }} />
          </Box>
          <Box sx={socialIconSx} onClick={() => window.open('https://github.com/charles1211', '_blank', 'noopener,noreferrer')}>
            <FaGithub style={{ fontSize: iconSize, color: 'white' }} />
          </Box>
        </Grid>
      </Grid>
      <ScrollToTopButton />
    </>
  );
};

export default Footer;
