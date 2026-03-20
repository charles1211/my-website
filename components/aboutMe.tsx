// components/aboutMe.tsx
import { memo, useEffect, useRef, useState } from 'react';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { CgWebsite } from 'react-icons/cg';
import { MdPhoneAndroid, MdCloud } from 'react-icons/md';
import { colors } from '../styles/theme/colors';
import GhostNumber from './GhostNumber';
import { use3DTilt } from '../hooks/use3DTilt';
import { safeStaggerContainer, safeFadeUp, fadeRight } from '../lib/motionVariants';

// ─── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf); // cleanup prevents memory leak on unmount
  }, [inView, target, duration]);

  return { count, ref };
}

// ─── StatCard ──────────────────────────────────────────────────────────────────
interface StatCardProps { value: number; symbol: string; label: string; }

const StatCard = memo(function StatCard({ value, symbol, label }: StatCardProps) {
  const { count, ref: countRef } = useCountUp(value);
  const { ref, rotateXSpring, rotateYSpring, onMouseMove, onMouseLeave } = use3DTilt(10);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: rotateXSpring, rotateY: rotateYSpring, transformStyle: 'preserve-3d', height: '100%' }}
      whileHover={{ y: -8 }}
    >
      <Box
        ref={countRef}
        sx={{
          p: { lg: 3, xs: 2 }, borderRadius: '16px',
          background: 'rgba(255,113,91,0.04)',
          border: `1px solid ${colors.glow}`, height: '100%',
          position: 'relative', overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          '&:hover': {
            background: 'rgba(255,113,91,0.09)',
            boxShadow: `0 12px 30px ${colors.glow}, 0 0 0 1px ${colors.tomato}40`,
            borderColor: colors.tomato,
            transform: 'translateY(-4px)',
          },
        }}
      >
        <Typography align="center" sx={{ fontWeight: 700, fontSize: { lg: 55, xs: 30 }, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          <Box component="span" sx={{
            background: `linear-gradient(135deg, ${colors.tomato} 0%, ${colors.orange} 100%)`,
            backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {count}{symbol}
          </Box>
        </Typography>
        <Typography align="center" sx={{ fontFamily: 'Roboto Slab', fontSize: { lg: 20, xs: 13 }, mt: 1, color: colors.textSecondary }}>
          {label}
        </Typography>
      </Box>
    </motion.div>
  );
});

// ─── ServiceCard ───────────────────────────────────────────────────────────────
interface ServiceCardProps { Icon: IconType; title: string; description: string; }

const ServiceCard = memo(function ServiceCard({ Icon, title, description }: ServiceCardProps) { return (
  <Box
    sx={{
      p: '28px', borderRadius: '20px',
      background: 'rgba(18,28,38,0.75)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,113,91,0.15)',
      position: 'relative', overflow: 'hidden',
      transition: 'border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease',
      '&:hover': {
        borderColor: 'rgba(255,113,91,0.35)',
        background: 'rgba(24,38,52,0.85)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,113,91,0.15)',
      },
      // Animated gradient border trace on hover
      '&::before': {
        content: '""', position: 'absolute', inset: 0,
        borderRadius: '20px',
        border: '1px solid transparent',
        backgroundOrigin: 'border-box',
        mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'destination-out',
        backgroundImage: `linear-gradient(135deg, rgba(255,113,91,0.7), rgba(124,58,237,0.5), rgba(252,163,17,0.7))`,
        transition: 'opacity 0.4s ease',
        opacity: 0,
      },
      '&:hover::before': { opacity: 1 },
      // Shimmer sweep on hover
      '&::after': {
        content: '""', position: 'absolute',
        top: '-50%', left: '-80%', width: '50%', height: '200%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
        transform: 'skewX(-20deg)', pointerEvents: 'none',
      },
      '&:hover::after': { animation: 'shimmerSlide 0.8s ease forwards' },
    }}
  >
    <Box sx={{ p: 1.5, borderRadius: '12px', background: 'rgba(255,113,91,0.1)', display: 'inline-flex', mb: 2 }}>
      <Icon style={{ fontSize: 40, color: colors.tomato }} />
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{title}</Typography>
    <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.7 }}>{description}</Typography>
  </Box>
); });

