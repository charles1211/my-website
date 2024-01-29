import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { colors } from '../styles/theme/colors';
import { useState } from 'react';
import { toast } from 'react-toastify';

const styles = {
  bgImg: {
    backgroundImage: `url(/images/contactus.png)`,
    height: 800,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 1200px',
    // [theme.breakpoints.down('sm')]: {
    //   height: 300,
    // },
  },
};

interface ContactsProps {}

const Contacts = ({}: ContactsProps) => {
  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.down('xl'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const [initialValue, setInitialValue] = useState({
    email: 'charlescabarrus99@gmail.com',
    sender: '',
    subject: '',
    message: '',
  });

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function handleSubmit() {
    if (initialValue.sender === '' || initialValue.subject === '' || initialValue.message === '') {
      return toast.error('All fields required');
    }
    if (!isValidEmail(initialValue.sender)) {
      return toast.error('Email is invalid');
    }

    await fetch(`https://formbold.com/s/94x0j`, {
      method: 'POST',
      body: JSON.stringify(initialValue),
      headers: { 'Content-Type': 'application/json' },
    });
    toast.success('Email sent!');
    setInitialValue({
      email: 'charlescabarrus99@gmail.com',
      sender: '',
      subject: '',
      message: '',
    });
  }

  return (
    <Grid
      container
      justifyContent='center'
      item
      xs={12}
      // id='contact-section'
      data-aos='zoom-in-up'
      sx={{ mt: 10, mb: 20 }}
    >
      <Grid item xs={12} lg={10}>
        <Grid container item xs={12} lg={12}>
          <Grid container item xs={12} lg={12} sx={{ position: 'relative' }}>
            <Grid item xs={1} lg={1}>
              <span>
                <Divider
                  sx={{
                    height: 5,
                    width: { lg: 300, xs: 100 },
                    backgroundColor: colors.tomato,
                    position: 'absolute',
                    bottom: { lg: 15, xs: 0 },
                    left: { xl: -200, lg: -240, xs: 0 },
                    right: 0,
                    ml: { lg: 0, xs: 'auto' },
                    mr: { lg: 0, xs: 'auto' },
                  }}
                />
              </span>
            </Grid>
            <Grid item xs={12} lg={10}>
              <Typography sx={{ fontSize: 40, textAlign: { lg: 'start', xs: 'center' } }}>
                Contacts
              </Typography>
            </Grid>
          </Grid>
          <Grid item justifyContent='center' xs={12} lg={6} data-aos='zoom-in-up'>
            <Grid item xs={12} lg={12}>
              <Typography
                gutterBottom
                sx={{
                  fontSize: { xl: 90, lg: 70, xs: 40 },
                  fontWeight: 700,
                  color: colors.orange,
                  textAlign: { lg: 'start', xs: 'center' },
                  mt: { lg: 0, xs: 2 },
                }}
              >
                Have a project?
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography
                gutterBottom
                sx={{
                  fontSize: { xl: 90, lg: 70, xs: 35 },
                  fontWeight: 700,
                  color: colors.orange,
                  textAlign: { lg: 'start', xs: 'center' },
                }}
              >
                {` Let's talk!`}
              </Typography>
            </Grid>
            {!sm && (
              <Grid container alignItems='center' item xs={12} lg={12}>
                <Button
                  variant='contained'
                  sx={{ backgroundColor: colors.tomato, marginRight: 5 }}
                  onClick={handleSubmit}
                >
                  <Typography sx={{ fontSize: 25, p: 1, textTransform: 'none', pl: 4, pr: 4 }}>
                    Submit
                  </Typography>
                </Button>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} lg={6} data-aos='zoom-in-up'>
            <Grid
              container
              justifyContent='center'
              item
              xs={12}
              lg={12}
              spacing={3}
              sx={{ p: { lg: 0, xs: 3 } }}
            >
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  label='Your email'
                  placeholder=' '
                  variant='standard'
                  type='email'
                  value={initialValue.sender}
                  onChange={(e) => {
                    setInitialValue({ ...initialValue, sender: e.target.value });
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      color: 'white',
                      fontSize: { lg: 25, xs: 20 },
                    },
                    // '& label.Mui-focused': {
                    //   color: 'yellow',
                    // },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: colors.tomato,
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'white',
                    },
                  }}
                  InputLabelProps={{
                    style: { color: colors.tomato, fontSize: sm ? 20 : 25 },
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  label='Subject'
                  placeholder=' '
                  variant='standard'
                  value={initialValue.subject}
                  onChange={(e) => {
                    setInitialValue({ ...initialValue, subject: e.target.value });
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      color: 'white',
                      fontSize: { lg: 25, xs: 20 },
                    },
                    // '& label.Mui-focused': {
                    //   color: 'yellow',
                    // },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: colors.tomato,
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'white',
                    },
                  }}
                  InputLabelProps={{
                    style: { color: colors.tomato, fontSize: sm ? 20 : 25 },
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  label='Message'
                  placeholder=' '
                  variant='standard'
                  multiline
                  rows={4}
                  value={initialValue.message}
                  onChange={(e) => {
                    setInitialValue({ ...initialValue, message: e.target.value });
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      color: 'white',
                      fontSize: { lg: 25, xs: 20 },
                    },
                    // '& label.Mui-focused': {
                    //   color: 'yellow',
                    // },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: colors.tomato,
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'white',
                    },
                  }}
                  InputLabelProps={{
                    style: { color: colors.tomato, fontSize: sm ? 20 : 25 },
                  }}
                />
              </Grid>
              {sm && (
                <Grid container justifyContent='center' alignItems='center' item xs={12} lg={12}>
                  <Button
                    variant='contained'
                    sx={{ backgroundColor: colors.tomato }}
                    onClick={handleSubmit}
                  >
                    <Typography
                      sx={{
                        fontSize: 15,
                        p: 1,
                        textTransform: 'none',
                        pl: 2,
                        pr: 2,
                      }}
                    >
                      Submit
                    </Typography>
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contacts;
