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

const chipSx = (xl: boolean) => ({
  backgroundColor: colors.surfaceLight,
  color: 'white',
  fontSize: xl ? 12 : 16,
  fontWeight: 500,
  px: 2,
  py: xl ? 2.5 : 3,
  borderRadius: '12px',
  border: `1px solid ${colors.glow}`,
  letterSpacing: '0.03em',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: colors.tomato,
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${colors.borderHover}`,
  },
});

const viewGithubBtnSx = {
  backgroundColor: colors.tomato,
  marginRight: 5,
  borderRadius: '12px',
  px: 3,
  py: 1.5,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: `0 4px 12px ${colors.glow}`,
  '&:hover': {
    backgroundColor: colors.orange,
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 20px ${colors.borderHover}`,
  },
};

const viewProjectBtnSx = {
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateX(4px)',
  },
};

const viewProjectTextSx = {
  p: 1,
  fontSize: { xl: 25, lg: 15 },
  textTransform: 'none',
  textDecoration: 'underline',
  textDecorationColor: colors.tomato,
  textUnderlineOffset: 10,
  textDecorationThickness: '2px',
  fontWeight: 500,
};

const thumbnailSx = {
  height: 400,
  width: '100%',
  borderRadius: '16px',
  objectFit: 'cover',
  border: `1px solid ${colors.glow}`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: `0 12px 32px ${colors.glow}`,
  },
};

