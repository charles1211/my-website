import { ThemeOptions } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const lightThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#121F28',
    },
    secondary: {
      main: '#FF715B',
      // secondary: "#4B4B4B",
    },
    error: {
      main: red.A400,
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
  },
};

export default lightThemeOptions;
