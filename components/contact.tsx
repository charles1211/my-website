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
  },
};

const textFieldSx = (sm: boolean) => ({
  '& .MuiInputBase-root': {
    color: 'white',
    fontSize: { lg: 25, xs: 20 },
    fontWeight: 400,
    transition: 'all 0.3s ease-in-out',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: colors.tomato,
    borderBottomWidth: 3,
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomWidth: 2,
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: colors.tomato,
    borderBottomWidth: 2,
  },
});

const textFieldLabelProps = (sm: boolean) => ({
  style: {
    color: colors.tomato,
    fontSize: sm ? 20 : 25,
    fontWeight: 500,
    letterSpacing: '0.02em',
  },
});

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
      sx={{ mt: { lg: 10, xs: 5 }, mb: { lg: 20, xs: 8 } }}
    >
      <Grid item xs={12} lg={10}>
        <Grid container item xs={12} lg={12}>
          <Grid container item xs={12} lg={12} sx={{ position: 'relative', mb: 4 }}>
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
                    borderRadius: '2px',
                    boxShadow: `0 2px 8px ${colors.borderHover}`,
                  }}
                />
              </span>
            </Grid>
            <Grid item xs={12} lg={10}>
              <Typography
                sx={{
                  fontSize: 40,
                  textAlign: { lg: 'start', xs: 'center' },
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  opacity: 0.9,
                }}
              >
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
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  textShadow: '0 4px 20px rgba(252, 163, 17, 0.2)',
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
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  mb: 4,
                  textShadow: '0 4px 20px rgba(252, 163, 17, 0.2)',
                }}
              >
                {` Let's talk!`}
              </Typography>
            </Grid>
            {!sm && (
              <Grid container alignItems='center' item xs={12} lg={12}>
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: colors.tomato,
                    borderRadius: '14px',
                    px: 6,
                    py: 2,
                    boxShadow: `0 8px 24px ${colors.borderHover}`,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: colors.orange,
                      transform: 'translateY(-4px)',
                      boxShadow: `0 12px 32px ${colors.borderHover}`,
                    },
                    '&:active': {
                      transform: 'translateY(-2px)',
                    },
                  }}
                  onClick={handleSubmit}
                >
                  <Typography
                    sx={{
                      fontSize: 25,
                      p: 1,
                      textTransform: 'none',
                      pl: 4,
                      pr: 4,
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                    }}
                  >
                    Submit
                  </Typography>
                </Button>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} lg={6} data-aos='zoom-in-up'>
            <Box
              sx={{
                p: { lg: 4, xs: 3 },
                borderRadius: '20px',
                backgroundColor: colors.surface,
                border: `1px solid ${colors.glow}`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Grid
                container
                justifyContent='center'
                item
                xs={12}
                lg={12}
                spacing={3}
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
                    sx={textFieldSx(sm)}
                    InputLabelProps={textFieldLabelProps(sm)}
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
                    sx={textFieldSx(sm)}
                    InputLabelProps={textFieldLabelProps(sm)}
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
                    sx={textFieldSx(sm)}
                    InputLabelProps={textFieldLabelProps(sm)}
                  />
                </Grid>
                {sm && (
                  <Grid container justifyContent='center' alignItems='center' item xs={12} lg={12}>
                    <Button
                      variant='contained'
                      sx={{
                        backgroundColor: colors.tomato,
                        borderRadius: '14px',
                        px: 4,
                        py: 1.5,
                        boxShadow: `0 8px 24px ${colors.borderHover}`,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          backgroundColor: colors.orange,
                          transform: 'translateY(-4px)',
                          boxShadow: `0 12px 32px ${colors.borderHover}`,
                        },
                      }}
                      onClick={handleSubmit}
                    >
                      <Typography
                        sx={{
                          fontSize: 15,
                          p: 1,
                          textTransform: 'none',
                          pl: 2,
                          pr: 2,
                          fontWeight: 600,
                          letterSpacing: '0.02em',
                        }}
                      >
                        Submit
                      </Typography>
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contacts;
