import MenuIcon from '@mui/icons-material/Menu';
import {
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useRef } from 'react';
import useScrollDirectionHook from '../../hooks/useScrollDirectionHook';
import { colors } from '../../styles/theme/colors';
import Drawer from '@mui/material/Drawer';
import { BiMenuAltLeft } from 'react-icons/bi';

const drawerWidth = 240;

const sections = [
  {
    anchor: 'home',
    text: 'Home',
  },
  {
    anchor: 'about',
    text: 'About',
  },
  {
    anchor: 'project',
    text: 'Projects',
  },
  {
    anchor: 'contact',
    text: 'Contact',
  },
];

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: () => Window;
  // children: React.ReactElement;
}

const Header = (props: Props) => {
  const router = useRouter();
  const ref = useRef(null);
  const [scrollDirection, handlerOnTransitionEnd] = useScrollDirectionHook(ref);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleScrollToSection = (anchor) => () => {
    const id = `${anchor}-section`;
    if (router.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } else {
      router.push('/');
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {sections.map((item, i) => (
          <ListItem key={i}>
            <ListItemButton
              onClick={handleScrollToSection(item.anchor)}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = props.window !== undefined ? () => props.window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar component='nav' sx={{ boxShadow: 0, p: { lg: 3, xs: 0 } }}>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <BiMenuAltLeft style={{ fontSize: 40 }} />
              </IconButton>
              <Typography
                variant='h4'
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontWeight: 700 }}
              >
                Charles Cabarrus
              </Typography>

              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {sections.map((page, i) => (
                  <Button
                    size='large'
                    key={i}
                    onClick={handleScrollToSection(page.anchor)}
                    sx={{
                      my: 2,
                      color: 'white',
                      mx: 2,
                      '&:hover': {
                        color: page.text === 'Contact' ? 'black' : colors.orange,
                        backgroundColor: page.text === 'Contact' ? 'white' : 'none',
                      },
                    }}
                    variant={page.text === 'Contact' ? 'contained' : undefined}
                    color={page.text === 'Contact' ? 'secondary' : undefined}
                  >
                    {page.text}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: colors.lightBlue,
            },
            color: colors.lightBlue,
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};
export default Header;

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}
