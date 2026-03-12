// components/Navbar.tsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../styles/theme/colors';

const NAV_LINKS = [
  { label: 'Home',     id: 'home-section'    },
  { label: 'About',    id: 'about-section'   },
  { label: 'Projects', id: 'project-section' },
  { label: 'Contact',  id: 'contact-section' },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home-section');
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Scroll elevation
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close menu on resize to desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  // Escape key closes mobile menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Focus trap for mobile overlay (spec Section 11)
  // setTimeout(0) defers focus until after AnimatePresence enter animation starts,
  // preventing focus on an opacity:0 element.
  useEffect(() => {
    if (!menuOpen) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const focusables = overlay.querySelectorAll<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const t = setTimeout(() => first?.focus(), 0);

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    overlay.addEventListener('keydown', trap);
    return () => {
      clearTimeout(t);
      overlay.removeEventListener('keydown', trap);
    };
  }, [menuOpen]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  }, []);

  return (
    <>
      <Box
        component="nav"
        role="navigation"
        aria-label="Main navigation"
        sx={{
          position: 'fixed',
          top: { lg: 24, xs: 16 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          gap: { lg: 4, xs: 2 },
          px: { lg: 4, xs: 2.5 },
          py: { lg: 1.5, xs: 1 },
          borderRadius: '50px',
          background: scrolled ? 'rgba(18,31,40,0.92)' : 'rgba(18,31,40,0.75)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${scrolled ? 'rgba(255,113,91,0.35)' : 'rgba(255,113,91,0.15)'}`,
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
          transition: 'all 0.3s ease',
          minWidth: { lg: '480px', xs: 'auto' },
        }}
      >
        {/* Logo — use Box not Typography to avoid invalid <p><button> nesting */}
        <Box
          component="button"
          onClick={() => scrollTo('home-section')}
          sx={{
            fontWeight: 700,
            fontSize: { lg: 16, xs: 14 },
            fontFamily: 'inherit',
            background: `linear-gradient(135deg, ${colors.tomato} 0%, ${colors.orange} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: 'transparent',
            p: 0,
          }}
        >
          Charles Cabarrus
        </Box>

        {/* Desktop links */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {NAV_LINKS.map(({ label, id }) => {
              const isActive = activeSection === id;
              return (
                <Box
                  key={id}
                  component="button"
                  onClick={() => scrollTo(id)}
                  sx={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: isActive ? colors.tomato : 'rgba(255,255,255,0.75)',
                    fontSize: 15,
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.03em',
                    px: 1.5,
                    py: 0.75,
                    borderRadius: '4px',
                    position: 'relative',
                    transition: 'color 0.2s ease',
                    '&:hover': { color: 'white' },
                  }}
                >
                  {label}
                  {/* Animated active dot using layoutId for spring transition between links */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavDot"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: colors.tomato,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <IconButton
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-overlay"
            onClick={() => setMenuOpen((v) => !v)}
            sx={{ color: 'white', p: 0.5 }}
          >
            <Box sx={{ width: 22, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {[
                { transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' },
                { opacity: menuOpen ? 0 : 1 },
                { transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' },
              ].map((style, i) => (
                <Box
                  key={i}
                  sx={{
                    width: '100%',
                    height: 2,
                    backgroundColor: menuOpen ? colors.tomato : 'white',
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    ...style,
                  }}
                />
              ))}
            </Box>
          </IconButton>
        )}
      </Box>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-overlay"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1199,
              background: 'rgba(18,31,40,0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 32,
            }}
            onClick={() => setMenuOpen(false)}
          >
            {NAV_LINKS.map(({ label, id }, i) => (
              <motion.button
                key={id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                onClick={(e) => { e.stopPropagation(); scrollTo(id); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeSection === id ? '#FF715B' : 'white',
                  fontSize: 32,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  cursor: 'pointer',
                }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
