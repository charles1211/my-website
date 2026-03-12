import { Box, Button, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsDownload, BsCheck2 } from 'react-icons/bs';
import {
  SiTypescript, SiJavascript, SiNodedotjs, SiReact, SiNextdotjs,
  SiCss3, SiHtml5, SiPostgresql, SiMysql, SiSupabase, SiPrisma,
  SiTailwindcss, SiGit, SiMicrosoftazure,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  charContainer, charItem, charContainerReduced, charItemReduced,
  fadeUp, safeFadeUp, staggerContainer,
} from '../lib/motionVariants';
import { use3DTilt } from '../hooks/use3DTilt';
import AboutMe from '../components/aboutMe';
import Projects from '../components/projects';
import { colors } from '../styles/theme/colors';
import Footer from '../components/footer';
import Contacts from '../components/contact';
import ScrollToTopButton from '../common/scrollToTopButton';

const roles = ['Full-Stack Developer', 'Frontend Developer', 'Backend Developer', 'Problem Solver'];

const Home: NextPage = () => {
  const router = useRouter();

  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.down('xl'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const shouldReduce = useReducedMotion();

  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [dlState, setDlState] = useState<'idle' | 'loading' | 'done'>('idle');

  useEffect(() => {
    const t = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const role = roles[roleIndex];
    if (!isDeleting && displayText === role) {
      const t = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
      return;
    }
    const speed = isDeleting ? 45 : 90;
    const t = setTimeout(() => {
      setDisplayText(
        isDeleting ? role.slice(0, displayText.length - 1) : role.slice(0, displayText.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [displayText, isDeleting, roleIndex]);

  const handleDownload = () => {
    if (dlState !== 'idle') return;
    setDlState('loading');
    const fileUrl = '/CharlesRhobertCabarrusCV.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'CharlesRhobertCabarrusCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      setDlState('done');
      setTimeout(() => setDlState('idle'), 1800);
    }, 800);
  };

  const isDone = dlState === 'done';
  const isLoading = dlState === 'loading';
  const btnColor = isDone ? '#4caf50' : colors.tomato;
  const btnColorHover = isDone ? '#66bb6a' : colors.orange;

  const resumeButton = (
    <Button
      size='large'
      variant='contained'
      color='primary'
      onClick={handleDownload}
      disabled={isLoading}
      sx={{
        mt: { lg: 2, xs: 0 },
        position: 'relative',
        overflow: 'hidden',
        border: `2px solid ${btnColor}`,
        borderRadius: '14px',
        px: { lg: 4, xs: 3 },
        py: { lg: 1.5, xs: 1 },
        background: isDone ? 'rgba(76,175,80,0.1)' : 'rgba(255,113,91,0.08)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '@keyframes shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        '@keyframes borderGlow': {
          '0%,100%': { boxShadow: `0 4px 15px ${colors.glow}` },
          '50%': { boxShadow: `0 4px 32px rgba(255,113,91,0.55), 0 0 0 3px ${colors.glow}` },
        },
        '@keyframes bounce': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(5px)' },
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
          transform: 'translateX(-100%)',
          transition: 'none',
          pointerEvents: 'none',
        },
        '&:hover::after': {
          animation: 'shimmer 0.55s ease forwards',
        },
        animation: dlState === 'idle' ? 'borderGlow 3s ease-in-out infinite' : 'none',
        '&:hover': {
          borderColor: btnColorHover,
          background: isDone ? 'rgba(76,175,80,0.18)' : 'rgba(255,113,91,0.18)',
          transform: 'translateY(-5px)',
          boxShadow: `0 16px 32px ${colors.glow}`,
          animation: 'none',
        },
        '&:active': { transform: 'translateY(-2px)' },
        '&.Mui-disabled': {
          border: `2px solid ${colors.tomato}`,
          opacity: 0.8,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { lg: 1.5, xs: 1 } }}>
        <Typography
          sx={{
            fontSize: { lg: 22, xs: 15 },
            p: { lg: 0.5, xs: 0 },
            textTransform: 'none',
            fontWeight: 600,
            letterSpacing: '0.02em',
            color: isDone ? '#4caf50' : 'inherit',
            transition: 'color 0.3s ease',
          }}
        >
          {isLoading ? 'Downloading…' : isDone ? 'Downloaded!' : 'My Resume'}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: isDone ? '#4caf50' : 'inherit',
            transition: 'color 0.3s ease',
            animation: isLoading ? 'bounce 0.55s ease-in-out infinite' : 'none',
          }}
        >
          {isDone
            ? <BsCheck2 style={{ fontSize: sm ? 18 : 24 }} />
            : <BsDownload style={{ fontSize: sm ? 15 : 22 }} />}
        </Box>
      </Box>
    </Button>
  );

  return (
    <>
      {/* Hero Section */}
      <Grid
        container
        justifyContent='center'
        item
        xs={12}
        sx={{ padding: { xl: 3, xs: 3 }, mt: { lg: 20, xs: 10 }, position: 'relative' }}
        id='home-section'
      >
        {/* Breathing dot-grid — scoped to hero section */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(255,113,91,0.35) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            animation: 'breathe 4s ease-in-out infinite',
            opacity: 0.06,
          }}
        />

        <Grid item xs={12} lg={10}>
          <Grid container alignItems='center' item xs={12} lg={12}>
            <Grid
              item
              container
              justifyContent='center'
              xs={12}
              lg={6}
              data-aos={sm ? '' : 'fade-left'}
            >
              <Grid item xs={12} lg={12}>
                {/* Animated "Hello." heading */}
                <motion.div
                  variants={shouldReduce ? charContainerReduced : charContainer}
                  initial="hidden"
                  animate="show"
                  style={{ display: 'flex', flexWrap: 'wrap', justifyContent: isMdUp ? 'flex-start' : 'center' }}
                >
                  {'Hello.'.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      variants={shouldReduce ? charItemReduced : charItem}
                      style={{
                        fontWeight: 700,
                        fontSize: 'clamp(40px, 8vw, 75px)',
                        letterSpacing: '-0.03em',
                        display: 'inline-block',
                        color: char === '.' ? '#FF715B' : 'inherit',
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              </Grid>
              <Grid container item xs={12} lg={12} sx={{ position: 'relative' }}>
                <motion.div
                  variants={safeFadeUp(0.5, shouldReduce ?? false)}
                  initial="hidden"
                  animate="show"
                  style={{ position: 'relative', width: '100%' }}
                >
                  <Grid item xs={12} lg={2}>
                    <span>
                      <Divider
                        sx={{
                          position: 'absolute',
                          height: 5,
                          width: { lg: 300, xs: 100 },
                          backgroundColor: colors.tomato,
                          bottom: { lg: 25, xs: -4 },
                          right: 0,
                          ml: { lg: 0, xs: 'auto' },
                          mr: { lg: 0, xs: 'auto' },
                          left: { xl: -200, lg: -240, xs: 0 },
                          borderRadius: '2px',
                          boxShadow: `0 2px 8px ${colors.glow}`,
                        }}
                      />
                    </span>
                  </Grid>
                  <Grid item xs={12} lg={10}>
                    <Typography
                      sx={{
                        fontWeight: 300,
                        fontSize: { lg: 60, xs: 30 },
                        textAlign: { xs: 'center', lg: 'start' },
                        letterSpacing: '-0.01em',
                      }}
                    >{`I'm Charles`}</Typography>
                  </Grid>
                </motion.div>
              </Grid>
              <Grid item xs={12} lg={12}>
                <motion.div
                  variants={safeFadeUp(0.7, shouldReduce ?? false)}
                  initial="hidden"
                  animate="show"
                >
                  <Typography
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: colors.orange,
                      fontSize: { lg: 75, xs: 30 },
                      textAlign: { xs: 'center', lg: 'start' },
                      mt: { lg: 0, xs: 3 },
                      letterSpacing: '-0.02em',
                      textShadow: '0 4px 20px rgba(252, 163, 17, 0.15)',
                      minHeight: { lg: '92px', xs: '44px' },
                    }}
                  >
                    {displayText}
                    <span
                      style={{
                        display: 'inline-block',
                        width: '3px',
                        height: '0.8em',
                        backgroundColor: colors.orange,
                        marginLeft: '4px',
                        verticalAlign: 'middle',
                        borderRadius: '2px',
                        opacity: showCursor ? 1 : 0,
                        transition: 'opacity 0.08s',
                      }}
                    />
                  </Typography>
                </motion.div>
              </Grid>
              <Grid item xs={12} lg={12}>
                <motion.div
                  variants={safeFadeUp(0.9, shouldReduce ?? false)}
                  initial="hidden"
                  animate="show"
                >
                  <Typography
                    sx={{
                      color: colors.textSecondary,
                      fontSize: { lg: 20, xs: 16 },
                      textAlign: { xs: 'center', lg: 'start' },
                      mb: { lg: 2, xs: 1 },
                      fontFamily: 'Roboto Slab',
                      fontWeight: 300,
                      lineHeight: 1.6,
                    }}
                  >
                    Building intuitive, scalable, and impactful digital experiences.
                  </Typography>
                </motion.div>
              </Grid>
              {!sm && (
                <Grid
                  container
                  alignItems='center'
                  justifyContent='start'
                  item
                  xs={12}
                  lg={12}
                >
                  <motion.div
                    variants={safeFadeUp(1.1, shouldReduce ?? false)}
                    initial="hidden"
                    animate="show"
                    style={{ display: 'flex', justifyContent: 'flex-start' }}
                  >
                    {resumeButton}
                  </motion.div>
                </Grid>
              )}
            </Grid>
            <Grid
              item
              container
              justifyContent='center'
              xs={12}
              lg={6}
              data-aos={sm ? '' : 'fade-right'}
            >
              <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: { lg: 0, xs: 4 } }}>

                {/* Rotating glow blob behind image */}
                <motion.div
                  aria-hidden="true"
                  animate={shouldReduce ? {} : { rotate: 360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    width: '115%',
                    height: '115%',
                    borderRadius: '30% 70% 58% 42% / 30% 25% 75% 70%',
                    background: 'conic-gradient(from 0deg, rgba(255,113,91,0.33), rgba(138,92,255,0.33), rgba(0,255,209,0.21), rgba(255,113,91,0.33))',
                    filter: 'blur(22px)',
                    zIndex: 0,
                  }}
                />

                {/* Dashed orbit ring */}
                <motion.div
                  aria-hidden="true"
                  animate={shouldReduce ? {} : { rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    width: 465,
                    height: 465,
                    borderRadius: '50%',
                    border: '1.5px dashed rgba(255,113,91,0.27)',
                    zIndex: 0,
                  }}
                />

                {/* Orbiting tech icons — desktop only */}
                {!shouldReduce && orbitIcons.map(({ Icon, color, radius, duration, initialAngle }, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: { xs: 'none', lg: 'block' },
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 0,
                      height: 0,
                      zIndex: 3,
                    }}
                  >
                    {/* Outer ring rotates — initial angle sets starting position, target is +360 for full orbit */}
                    <motion.div
                      initial={{ rotate: initialAngle }}
                      animate={{ rotate: initialAngle + 360 }}
                      transition={{ duration, repeat: Infinity, ease: 'linear' }}
                      style={{ position: 'absolute', width: 0, height: 0 }}
                    >
                      {/* Counter-rotate icon to keep it upright */}
                      <motion.div
                        initial={{ rotate: -initialAngle }}
                        animate={{ rotate: -(initialAngle + 360) }}
                        transition={{ duration, repeat: Infinity, ease: 'linear' }}
                        style={{
                          position: 'absolute',
                          left: radius,
                          top: -20,
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: 'rgba(10,16,30,0.85)',
                          border: `1px solid ${color}55`,
                          backdropFilter: 'blur(8px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 4px 20px ${color}30`,
                        }}
                      >
                        <Icon style={{ fontSize: 18, color }} />
                      </motion.div>
                    </motion.div>
                  </Box>
                ))}

                {/* Profile image */}
                <motion.img
                  src='./images/charles.jpg'
                  alt='Charles Cabarrus - Full-Stack Developer'
                  animate={shouldReduce ? {} : { y: [0, -18, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ filter: 'grayscale(0%)', boxShadow: '0 0 130px rgba(255,113,91,0.5)' }}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    borderRadius: '30% 70% 58% 42% / 30% 25% 75% 70%',
                    width: 400,
                    height: 400,
                    objectFit: 'cover',
                    border: '5px solid #FF715B',
                    filter: 'grayscale(25%)',
                    boxShadow: '0 0 80px rgba(255,113,91,0.2)',
                    transition: 'filter 0.6s ease, box-shadow 0.6s ease',
                    maxWidth: '100%',
                  }}
                />
              </Box>
            </Grid>
            {sm && (
              <Grid
                container
                alignItems='center'
                justifyContent='center'
                item
                xs={12}
                lg={12}
                sx={{ mt: 5, mb: 3 }}
              >
                {resumeButton}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <ScrollIndicator />

      {/* Section separator */}
      <Box
        sx={{
          width: '100%',
          height: 60,
          clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 100%)',
          background: 'linear-gradient(135deg, rgba(255,113,91,0.06), transparent)',
          mt: -1,
        }}
      />

      {/* Tech Stack Section */}
      <Box sx={{ py: { lg: 10, xs: 6 }, px: { lg: 20, xs: 3 } }}>
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Typography
            align="center"
            sx={{ fontSize: { lg: 60, xs: 36 }, fontWeight: 700, letterSpacing: '-0.02em', mb: 6 }}
          >
            Tech Stack
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                lg: 'repeat(7, auto)',
                md: 'repeat(4, auto)',
                xs: 'repeat(3, auto)',
              },
              justifyContent: 'center',
              gap: { lg: 2.5, xs: 1.5 },
            }}
          >
            {techStack.map((item) => (
              <SkillCard key={item.label} {...item} />
            ))}
          </Box>
        </motion.div>
      </Box>

      {/* About Section */}
      <Grid container justifyContent='center' item xs={12}>
        <Grid item xs={10} sx={{ mt: { lg: 20, xs: 8 } }} id='about-section'>
          <AboutMe />
        </Grid>
      </Grid>

      {/* Projects Section */}
      <Grid item xs={12} sx={{ p: { lg: 20, xs: 5 }, mt: { lg: 0, xs: 10 } }} id='project-section'>
        <Projects />
      </Grid>

      {/* Contact Section */}
      <Grid item xs={12} id='contact-section'>
        <Contacts />
      </Grid>

      {/* Footer */}
      <Grid item xs={12}>
        <Footer />
      </Grid>

      <ScrollToTopButton />
    </>
  );
};

