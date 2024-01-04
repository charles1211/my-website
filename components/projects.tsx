import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from '@mui/lab';
import { Box, Button, Chip, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { colors } from '../styles/theme/colors';
import { GoArrowUpRight } from 'react-icons/go';
import Carousel from 'react-multi-carousel';
import { useState } from 'react';

interface ProjectsProps {}

const Projects = ({}: ProjectsProps) => {
  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.down('xl'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const [showMore, setShowMore] = useState(false);

  return (
    <Grid item xs={12}>
      <Grid item xs={12} data-aos='fade-up'>
        <Typography align='center' sx={{ fontSize: { lg: 80, xs: 45 }, fontWeight: 500 }}>
          Projects
        </Typography>
      </Grid>

      <Grid item xs={12} data-aos='fade-up'>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector
                sx={{ height: { lg: 100, xs: 20 }, width: 5, backgroundColor: colors.tomato }}
              />
              <TimelineDot sx={{ width: 20, height: 20, backgroundColor: colors.tomato }} />
            </TimelineSeparator>
            <TimelineContent></TimelineContent>
          </TimelineItem>
        </Timeline>
      </Grid>
      {sm ? (
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={5000}
          centerMode={false}
          className='-z-0'
          containerClass='container-with-dots'
          dotListClass=''
          autoPlay
          draggable
          focusOnSelect={false}
          infinite
          itemClass=''
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 5,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=''
          slidesToSlide={1}
          swipeable
        >
          <Grid container item xs={12} spacing={1} data-aos='fade-up'>
            <Grid item xs={12}>
              <Box sx={{ backgroundColor: 'white', height: 150, width: '100%' }} />
            </Grid>
            <Grid item xs={12}>
              <Chip
                label='HTML'
                sx={{
                  backgroundColor: '#1F2D36',
                  color: 'white',
                  fontSize: 12,
                  m: 1,
                  // p: xl ? 2 : 3,
                  borderRadius: 20,
                  // mt: 3,
                }}
              />
              <Chip
                label='Javascript'
                sx={{
                  backgroundColor: '#1F2D36',
                  color: 'white',
                  fontSize: 12,
                  m: 1,
                  // p: xl ? 2 : 3,
                  borderRadius: 20,
                  // mt: 3,
                }}
              />
              <Chip
                label='CSS'
                sx={{
                  backgroundColor: '#1F2D36',
                  color: 'white',
                  fontSize: 12,
                  m: 1,
                  // p: xl ? 2 : 3,
                  borderRadius: 20,
                  // mt: 3,
                }}
              />

              <Chip
                label='CSS'
                sx={{
                  backgroundColor: '#1F2D36',
                  color: 'white',
                  fontSize: 12,
                  m: 1,
                  // p: xl ? 2 : 3,
                  borderRadius: 20,
                  // mt: 3,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: { xl: 45, lg: 30, fontWeight: 500 } }}>
                Project name
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <Typography color='lightgray' sx={{ fontFamily: 'Roboto Slab light', fontSize: 15 }}>
                {showMore
                  ? ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur amet pariatur
              nulla placeat aliquam perferendis error, maxime provident quidem? Similique officia
              eaque tenetur aliquid tempora, reiciendis aperiam minima, provident commodi suscipit
              neque nostrum omnis deleniti inventore debitis sapiente voluptate! Voluptatum illo
              eveniet autem quos vitae ab ad sapiente qui cum.`
                  : ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur amet pariatur
              nulla placeat aliquam perferendis error, maxime provident quidem? Similique officia
              eaque tenetur aliquid tempora, reiciendis aperiam minima, provident commodi suscipit
              neque nostrum omnis deleniti inventore debitis sapiente voluptate! Voluptatum illo
              eveniet autem quos vitae ab ad sapiente qui cum.`.substring(0, 100)}{' '}
                <Button
                  color='secondary'
                  // variant='outlined'
                  onClick={() => setShowMore(!showMore)}
                  sx={{ fontSize: 12, p: 0.5 }}
                >
                  {showMore ? 'Show less' : 'Show more...'}
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button variant='contained' sx={{ backgroundColor: colors.tomato }}>
                <Typography sx={{ fontSize: 15, textTransform: 'none' }}>View Github</Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button>
                <Typography
                  sx={{
                    fontSize: 15,
                    textTransform: 'none',
                    textDecoration: 'underline',
                    textDecorationColor: colors.tomato,
                    textUnderlineOffset: 10,
                  }}
                >
                  View project
                </Typography>
                <GoArrowUpRight style={{ color: 'white', fontSize: 15 }} />
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={1} data-aos='fade-up'>
            <Grid item xs={12}>
              <Box sx={{ backgroundColor: 'white', height: 150, width: '100%' }} />
            </Grid>
            <Grid item xs={12}>
              <Chip
                label='HTML'
                sx={{
                  backgroundColor: '#1F2D36',
                  color: 'white',
                  fontSize: 12,
                  m: 1,
                  // p: xl ? 2 : 3,
                  borderRadius: 20,
                  // mt: 3,
                }}
              />
              <Chip
                label='Javascript'
                sx={{
                  backgroundColor: '#1F2D36',
                  color: 'white',
                  fontSize: 12,
                  m: 1,
                  // p: xl ? 2 : 3,
                  borderRadius: 20,
                  // mt: 3,
                }}
              />
              <Chip
                label='CSS'
                sx={{
                  backgroundColor: '#1F2D36',
                  color: 'white',
                  fontSize: 12,
                  m: 1,
                  // p: xl ? 2 : 3,
                  borderRadius: 20,
                  // mt: 3,
                }}
              />

              <Chip
                label='CSS'
                sx={{
                  backgroundColor: '#1F2D36',
                  color: 'white',
                  fontSize: 12,
                  m: 1,
                  // p: xl ? 2 : 3,
                  borderRadius: 20,
                  // mt: 3,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: { xl: 45, lg: 30, fontWeight: 500 } }}>
                Project name
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <Typography color='lightgray' sx={{ fontFamily: 'Roboto Slab light', fontSize: 15 }}>
                {showMore
                  ? ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur amet pariatur
              nulla placeat aliquam perferendis error, maxime provident quidem? Similique officia
              eaque tenetur aliquid tempora, reiciendis aperiam minima, provident commodi suscipit
              neque nostrum omnis deleniti inventore debitis sapiente voluptate! Voluptatum illo
              eveniet autem quos vitae ab ad sapiente qui cum.`
                  : ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur amet pariatur
              nulla placeat aliquam perferendis error, maxime provident quidem? Similique officia
              eaque tenetur aliquid tempora, reiciendis aperiam minima, provident commodi suscipit
              neque nostrum omnis deleniti inventore debitis sapiente voluptate! Voluptatum illo
              eveniet autem quos vitae ab ad sapiente qui cum.`.substring(0, 100)}{' '}
                <Button
                  color='secondary'
                  // variant='outlined'
                  onClick={() => setShowMore(!showMore)}
                  sx={{ fontSize: 12, p: 0.5 }}
                >
                  {showMore ? 'Show less' : 'Show more...'}
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button variant='contained' sx={{ backgroundColor: colors.tomato }}>
                <Typography sx={{ fontSize: 15, textTransform: 'none' }}>View Github</Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button>
                <Typography
                  sx={{
                    fontSize: 15,
                    textTransform: 'none',
                    textDecoration: 'underline',
                    textDecorationColor: colors.tomato,
                    textUnderlineOffset: 10,
                  }}
                >
                  View project
                </Typography>
                <GoArrowUpRight style={{ color: 'white', fontSize: 15 }} />
              </Button>
            </Grid>
          </Grid>
        </Carousel>
      ) : (
        <Grid container item xs={12} spacing={10} sx={{ mt: 10 }}>
          <Grid item xs={12} lg={6} data-aos='zoom-in'>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: { xl: 45, lg: 30 } }}>Project name</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Chip
                label='HTML'
                sx={{
                  backgroundColor: '#1F2D36',
                  color: 'white',
                  fontSize: xl ? 15 : 20,
                  mr: 2,
                  p: xl ? 2 : 3,
                  borderRadius: 20,
                  mt: 3,
                }}
              />
              <Chip
                label='Javascript'
                sx={{
                  backgroundColor: '#1F2D36',
                  color: 'white',
                  fontSize: xl ? 15 : 20,
                  mr: 2,
                  p: xl ? 2 : 3,
                  borderRadius: 20,
                  mt: 3,
                }}
              />
              <Chip
                label='CSS'
                sx={{
                  backgroundColor: '#1F2D36',
                  color: 'white',
                  fontSize: xl ? 15 : 20,
                  mr: 2,
                  p: xl ? 2 : 3,
                  borderRadius: 20,
                  mt: 3,
                }}
              />
              <Chip
                label='CSS'
                sx={{
                  backgroundColor: '#1F2D36',
                  color: 'white',
                  fontSize: xl ? 15 : 20,
                  mr: 2,
                  p: xl ? 2 : 3,
                  borderRadius: 20,
                  mt: 3,
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Typography variant='h6' color='lightgray' sx={{ fontFamily: 'Roboto Slab light' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur amet pariatur
                nulla placeat aliquam perferendis error, maxime provident quidem? Similique officia
                eaque tenetur aliquid tempora, reiciendis aperiam minima, provident commodi suscipit
                neque nostrum omnis deleniti inventore debitis sapiente voluptate! Voluptatum illo
                eveniet autem quos vitae ab ad sapiente qui cum.
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex' }}>
              <Button variant='contained' sx={{ backgroundColor: colors.tomato, marginRight: 5 }}>
                <Typography sx={{ fontSize: { xl: 25, lg: 15 }, p: 1, textTransform: 'none' }}>
                  View Github
                </Typography>
              </Button>

              <Button>
                <Typography
                  sx={{
                    p: 1,
                    fontSize: { xl: 25, lg: 15 },
                    textTransform: 'none',
                    textDecoration: 'underline',
                    textDecorationColor: colors.tomato,
                    textUnderlineOffset: 10,
                  }}
                >
                  View project
                </Typography>
                <GoArrowUpRight style={{ color: 'white', fontSize: 30 }} />
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6} data-aos='flip-up'>
            <Box sx={{ backgroundColor: 'gray', height: '100%', width: '100%' }} />
          </Grid>
        </Grid>
      )}
      {/*   <Grid container item xs={12} spacing={10} sx={{ mt: 10 }}>
        <Grid item xs={6} data-aos='flip-up'>
          <Box sx={{ backgroundColor: 'gray', height: '100%', width: '100%' }} />
        </Grid>
        <Grid item xs={6} data-aos='zoom-in'>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: { xl: 45, lg: 30 } }}>Project name</Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Chip
              label='HTML'
              sx={{
                backgroundColor: '#1F2D36',
                color: 'white',
                fontSize: xl ? 15 : 20,
                mr: 2,
                p: xl ? 2 : 3,
                borderRadius: 20,
                mt: 3,
              }}
            />
            <Chip
              label='Javascript'
              sx={{
                backgroundColor: '#1F2D36',
                color: 'white',
                fontSize: xl ? 15 : 20,
                mr: 2,
                p: xl ? 2 : 3,
                borderRadius: 20,
                mt: 3,
              }}
            />
            <Chip
              label='CSS'
              sx={{
                backgroundColor: '#1F2D36',
                color: 'white',
                fontSize: xl ? 15 : 20,
                mr: 2,
                p: xl ? 2 : 3,
                borderRadius: 20,
                mt: 3,
              }}
            />
            <Chip
              label='CSS'
              sx={{
                backgroundColor: '#1F2D36',
                color: 'white',
                fontSize: xl ? 15 : 20,
                mr: 2,
                p: xl ? 2 : 3,
                borderRadius: 20,
                mt: 3,
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 4 }}>
            <Typography variant='h6' color='lightgray' sx={{ fontFamily: 'Roboto Slab light' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur amet pariatur
              nulla placeat aliquam perferendis error, maxime provident quidem? Similique officia
              eaque tenetur aliquid tempora, reiciendis aperiam minima, provident commodi suscipit
              neque nostrum omnis deleniti inventore debitis sapiente voluptate! Voluptatum illo
              eveniet autem quos vitae ab ad sapiente qui cum.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Button variant='contained' sx={{ backgroundColor: colors.tomato, marginRight: 5 }}>
              <Typography sx={{ fontSize: { xl: 25, lg: 15 }, p: 1, textTransform: 'none' }}>
                View Github
              </Typography>
            </Button>

            <Button>
              <Typography
                sx={{
                  p: 1,
                  fontSize: { xl: 25, lg: 15 },
                  textTransform: 'none',
                  textDecoration: 'underline',
                  textDecorationColor: colors.tomato,
                  textUnderlineOffset: 10,
                }}
              >
                View project
              </Typography>
              <GoArrowUpRight style={{ color: 'white', fontSize: 30 }} />
            </Button>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default Projects;
