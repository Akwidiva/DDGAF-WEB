import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * ScrollReveal Component
 * Animates child elements when they come into view
 * 
 * Usage:
 * <ScrollReveal>
 *   <div>Content that animates on scroll</div>
 * </ScrollReveal>
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  threshold = 0.3,
  className = ''
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: threshold });

  const directionVariants = {
    up: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
    },
    down: {
      hidden: { opacity: 0, y: -40 },
      visible: { opacity: 1, y: 0 }
    },
    left: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 }
    },
    right: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    }
  };

  const variants = directionVariants[direction] || directionVariants.up;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
