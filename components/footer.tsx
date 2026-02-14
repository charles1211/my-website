import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { colors } from '../styles/theme/colors';
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';

interface FooterProps {}

const socialIconSx = {
  p: 2,
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 113, 91, 0.1)',
  border: `1px solid ${colors.glow}`,
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'inline-flex',
  '&:hover': {
    backgroundColor: colors.tomato,
    transform: 'translateY(-6px) rotate(5deg)',
    boxShadow: `0 8px 20px ${colors.borderHover}`,
    borderColor: colors.tomato,
  },
};

const Footer = ({}: FooterProps) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const iconSize = sm ? 28 : 36;

  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        backgroundColor: colors.lightBlue,
        borderTop: `2px solid ${colors.tomato}`,
        pt: 6,
        pb: 4,
        pl: { lg: 0, xs: 2 },
        pr: { lg: 0, xs: 2 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'linear-gradient(180deg, rgba(255, 113, 91, 0.03) 0%, transparent 100%)',
          pointerEvents: 'none',
        },
      }}
      spacing={3}
    >
      <Grid container justifyContent='center' item xs={12}>
        <Typography
          sx={{
            fontSize: { lg: 35, xs: 25 },
            fontWeight: 700,
            letterSpacing: '0.02em',
            background: `linear-gradient(135deg, ${colors.tomato} 0%, ${colors.orange} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Charles Cabarrus
        </Typography>
      </Grid>
      <Grid container justifyContent='center' item xs={12}>
        <Typography
          sx={{
            fontFamily: 'Roboto Slab light',
            fontSize: { lg: 30, xs: 20 },
            textAlign: { lg: 'start', xs: 'center' },
            color: colors.textSecondary,
            letterSpacing: '0.01em',
          }}
        >
          Designed with love, all right reserved for Charles Cabarrus
        </Typography>
      </Grid>
      <Grid container justifyContent='center' alignItems='center' item xs={12} sx={{ gap: 2 }}>
        <Box
          sx={socialIconSx}
          onClick={() => {
            window.open('https://www.facebook.com/charles.cabarrus');
          }}
        >
          <BsFacebook style={{ fontSize: iconSize, color: 'white' }} />
        </Box>
        <Box
          sx={socialIconSx}
          onClick={() => {
            window.open('https://www.instagram.com/ltscharlesilog/');
          }}
        >
          <BsInstagram style={{ fontSize: iconSize, color: 'white' }} />
        </Box>
        <Box
          sx={socialIconSx}
          onClick={() => {
            window.open('https://www.linkedin.com/in/charles-rhobert-cabarrus-3201ba138/');
          }}
        >
          <BsLinkedin style={{ fontSize: iconSize, color: 'white' }} />
        </Box>
        <Box
          sx={socialIconSx}
          onClick={() => {
            window.open('https://github.com/charles1211');
          }}
        >
          <FaGithub style={{ fontSize: iconSize, color: 'white' }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Footer;
