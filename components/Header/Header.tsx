import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useRef } from 'react';
import useScrollDirectionHook from '../../hooks/useScrollDirectionHook';
import { colors } from '../../styles/theme/colors';
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
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', pt: 2 }}>
      <Typography
        variant='h6'
        sx={{
          py: 2,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          background: `linear-gradient(135deg, ${colors.tomato} 0%, ${colors.orange} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Charles Cabarrus
      </Typography>
      <Box
        sx={{
          width: '60%',
          height: '1px',
          mx: 'auto',
          mb: 2,
          background: `linear-gradient(90deg, transparent, ${colors.tomato}, transparent)`,
        }}
      />
      <List>
        {sections.map((item, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton
              onClick={handleScrollToSection(item.anchor)}
              sx={{
                textAlign: 'center',
                py: 2,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 113, 91, 0.1)',
                  transform: 'translateX(8px)',
                  '& .MuiListItemText-primary': {
                    color: colors.tomato,
                    fontWeight: 600,
                  },
                },
              }}
            >
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '1.1rem',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              />
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
        <AppBar
          component='nav'
          sx={{
            boxShadow: 0,
            p: { lg: 3, xs: 0 },
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(18, 31, 40, 0.95)',
            borderBottom: '1px solid rgba(255, 113, 91, 0.1)',
          }}
        >
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  display: { sm: 'none' },
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'rotate(90deg)',
                    color: colors.tomato,
                  },
                }}
              >
                <BiMenuAltLeft style={{ fontSize: 40 }} />
              </IconButton>
              <Typography
                variant='h4'
                sx={{
                  flexGrow: 1,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  fontSize: { xs: '1.2rem', sm: '2.125rem' },
                  background: `linear-gradient(135deg, ${colors.tomato} 0%, ${colors.orange} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
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
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        width: 0,
                        height: '2px',
                        backgroundColor: page.text === 'Contact' ? 'transparent' : colors.orange,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: 'translateX(-50%)',
                      },
                      '&:hover': {
                        color: page.text === 'Contact' ? '#121F28' : colors.orange,
                        backgroundColor: page.text === 'Contact' ? 'white' : 'transparent',
                        transform: page.text === 'Contact' ? 'translateY(-2px)' : 'none',
                        boxShadow:
                          page.text === 'Contact' ? '0 4px 12px rgba(255, 113, 91, 0.3)' : 'none',
                        '&::after': {
                          width: page.text === 'Contact' ? 0 : '80%',
                        },
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
              borderRight: `1px solid rgba(255, 113, 91, 0.2)`,
              backgroundImage:
                'linear-gradient(180deg, rgba(255, 113, 91, 0.05) 0%, transparent 100%)',
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
