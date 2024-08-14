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
import React from 'react';
import ProjectsDialog from './projectsDialog';

export interface IData {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  gitLink: string;
  projectLink: string;
  thumbnail: string;
  visibility: string;
  type: string;
  responsibilities: string[];
}

interface ProjectsProps {}

const Projects = ({}: ProjectsProps) => {
  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.down('xl'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDialog, setOpenDialog] = useState(false);

  const [showMore, setShowMore] = useState(false);

  const [selectedProj, setSelectedProj] = useState<IData>();

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  const data = [
    {
      id: 1,
      name: 'The little lemon restaurant',
      description: `My capstone project, undertaken as part of the Front-End Developer Meta Course, is centered on front-end development. The project exemplifies a restaurant interface, specifically The Little Lemon Restaurant, showcasing functionalities such as table reservations and menu exploration.`,
      techStack: ['react', 'css', 'node.js', 'chakra-ui', 'javascript'],
      gitLink: 'https://github.com/charles1211/metaCapstone-Little-Lemon-Restaurant',
      projectLink: 'https://meta-capstone-little-lemon-restaurant.vercel.app/',
      thumbnail: '/images/littleLemonRestaurantThumbnail.png',
      visibility: 'public',
      type: '',
      responsibilities: [],
    },
    {
      id: 2,
      name: 'Moshify',
      description: `'The Ultimate HTML5 & CSS3 Series' course led by Mosh Hamedani at CodeWithMosh. This website serves as a demonstration of a Cloud Hosting Platform.`,
      techStack: ['css', 'html'],
      gitLink: 'https://github.com/charles1211/chawify',
      projectLink: 'https://chawify.vercel.app/',
      thumbnail: '/images/chawify.png',
      visibility: 'public',
      type: '',
      responsibilities: [],
    },
    {
      id: 3,
      name: 'Game-Hub',
      description: `This is a responsive website built using React 18 course by Code with Mosh.`,
      techStack: ['react', 'typescript', 'axios', 'zustand', 'chakra-ui'],
      gitLink: 'https://github.com/charles1211/game-hub',
      projectLink: 'https://charles-game-hub.vercel.app/',
      thumbnail: '/images/gamehub.png',
      visibility: 'public',
      type: '',
      responsibilities: [],
    },
    {
      id: 4,
      name: 'My Portfolio',
      description: `Welcome to my simple portfolio, where I showcase my expertise as a seasoned web developer with a diverse skill set. I have a proven track record of delivering high-quality projects across various technology stacks.`,
      techStack: ['react', 'typescript', 'material-ui', 'next.js 12'],
      gitLink: 'https://github.com/charles1211/my-website',
      projectLink: 'https://charlescabarrus.vercel.app/',
      thumbnail: '/images/portfolio.png',
      visibility: 'public',
      type: '',
      responsibilities: [],
    },
    {
      id: 5,
      name: 'Smart Bulletin Board',
      description: `Utilize a Smart TV-powered Bulletin Board to facilitate access to diverse announcements, school maps, and the enrollment process within the school campus.`,
      techStack: ['react', 'typescript', 'material-ui', 'next.js 13'],
      gitLink: '',
      projectLink: '',
      thumbnail: '/images/sbb.png',
      visibility: 'public',
      type: 'Freelance Project',
      responsibilities: ['Build the front-end design.', 'Build logical functionalities'],
    },
    {
      id: 6,
      name: 'Quiz App',
      description: `Quiz app designed to challenge your knowledge and critical thinking skills, offering a variety of question types across multiple difficulty levels. Track your accuracy, speed, and performance as you compete to achieve high scores and improve your understanding in various subjects.`,
      techStack: ['react', 'typescript', 'material-ui', 'Vite', 'firabase'],
      gitLink: 'https://github.com/charles1211/quizApp.git',
      projectLink: 'https://quiz-app-af205.web.app/',
      thumbnail: '/images/quizApp.png',
      visibility: 'public',
      type: '',
      responsibilities: ['Build the front-end design.', 'Build logical functionalities'],
    },
  ];

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
          {data.map((x) => (
            <Grid container item xs={12} spacing={1} data-aos='fade-up' key={x.id}>
              <Grid item xs={12}>
                <Box
                  component='img'
                  src={x.thumbnail}
                  alt='project thumbnail'
                  sx={{ backgroundColor: 'white', height: 150, width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                {x.techStack.map((item, i) => (
                  <Chip
                    key={i}
                    label={item}
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
                ))}
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: { xl: 45, lg: 30, fontWeight: 500 } }}>
                  {x.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mb: 1 }}>
                <Typography
                  color='lightgray'
                  sx={{ fontFamily: 'Roboto Slab light', fontSize: 15 }}
                >
                  {showMore ? x.description : x.description.substring(0, 100)}{' '}
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

              {x.visibility !== 'private' ? (
                <>
                  <Grid item xs={6}>
                    <Button
                      variant='contained'
                      sx={{ backgroundColor: colors.tomato, marginRight: 5 }}
                      onClick={() => {
                        window.open(x.gitLink);
                      }}
                    >
                      <Typography
                        sx={{ fontSize: { xl: 25, lg: 15 }, p: 1, textTransform: 'none' }}
                      >
                        View Github
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      onClick={() => {
                        window.open(x.projectLink);
                      }}
                    >
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
                </>
              ) : (
                <Grid item xs={6}>
                  <Button
                    onClick={() => {
                      setOpenDialog(true);
                      setSelectedProj(x);
                    }}
                  >
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
                      More Info
                    </Typography>
                  </Button>
                </Grid>
              )}
            </Grid>
          ))}
        </Carousel>
      ) : (
        <Grid container item xs={12} spacing={10} sx={{ mt: 10 }}>
          {data.map((x) => (
            <React.Fragment key={x.id}>
              {x.id % 2 !== 0 ? (
                <>
                  <Grid item xs={12} lg={6} data-aos='zoom-in'>
                    <Grid item xs={12}>
                      <Typography sx={{ fontSize: { xl: 45, lg: 30 } }}>{x.name}</Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ mb: 3 }}>
                      {x.techStack.map((item, i) => (
                        <Chip
                          key={i}
                          label={item}
                          sx={{
                            backgroundColor: '#1F2D36',
                            color: 'white',
                            fontSize: xl ? 10 : 20,
                            mr: 2,
                            p: xl ? 2 : 3,
                            borderRadius: 20,
                            mt: 3,
                          }}
                        />
                      ))}
                    </Grid>

                    <Grid item xs={12} sx={{ mb: 4 }}>
                      <Typography
                        variant='h6'
                        color='lightgray'
                        sx={{ fontFamily: 'Roboto Slab light' }}
                      >
                        {x.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex' }}>
                      {x.visibility !== 'private' ? (
                        <>
                          <Button
                            variant='contained'
                            sx={{ backgroundColor: colors.tomato, marginRight: 5 }}
                            onClick={() => {
                              window.open(x.gitLink);
                            }}
                          >
                            <Typography
                              sx={{ fontSize: { xl: 25, lg: 15 }, p: 1, textTransform: 'none' }}
                            >
                              View Github
                            </Typography>
                          </Button>

                          <Button
                            onClick={() => {
                              window.open(x.projectLink);
                            }}
                          >
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
                        </>
                      ) : (
                        <Button
                          onClick={() => {
                            setOpenDialog(true);
                            setSelectedProj(x);
                          }}
                        >
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
                            More Info
                          </Typography>
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={6} data-aos='flip-up'>
                    <Box
                      component='img'
                      src={x.thumbnail}
                      alt='project thumbnail'
                      sx={{ height: 400, width: '100%', borderRadius: 2 }}
                    />
                  </Grid>
                </>
              ) : (
                <React.Fragment key={x.id}>
                  <Grid item xs={6} data-aos='flip-up'>
                    <Box
                      component='img'
                      src={x.thumbnail}
                      alt='project thumbnail'
                      sx={{ height: 400, width: '100%', borderRadius: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6} data-aos='zoom-in'>
                    <Grid item xs={12}>
                      <Typography sx={{ fontSize: { xl: 45, lg: 30 } }}>{x.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 3 }}>
                      {x.techStack.map((item, i) => (
                        <Chip
                          key={i}
                          label={item}
                          sx={{
                            backgroundColor: '#1F2D36',
                            color: 'white',
                            fontSize: xl ? 10 : 20,
                            mr: 2,
                            p: xl ? 2 : 3,
                            borderRadius: 20,
                            mt: 3,
                          }}
                        />
                      ))}
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 4 }}>
                      <Typography
                        variant='h6'
                        color='lightgray'
                        sx={{ fontFamily: 'Roboto Slab light' }}
                      >
                        {x.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex' }}>
                      {x.visibility !== 'private' ? (
                        <>
                          <Button
                            variant='contained'
                            sx={{ backgroundColor: colors.tomato, marginRight: 5 }}
                            onClick={() => {
                              window.open(x.gitLink);
                            }}
                          >
                            <Typography
                              sx={{ fontSize: { xl: 25, lg: 15 }, p: 1, textTransform: 'none' }}
                            >
                              View Github
                            </Typography>
                          </Button>

                          <Button
                            onClick={() => {
                              window.open(x.projectLink);
                            }}
                          >
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
                        </>
                      ) : (
                        <Button
                          onClick={() => {
                            setOpenDialog(true);
                            setSelectedProj(x);
                          }}
                        >
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
                            More Info
                          </Typography>
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </Grid>
      )}
      {selectedProj && (
        <ProjectsDialog isOpen={openDialog} onClose={handleCloseDialog} data={selectedProj} />
      )}
    </Grid>
  );
};

export default Projects;
