// components/contact.tsx
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { colors } from '../styles/theme/colors';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MdEmail } from 'react-icons/md';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import GhostNumber from './GhostNumber';
import { safeFadeUp } from '../lib/motionVariants';

// ─── Confetti burst ────────────────────────────────────────────────────────────
const CONFETTI_COLORS = [colors.tomato, colors.orange, '#61DAFB', '#3ECF8E', '#A78BFA'];

const CONFETTI_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  angle: (i / 12) * 2 * Math.PI,
  dist: 60 + Math.random() * 40,
}));

const ConfettiBurst = () => (
  <>
    {CONFETTI_PARTICLES.map(({ angle, dist }, i) => {
      return (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute', width: 8, height: 8, borderRadius: '50%',
            backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            top: '50%', left: '50%', marginLeft: -4, marginTop: -4,
            pointerEvents: 'none',
          }}
        />
      );
    })}
  </>
);

// ─── Quick contacts ────────────────────────────────────────────────────────────
const QUICK_CONTACTS = [
  { label: 'Email',    Icon: MdEmail,    href: 'mailto:charlescabarrus99@gmail.com' },
  { label: 'LinkedIn', Icon: BsLinkedin, href: 'https://www.linkedin.com/in/charles-rhobert-cabarrus-3201ba138/' },
  { label: 'GitHub',   Icon: FaGithub,   href: 'https://github.com/charles1211' },
];

// ─── Glass text field sx ───────────────────────────────────────────────────────
const glassSx = {
  '& .MuiOutlinedInput-root': {
    color: 'white', fontSize: { lg: 18, xs: 16 },
    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)', transition: 'border-color 0.3s ease' },
    '&:hover fieldset': { borderColor: 'rgba(255,113,91,0.4)' },
    '&.Mui-focused fieldset': { borderColor: colors.tomato, borderWidth: 2 },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.5)', fontSize: { lg: 18, xs: 16 },
    '&.Mui-focused': { color: colors.tomato },
  },
};

// ─── Contacts ──────────────────────────────────────────────────────────────────
const Contacts = () => {
  const shouldReduce = useReducedMotion() ?? false;

  const [initialValue, setInitialValue] = useState({
    email: 'charlescabarrus99@gmail.com',
    sender: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false); // drives confetti burst
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (confettiTimer.current) clearTimeout(confettiTimer.current); }, []);

  // ── Business logic — UNCHANGED from original ─────────────────────────────────
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
    // ── Only addition: trigger confetti, auto-reset after animation completes ──
    setSubmitted(true);
    confettiTimer.current = setTimeout(() => setSubmitted(false), 900);

    setInitialValue({ email: 'charlescabarrus99@gmail.com', sender: '', subject: '', message: '' });
  }
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <Grid
      container justifyContent="center" item xs={12}
      sx={{ mt: { lg: 10, xs: 5 }, mb: { lg: 20, xs: 8 } }}
    >
      <Grid item xs={12} lg={10}>
        <Grid container item xs={12} spacing={3}>

          {/* Left: CTA + quick contacts */}
          <Grid item xs={12} lg={6}>
            <motion.div
              variants={safeFadeUp(0, shouldReduce)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Box sx={{ position: 'relative', mb: 2 }}>
                <GhostNumber number="04" top="-20px" left="-10px" />
                <Typography sx={{ fontSize: { lg: 18, xs: 16 }, color: colors.tomato, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1, position: 'relative', zIndex: 1 }}>
                  Contacts
                </Typography>
              </Box>

              {/* Word-reveal on headings */}
              <Box sx={{ mb: 1 }}>
                {'Have a project?'.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    style={{
                      display: 'inline-block', marginRight: '0.3em',
                      fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1,
                      color: colors.orange,
                      fontSize: 'clamp(32px, 6vw, 70px)',
                      textShadow: '0 4px 20px rgba(252,163,17,0.2)',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </Box>
              <Box sx={{ mb: 4 }}>
                {"Let's talk!".split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    style={{
                      display: 'inline-block', marginRight: '0.3em',
                      fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1,
                      color: colors.orange,
                      fontSize: 'clamp(28px, 5.5vw, 70px)',
                      textShadow: '0 4px 20px rgba(252,163,17,0.2)',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </Box>

              {/* Quick-contact chips */}
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {QUICK_CONTACTS.map(({ label, Icon, href }) => (
                  <Box
                    key={label}
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1,
                      borderRadius: '50px', border: '1px solid rgba(255,113,91,0.2)',
                      background: 'rgba(255,113,91,0.05)', color: colors.textSecondary,
                      fontSize: 14, fontWeight: 500, textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': { borderColor: colors.tomato, backgroundColor: 'rgba(255,113,91,0.12)', color: 'white', transform: 'translateY(-2px)' },
                    }}
                  >
                    <Icon style={{ fontSize: 16 }} />
                    {label}
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Right: Glassmorphism form */}
          <Grid item xs={12} lg={6}>
            <motion.div
              variants={safeFadeUp(0.15, shouldReduce)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  p: { lg: 4, xs: 3 }, borderRadius: '20px',
                  background: 'rgba(26,45,58,0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,113,91,0.2)',
                  boxShadow: 'inset 0 1px 0 rgba(255,113,91,0.15)',
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Your email" variant="outlined" type="email"
                      value={initialValue.sender}
                      onChange={(e) => setInitialValue({ ...initialValue, sender: e.target.value })}
                      sx={glassSx}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Subject" variant="outlined"
                      value={initialValue.subject}
                      onChange={(e) => setInitialValue({ ...initialValue, subject: e.target.value })}
                      sx={glassSx}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Message" variant="outlined" multiline rows={4}
                      value={initialValue.message}
                      onChange={(e) => setInitialValue({ ...initialValue, message: e.target.value })}
                      sx={glassSx}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Confetti wrapper — key prop required for AnimatePresence lifecycle tracking */}
                    <Box sx={{ position: 'relative' }}>
                      <AnimatePresence>
                        {submitted && <ConfettiBurst key="confetti" />}
                      </AnimatePresence>
                      <Button
                        fullWidth variant="contained" data-magnetic
                        onClick={handleSubmit}
                        sx={{
                          background: `linear-gradient(135deg, ${colors.tomato} 0%, ${colors.orange} 100%)`,
                          borderRadius: '14px', py: 1.8,
                          textTransform: 'none', fontSize: { lg: 18, xs: 16 },
                          fontWeight: 600, letterSpacing: '0.02em',
                          boxShadow: '0 8px 24px rgba(255,113,91,0.3)',
                          transition: 'all 0.3s ease',
                          '&:hover': { background: `linear-gradient(135deg, ${colors.orange} 0%, ${colors.tomato} 100%)`, transform: 'translateY(-3px)', boxShadow: '0 12px 32px rgba(255,113,91,0.4)' },
                          '&:active': { transform: 'translateY(-1px)' },
                        }}
                      >
                        Send Message
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contacts;
