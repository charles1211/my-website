import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { colors } from '../styles/theme/colors';
import {
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  Timeline,
} from '@mui/lab';
import { CgWebsite } from 'react-icons/cg';

interface AboutMeProps { }

const services = ['Website Development', 'App Development', 'Website Hosting'];

const AboutMe = ({ }: AboutMeProps) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container item xs={12} lg={12}>
      {sm ? (
        <Grid container item xs={12} spacing={2} sx={{ mb: 4 }} data-aos='fade-up'>
          {services.map((service, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 113, 91, 0.08)',
                  border: `1px solid ${colors.glow}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 113, 91, 0.12)',
                    transform: 'translateX(8px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: colors.tomato,
                    flexShrink: 0,
                  }}
                />
                <Typography variant='h6' sx={{ fontWeight: 500 }}>
                  {service}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid item xs={6} lg={6} data-aos='fade-left'>
          <Grid
            container
            alignItems='center'
            item
            xs={12}
            lg={12}
            sx={{
              mb: -5,
              p: 2,
              borderRadius: '12px',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(255, 113, 91, 0.05)',
                transform: 'translateX(12px)',
              },
            }}
          >
            <Grid item xs={2} lg={2}>
              <Timeline>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineConnector
                      sx={{ height: 150, width: 5, backgroundColor: colors.tomato }}
                    />
                    <TimelineDot sx={{ width: 20, height: 20, backgroundColor: colors.tomato }} />
                  </TimelineSeparator>
                  <TimelineContent></TimelineContent>
                </TimelineItem>
              </Timeline>
            </Grid>
            <Grid item xs={2} lg={2}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 113, 91, 0.1)',
                  display: 'inline-flex',
                }}
              >
                <CgWebsite style={{ fontSize: 80 }} />
              </Box>
            </Grid>
            <Grid item xs={8} lg={8}>
              <Typography variant='h5' sx={{ fontWeight: 600, letterSpacing: '0.01em' }}>
                Website Development
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            alignItems='center'
            item
            xs={12}
            lg={12}
            sx={{
              p: 2,
              borderRadius: '12px',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(255, 113, 91, 0.05)',
                transform: 'translateX(12px)',
              },
            }}
          >
            <Grid item xs={2} lg={2}>
              <Timeline>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineConnector
                      sx={{ height: 150, width: 5, backgroundColor: colors.tomato }}
                    />
                    {/* <TimelineDot /> */}
                  </TimelineSeparator>
                  <TimelineContent></TimelineContent>
                </TimelineItem>
              </Timeline>
            </Grid>
            <Grid item xs={2} lg={2}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 113, 91, 0.1)',
                  display: 'inline-flex',
                }}
              >
                <CgWebsite style={{ fontSize: 80 }} />
              </Box>
            </Grid>
            <Grid item xs={8} lg={8}>
              <Typography variant='h5' sx={{ fontWeight: 600, letterSpacing: '0.01em' }}>
                App Development
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems='center'
            item
            xs={12}
            lg={12}
            sx={{
              mt: -5,
              p: 2,
              borderRadius: '12px',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(255, 113, 91, 0.05)',
                transform: 'translateX(12px)',
              },
            }}
          >
            <Grid item xs={2} lg={2}>
              <Timeline>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot sx={{ width: 20, height: 20, backgroundColor: colors.tomato }} />
                    <TimelineConnector
                      sx={{ height: 150, width: 5, backgroundColor: colors.tomato }}
                    />
                  </TimelineSeparator>
                  <TimelineContent></TimelineContent>
                </TimelineItem>
              </Timeline>
            </Grid>
            <Grid item xs={2} lg={2}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 113, 91, 0.1)',
                  display: 'inline-flex',
                }}
              >
                <CgWebsite style={{ fontSize: 80 }} />
              </Box>
            </Grid>
            <Grid item xs={8} lg={8}>
              <Typography variant='h5' sx={{ fontWeight: 600, letterSpacing: '0.01em' }}>
                Website Hosting
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12} lg={6} data-aos='fade-right'>
        <Grid item xs={12} lg={12} sx={{ mb: { lg: 5, xs: 2 } }}>
          <Typography
            sx={{
              fontSize: { lg: 80, xs: 50 },
              fontWeight: 700,
              textAlign: { lg: 'start', xs: 'center' },
              letterSpacing: '-0.03em',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: { lg: -10, xs: -5 },
                left: { lg: 0, xs: '50%' },
                transform: { lg: 'none', xs: 'translateX(-50%)' },
                width: { lg: '40%', xs: '30%' },
                height: '4px',
                backgroundColor: colors.tomato,
                borderRadius: '2px',
              },
            }}
          >
            About me
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Typography
            variant='h6'
            sx={{
              mb: 5,
              fontFamily: 'Roboto Slab light',
              textAlign: { lg: 'start', xs: 'center' },
              color: colors.textSecondary,
              letterSpacing: '0.01em',
              fontSize: { lg: '1.25rem', xs: '1rem' },
              lineHeight: 1.8,
            }}
          >
            {`Hi! I'm a passionate and joyful full-stack developer with a love for building intuitive,
            scalable, and impactful digital experiences. With a strong command of both front-end and
            back-end development, I bring a dedicated mindset and positive energy to every project I
            work on. I believe that great software is built not just with code—but with curiosity,
            collaboration, and care.`}
          </Typography>
        </Grid>
        <Grid container item xs={12} lg={12} spacing={{ xs: 2, lg: 2 }}>
          {[
            { value: '10', symbol: '+', label: 'Completed Projects' },
            { value: '95', symbol: '%', label: 'Client Satisfaction' },
            { value: '3', symbol: '+', label: 'Years of experience' },
          ].map((stat, index) => (
            <Grid item xs={4} lg={4} key={index}>
              <Box
                sx={{
                  p: { lg: 3, xs: 2, },
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 113, 91, 0.05)',
                  border: `1px solid ${colors.glow}`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 113, 91, 0.1)',
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 24px ${colors.glow}`,
                    borderColor: colors.tomato,
                  },
                }}
              >
                <Typography
                  align='center'
                  sx={{
                    fontWeight: 700,
                    fontSize: { lg: 55, xs: 30 },
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value} <span style={{ color: colors.tomato }}>{stat.symbol}</span>
                </Typography>
                <Typography
                  align='center'
                  sx={{
                    fontFamily: 'Roboto Slab light',
                    fontSize: { lg: 20, xs: 13 },
                    mt: 1,
                    color: colors.textSecondary,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutMe;
