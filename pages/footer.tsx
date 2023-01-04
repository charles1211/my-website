import { ThemeContext } from '@emotion/react';
import { Grid, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  return (
    <Grid
      container
      item
      xs={12}
      sx={{ backgroundColor: (theme) => alpha(theme.palette.primary.main, 1), height: 200 }}
    >
      <Grid item xs={4}>
        <Typography>col 1</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>col 1</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>col 1</Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
function makeStyles(arg0: {
  root: {
    background: string;
    border: number;
    borderRadius: number;
    boxShadow: string;
    color: string;
    height: number;
    padding: string;
  };
}) {
  throw new Error('Function not implemented.');
}
