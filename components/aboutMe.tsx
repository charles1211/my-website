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
            I have been working at a local financing company as a full-stack developer for almost
            four years. However, I consider front-end development as my primary expertise, as it
            truly excites me to craft and design various websites. I am delighted to have acquired
            extensive knowledge in programming, and I am pleased to express my enthusiasm for the
            continuous learning process in the field of programming.
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
