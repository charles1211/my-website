import { Grid, Typography } from '@mui/material';

interface AboutMeProps {}

const AboutMe = ({}: AboutMeProps) => {
  return (
    <Grid item xs={12} sx={{ height: 1000 }}>
      <Typography variant='h3'>About Me</Typography>
    </Grid>
  );
};

export default AboutMe;
