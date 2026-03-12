// lib/motionVariants.ts
import { Variants } from 'framer-motion';

/** Container that staggers children */
export const staggerContainer = (
  staggerChildren = 0.05,
  delayChildren = 0
): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren, delayChildren } },
});

/** Fade up from y:30 */
export const fadeUp = (delay = 0): Variants => ({
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay } },
});

/** Fade in from right (x:60) */
export const fadeRight = (delay = 0): Variants => ({
  hidden: { x: 60, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay } },
});

/** Character-level stagger container for hero heading */
export const charContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

/** Single character animation */
export const charItem: Variants = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/** Opacity-only container for reduced-motion users */
export const charContainerReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

/** Opacity-only item for reduced-motion users */
export const charItemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

/**
 * Returns reduced-motion-safe fadeUp.
 * When shouldReduce is true: opacity-only, no y transform.
 */
export function safeFadeUp(delay = 0, shouldReduce = false): Variants {
  if (shouldReduce) {
    return { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3, delay } } };
  }
  return fadeUp(delay);
}

/** Returns reduced-motion-safe stagger container */
export function safeStaggerContainer(
  staggerChildren = 0.05,
  shouldReduce = false
): Variants {
  return staggerContainer(shouldReduce ? 0 : staggerChildren);
}
