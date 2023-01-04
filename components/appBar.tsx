import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import { useRef } from 'react';

const pages = ['About me', 'Experience', 'Contacts'];

const NavBar = () => {
  const router = useRouter();

  const aboutSection = useRef(null);

  function scrollToAboutUs() {
    window.scrollTo({
      top: 951,
      behavior: 'smooth',
    });
  }

  return (
    <AppBar position='static' sx={{ boxShadow: 5 }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Grid container item xl={12}>
            <Grid item xs={6}>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={() => {
                  router.push('/');
                }}
              >
                CHARLES
              </Button>
            </Grid>
            <Grid container justifyContent='flex-end' item xs={6}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    if (page === 'About me') return scrollToAboutUs();
                    if (page === 'Contact') return router.push('/contact');
                  }}
                  sx={{ my: 2, color: 'white', display: 'block', mx: 2 }}
                >
                  {page}
                </Button>
              ))}
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
