import type { ThemeOptions } from '@mui/material';

const lightThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#121F28',
    },
    secondary: {
      main: '#FF715B',
    },
    error: {
      main: '#ff1744',
    },
    background: {
      default: '#121F28',
    },
  },
  typography: {
    allVariants: {
      color: 'white',
      fontFamily: 'Roboto Slab',
    },
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 400,
      letterSpacing: '0.01em',
      lineHeight: 1.7,
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none' as const,
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 4px 12px rgba(255, 113, 91, 0.2)',
          '&:hover': {
            boxShadow: '0 8px 20px rgba(255, 113, 91, 0.3)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 500,
        },
      },
    },
  },
};

export default lightThemeOptions;
