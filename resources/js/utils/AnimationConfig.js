// Framer Motion Animation Presets
// Consistent, reusable animation configurations for the entire app

export const animations = {
  // Page transitions
  pageVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  pageTransition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] // cubic-bezier
  },

  // Card animations
  cardVariants: {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: { y: -4, scale: 1.02 }
  },
  cardTransition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
  },

  // Staggered list animations
  containerVariants: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  itemVariants: {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },

  // Button animations
  buttonVariants: {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.98 }
  },
  buttonTransition: {
    duration: 0.2,
    ease: 'easeInOut'
  },

  // Scroll reveal animations
  scrollVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },

  // Icon animations
  iconVariants: {
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.95 }
  },
  iconTransition: {
    duration: 0.2
  },

  // Modal animations
  modalVariants: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -20 }
  },
  modalTransition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
  },

  // Loading skeleton animation
  skeletonVariants: {
    initial: { backgroundPosition: '200% 0' },
    animate: { backgroundPosition: '-200% 0' },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Easing curves
export const easing = {
  smooth: [0.4, 0, 0.2, 1], // cubic-bezier
  bounce: [0.34, 1.56, 0.64, 1],
  elastic: [0.175, 0.885, 0.32, 1.275]
};

// Animation timing
export const timing = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8
};