// ─── Data ──────────────────────────────────────────────────────────────────────
const services: Array<{ Icon: IconType; title: string; description: string }> = [
  { Icon: CgWebsite,       title: 'Web Development',  description: 'Building fast, scalable web apps with modern frameworks like Next.js and React.' },
  { Icon: MdPhoneAndroid,  title: 'App Development',  description: 'Cross-platform experiences with clean architecture and smooth interactions.' },
  { Icon: MdCloud,         title: 'Cloud & Hosting',  description: 'Deployment on Vercel, Azure, and Supabase with CI/CD and storage solutions.' },
];

const BIO =
  `Hi! I'm a passionate and joyful full-stack developer with a love for building intuitive, ` +
  `scalable, and impactful digital experiences. With a strong command of both front-end and ` +
  `back-end development, I bring a dedicated mindset and positive energy to every project I ` +
  `work on. I believe that great software is built not just with code—but with curiosity, ` +
  `collaboration, and care.`;

// ─── AboutMe ───────────────────────────────────────────────────────────────────
const AboutMe = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const shouldReduce = useReducedMotion();
  const bioRef = useRef<HTMLDivElement>(null);
  const bioInView = useInView(bioRef, { once: true, amount: 0.3 });
  const bioChunks = BIO.split(' ').reduce<string[][]>((acc, word, i) => {
    const chunkIdx = Math.floor(i / 5);
    if (!acc[chunkIdx]) acc[chunkIdx] = [];
    acc[chunkIdx].push(word);
    return acc;
  }, []);

  return (
    <Grid container item xs={12} spacing={3}>
      {/* Left: Bio + Stats */}
      <Grid item xs={12} lg={6}>
        <motion.div
          variants={safeStaggerContainer(0.1, shouldReduce ?? false)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={safeFadeUp(0, shouldReduce ?? false)}>
            <Typography sx={{ fontSize: 14, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.tomato, fontFamily: 'monospace', mb: 1 }}>
              {'// about me'}
            </Typography>
          </motion.div>

          <motion.div variants={safeFadeUp(0.05, shouldReduce ?? false)} style={{ position: 'relative', marginBottom: 24 }}>
            <GhostNumber number="02" top="-30px" left="-10px" />
            <Typography
              sx={{
                fontSize: { lg: 80, xs: 50 }, fontWeight: 700, letterSpacing: '-0.03em',
                background: `linear-gradient(135deg, ${colors.tomato} 0%, ${colors.orange} 100%)`,
                backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                display: 'inline-block', position: 'relative', zIndex: 1,
              }}
            >
              About me
            </Typography>
          </motion.div>

          {/* Bio — word reveal on desktop, fade on mobile/reduced */}
          <Box ref={bioRef} sx={{ mb: 5 }}>
            {sm || shouldReduce ? (
              <motion.div
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={bioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h6" sx={{ fontFamily: 'Roboto Slab', color: colors.textSecondary, fontSize: { lg: '1.25rem', xs: '1rem' }, lineHeight: 1.8 }}>
                  {BIO}
                </Typography>
              </motion.div>
            ) : (
              <p style={{ fontFamily: '"Roboto Slab",serif', color: colors.textSecondary, fontSize: '1.25rem', lineHeight: 1.8, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '0 6px' }}>
                {bioChunks.map((chunk, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={bioInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    style={{ display: 'inline-block' }}
                  >
                    {chunk.join(' ')}
                  </motion.span>
                ))}
              </p>
            )}
          </Box>

          {/* Stats */}
          <Grid container spacing={2}>
            {[
              { value: 10, symbol: '+', label: 'Completed Projects' },
              { value: 95, symbol: '%', label: 'Client Satisfaction' },
              { value: 3,  symbol: '+', label: 'Years of experience' },
            ].map((stat) => (
              <Grid item xs={4} key={stat.label}>
                <StatCard {...stat} />
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Grid>

      {/* Right: Service Cards */}
      <Grid item xs={12} lg={6}>
        <motion.div
          variants={safeStaggerContainer(0.12, shouldReduce ?? false)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}
        >
          {services.map((service) => (
            // Use fadeRight(0) — staggerChildren handles timing, no manual delay offset
            <motion.div key={service.title} variants={shouldReduce ? safeFadeUp(0, true) : fadeRight(0)}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default AboutMe;