const Projects = ({}: ProjectsProps) => {
  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.down('xl'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDialog, setOpenDialog] = useState(false);

  const [showMore, setShowMore] = useState<{ [key: number]: boolean }>({});

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

  const renderActionButtons = (x: IData) => {
    if (x.visibility !== 'private') {
      return (
        <>
          {/* <Button
            variant='contained'
            sx={viewGithubBtnSx}
            onClick={() => {
              window.open(x.gitLink);
            }}
          >
            <Typography
              sx={{ fontSize: { xl: 25, lg: 15 }, p: 1, textTransform: 'none', fontWeight: 500 }}
            >
              View Github
            </Typography>
          </Button> */}

          <Button
            onClick={() => {
              window.open(x.projectLink);
            }}
            sx={viewProjectBtnSx}
          >
            <Typography sx={viewProjectTextSx}>View project</Typography>
            <GoArrowUpRight style={{ color: 'white', fontSize: 30 }} />
          </Button>
        </>
      );
    }
    return (
      <Button
        onClick={() => {
          setOpenDialog(true);
          setSelectedProj(x);
        }}
        sx={viewProjectBtnSx}
      >
        <Typography sx={viewProjectTextSx}>More Info</Typography>
      </Button>
    );
  };

  const renderProjectContent = (x: IData) => (
    <Box
      sx={{
        p: 4,
        borderRadius: '20px',
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px ${colors.border}`,
          borderColor: colors.borderHover,
        },
      }}
    >
      <Typography
        sx={{ fontSize: { xl: 45, lg: 30 }, fontWeight: 600, mb: 2, letterSpacing: '-0.01em' }}
      >
        {x.name}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 3 }}>
        {x.techStack.map((item, i) => (
          <Chip key={i} label={item} sx={chipSx(xl)} />
        ))}
      </Box>

      <Typography
        variant='h6'
        sx={{
          fontFamily: 'Roboto Slab light',
          mb: 4,
          lineHeight: 1.7,
          color: colors.textSecondary,
          fontSize: { lg: '1.1rem', xl: '1.2rem' },
          flexGrow: 1,
        }}
      >
        {x.description}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>{renderActionButtons(x)}</Box>
    </Box>
  );

  return (
    <Grid item xs={12}>
      <Grid item xs={12} data-aos='fade-up'>
        <Typography
          align='center'
          sx={{ fontSize: { lg: 80, xs: 45 }, fontWeight: 600, letterSpacing: '-0.02em', mb: 2 }}
        >
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
            <Box
              key={x.id}
              data-aos='fade-up'
              sx={{
                p: 2.5,
                mx: 1,
                borderRadius: '16px',
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
              }}
            >
              <Box
                component='img'
                src={x.thumbnail}
                alt='project thumbnail'
                sx={{
                  backgroundColor: 'white',
                  height: 150,
                  width: '100%',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: `1px solid ${colors.glow}`,
                }}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
                {x.techStack.map((item, i) => (
                  <Chip
                    key={i}
                    label={item}
                    sx={{
                      backgroundColor: colors.surfaceLight,
                      color: 'white',
                      fontSize: 11,
                      fontWeight: 500,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '8px',
                      border: `1px solid ${colors.glow}`,
                    }}
                  />
                ))}
              </Box>
              <Typography sx={{ fontSize: 24, fontWeight: 600, mb: 1 }}>{x.name}</Typography>
              <Typography
                sx={{ fontFamily: 'Roboto Slab light', fontSize: 15, lineHeight: 1.6, color: colors.textSecondary, mb: 2 }}
              >
                {showMore[x.id] ? x.description : x.description.substring(0, 100)}{' '}
                <Button
                  color='secondary'
                  onClick={() => setShowMore({ ...showMore, [x.id]: !showMore[x.id] })}
                  sx={{
                    fontSize: 12,
                    p: 0.5,
                    textTransform: 'none',
                    textDecoration: 'underline',
                    textUnderlineOffset: 4,
                  }}
                >
                  {showMore[x.id] ? 'Show less' : 'Show more...'}
                </Button>
              </Typography>

              <Grid container spacing={1}>
                {x.visibility !== 'private' ? (
                  <>
                    {/* <Grid item xs={6}>
                      <Button
                        variant='contained'
                        fullWidth
                        sx={{
                          backgroundColor: colors.tomato,
                          borderRadius: '10px',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            backgroundColor: colors.orange,
                            transform: 'translateY(-2px)',
                          },
                        }}
                        onClick={() => {
                          window.open(x.gitLink);
                        }}
                      >
                        <Typography sx={{ fontSize: 13, p: 0.5, textTransform: 'none', fontWeight: 500 }}>
                          View Github
                        </Typography>
                      </Button>
                    </Grid> */}
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        onClick={() => {
                          window.open(x.projectLink);
                        }}
                      >
                        <Typography
                          sx={{
                            p: 0.5,
                            fontSize: 13,
                            textTransform: 'none',
                            textDecoration: 'underline',
                            textDecorationColor: colors.tomato,
                            textUnderlineOffset: 6,
                            fontWeight: 500,
                          }}
                        >
                          View project
                        </Typography>
                        <GoArrowUpRight style={{ color: 'white', fontSize: 20 }} />
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
                          p: 0.5,
                          fontSize: 13,
                          textTransform: 'none',
                          textDecoration: 'underline',
                          textDecorationColor: colors.tomato,
                          textUnderlineOffset: 6,
                          fontWeight: 500,
                        }}
                      >
                        More Info
                      </Typography>
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          ))}
        </Carousel>
      ) : (
        <Grid container item xs={12} spacing={10} sx={{ mt: 10 }}>
          {data.map((x) => (
            <React.Fragment key={x.id}>
              {x.id % 2 !== 0 ? (
                <>
                  <Grid item xs={12} lg={6} data-aos='zoom-in'>
                    {renderProjectContent(x)}
                  </Grid>
                  <Grid item xs={6} data-aos='flip-up'>
                    <Box component='img' src={x.thumbnail} alt='project thumbnail' sx={thumbnailSx} />
                  </Grid>
                </>
              ) : (
                <React.Fragment key={x.id}>
                  <Grid item xs={6} data-aos='flip-up'>
                    <Box component='img' src={x.thumbnail} alt='project thumbnail' sx={thumbnailSx} />
                  </Grid>
                  <Grid item xs={12} lg={6} data-aos='zoom-in'>
                    {renderProjectContent(x)}
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
