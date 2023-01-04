import { ThemeOptions } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const lightThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#424242',
      // secondary: "#4B4B4B",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FFFFFF',
    },
  },
};

export default lightThemeOptions;
