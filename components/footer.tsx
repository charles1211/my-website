import { ThemeContext } from '@emotion/react';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { colors } from '../styles/theme/colors';
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        backgroundColor: colors.lightBlue,
        pt: 2,
        pb: 4,
        pl: { lg: 0, xs: 2 },
        pr: { lg: 0, xs: 2 },
      }}
      spacing={3}
    >
      <Grid container justifyContent='center' item xs={12}>
        <Typography sx={{ fontSize: { lg: 35, xs: 25 } }}>Charles Cabarrus</Typography>
      </Grid>
      <Grid container justifyContent='center' item xs={12}>
        <Typography
          sx={{
            fontFamily: 'Roboto Slap light',
            fontSize: { lg: 30, xs: 20 },
            textAlign: { lg: 'start', xs: 'center' },
          }}
          color='lightgray'
        >
          Designed with love, all right reserved for Charles Cabarrus
        </Typography>
      </Grid>
      <Grid container justifyContent='center' item xs={12}>
        <div>
          <BsFacebook
            style={{ fontSize: sm ? 40 : 60, marginRight: 20, marginLeft: 20 }}
            className='social-media-links'
            onClick={() => {
              window.open('https://www.facebook.com/charles.cabarrus');
            }}
          />
        </div>
        <div>
          <BsInstagram
            style={{ fontSize: sm ? 40 : 60, marginRight: 20, marginLeft: 20 }}
            className='social-media-links'
            onClick={() => {
              window.open('https://www.instagram.com/ltscharlesilog/');
            }}
          />
        </div>
        <BsLinkedin
          style={{ fontSize: sm ? 40 : 60, marginRight: 20, marginLeft: 20 }}
          className='social-media-links'
          onClick={() => {
            window.open('https://www.linkedin.com/in/charles-rhobert-cabarrus-3201ba138/');
          }}
        />
        <FaGithub
          style={{ fontSize: sm ? 40 : 60, marginRight: 20, marginLeft: 20 }}
          className='social-media-links'
          onClick={() => {
            window.open('https://github.com/charles1211');
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Footer;
