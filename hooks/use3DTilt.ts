// hooks/use3DTilt.ts
import { useRef, useCallback } from 'react';
import { RefObject } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'framer-motion';

interface Use3DTiltResult {
  ref: RefObject<HTMLDivElement>;
  rotateXSpring: MotionValue<number>;
  rotateYSpring: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

/**
 * Provides 3D tilt values driven by mouse position within an element.
 * Attach `ref` to the element, spread `onMouseMove` / `onMouseLeave`,
 * and pass `rotateXSpring` / `rotateYSpring` to a motion.div style prop.
 */
export function use3DTilt(maxDeg = 15): Use3DTiltResult {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 20 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      rotateX.set(((y - rect.height / 2) / (rect.height / 2)) * -maxDeg);
      rotateY.set(((x - rect.width / 2) / (rect.width / 2)) * maxDeg);
    },
    [maxDeg, rotateX, rotateY]
  );

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return { ref, rotateXSpring, rotateYSpring, onMouseMove, onMouseLeave };
}
