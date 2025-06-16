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

interface AboutMeProps {}

const AboutMe = ({}: AboutMeProps) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container item xs={12} lg={12}>
      {!sm && (
        <Grid item xs={6} lg={6} data-aos='fade-left'>
          <Grid container alignItems='center' item xs={12} lg={12} sx={{ mb: -5 }}>
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
              <CgWebsite style={{ fontSize: 80 }} />
            </Grid>
            <Grid item xs={8} lg={8}>
              <Typography variant='h5'>Website Development</Typography>
            </Grid>
          </Grid>

          <Grid container alignItems='center' item xs={12} lg={12}>
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
              <CgWebsite style={{ fontSize: 80 }} />
            </Grid>
            <Grid item xs={8} lg={8}>
              <Typography variant='h5'>App Development</Typography>
            </Grid>
          </Grid>
          <Grid container alignItems='center' item xs={12} lg={12} sx={{ mt: -5 }}>
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
              <CgWebsite style={{ fontSize: 80 }} />
            </Grid>
            <Grid item xs={8} lg={8}>
              <Typography variant='h5'>Website Hosting</Typography>
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
            }}
          >
            About me
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Typography
            variant='h6'
            color='lightgray'
            lineHeight={2}
            sx={{
              mb: 5,
              fontFamily: 'Roboto Slab light',
              textAlign: { lg: 'start', xs: 'center' },
            }}
          >
            {`Hi! I'm a passionate and joyful full-stack developer with a love for building intuitive,
            scalable, and impactful digital experiences. With a strong command of both front-end and
            back-end development, I bring a dedicated mindset and positive energy to every project I
            work on. I believe that great software is built not just with code—but with curiosity,
            collaboration, and care.`}
          </Typography>
        </Grid>
        <Grid container item xs={12} lg={12}>
          <Grid item xs={4} lg={4}>
            <Grid item xs={12} lg={12}>
              <Typography align='center' sx={{ fontWeight: 700, fontSize: { lg: 55, xs: 30 } }}>
                10 <span style={{ color: colors.tomato }}>+</span>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography
                align='center'
                color='lightgray'
                sx={{ fontFamily: 'Roboto Slab light', fontSize: { lg: 20, xs: 15 } }}
              >
                Completed Projects
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Grid item xs={12} lg={12}>
              <Typography align='center' sx={{ fontWeight: 700, fontSize: { lg: 55, xs: 30 } }}>
                95 <span style={{ color: colors.tomato }}>%</span>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography
                align='center'
                color='lightgray'
                sx={{ fontFamily: 'Roboto Slab light', fontSize: { lg: 20, xs: 15 } }}
              >
                Client Satisfaction
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} lg={4}>
            <Grid item xs={12} lg={12}>
              <Typography align='center' sx={{ fontWeight: 700, fontSize: { lg: 55, xs: 30 } }}>
                3 <span style={{ color: colors.tomato }}>+</span>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography
                align='center'
                color='lightgray'
                sx={{ fontFamily: 'Roboto Slab light', fontSize: { lg: 20, xs: 15 } }}
              >
                Years of experience
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutMe;
