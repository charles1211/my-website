// components/MagneticCursor.tsx
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom magnetic cursor. Placed outside ThemeProvider in _app.tsx.
 * Hidden on touch devices (pointer:coarse) via .magnetic-cursor-root in globals.css.
 * Adds 'hide-cursor' class to document.body on mount; removes on unmount.
 */
const MagneticCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { stiffness: 400, damping: 28 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    // Event delegation handles dynamically added elements
    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-magnetic]')) {
        setIsHovering(true);
      }
    };
    const handleOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-magnetic]')) {
        setIsHovering(false);
      }
    };

    document.body.classList.add('hide-cursor');
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseout', handleOut);
    return () => {
      document.body.classList.remove('hide-cursor');
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleOut);
    };
  }, [cursorX, cursorY, setIsHovering]);

  return (
    <motion.div
      className="magnetic-cursor-root"
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: cursorXSpring,
        top: cursorYSpring,
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: '2px solid #FF715B',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: isHovering ? 'difference' : 'normal',
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(255,113,91,0.1)' : 'rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.15 }}
    />
  );
};

export default MagneticCursor;