export default Home;

// ─── Sub-components (defined after Home to use hoisting-safe placement) ───────

const ScrollIndicator = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      style={{ opacity, display: 'flex', justifyContent: 'center', paddingTop: 16, paddingBottom: 8 }}
    >
      <motion.div
        animate={shouldReduce ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        style={{ color: 'rgba(255,255,255,0.4)', fontSize: 28, lineHeight: 1 }}
      >
        ∨
      </motion.div>
    </motion.div>
  );
};

const orbitIcons = [
  { Icon: SiReact,      color: '#61DAFB', radius: 130, duration: 12, initialAngle: 0   },
  { Icon: SiTypescript, color: '#3178C6', radius: 180, duration: 16, initialAngle: 60  },
  { Icon: SiNodedotjs,  color: '#339933', radius: 240, duration: 20, initialAngle: 120 },
  { Icon: SiNextdotjs,  color: '#ffffff', radius: 160, duration: 14, initialAngle: 180 },
  { Icon: SiCss3,       color: '#1572B6', radius: 200, duration: 18, initialAngle: 240 },
  { Icon: SiHtml5,      color: '#E34F26', radius: 220, duration: 22, initialAngle: 300 },
];

const techStack: Array<{ label: string; Icon: IconType; color: string }> = [
  { label: 'TypeScript',   Icon: SiTypescript,     color: '#3178C6' },
  { label: 'JavaScript',   Icon: SiJavascript,     color: '#F7DF1E' },
  { label: 'React',        Icon: SiReact,          color: '#61DAFB' },
  { label: 'Next.js',      Icon: SiNextdotjs,      color: '#ffffff' },
  { label: 'Node.js',      Icon: SiNodedotjs,      color: '#339933' },
  { label: 'CSS',          Icon: SiCss3,           color: '#1572B6' },
  { label: 'HTML',         Icon: SiHtml5,          color: '#E34F26' },
  { label: 'PostgreSQL',   Icon: SiPostgresql,     color: '#336791' },
  { label: 'MySQL',        Icon: SiMysql,          color: '#4479A1' },
  { label: 'Supabase',     Icon: SiSupabase,       color: '#3ECF8E' },
  { label: 'Prisma',       Icon: SiPrisma,         color: '#2D3748' },
  { label: 'Tailwind CSS', Icon: SiTailwindcss,    color: '#06B6D4' },
  { label: 'Git',          Icon: SiGit,            color: '#F05032' },
  { label: 'Azure',        Icon: SiMicrosoftazure, color: '#0078D4' },
];

interface SkillCardProps { label: string; Icon: IconType; color: string; }

const SkillCard = ({ label, Icon, color }: SkillCardProps) => {
  const { ref, rotateXSpring, rotateYSpring, onMouseMove, onMouseLeave } = use3DTilt(15);
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: rotateXSpring, rotateY: rotateYSpring, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -10, scale: 1.05 }}
      variants={{ hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.4 } } }}
    >
      <Box
        sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 1, p: 2,
          borderRadius: '16px',
          background: 'rgba(255,113,91,0.04)',
          border: '1px solid rgba(255,113,91,0.12)',
          width: { lg: 90, xs: 70 }, height: { lg: 90, xs: 70 },
          transition: 'border-color 0.3s, box-shadow 0.3s',
          '&:hover': { borderColor: color, boxShadow: `0 8px 24px ${color}30` },
        }}
      >
        <Icon style={{ fontSize: 36, color }} />
        <Typography sx={{ fontSize: 11, color: '#A0AEC0', fontWeight: 500, textAlign: 'center', lineHeight: 1.2 }}>
          {label}
        </Typography>
      </Box>
    </motion.div>
  );
};
