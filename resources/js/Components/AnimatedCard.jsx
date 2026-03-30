import { motion } from 'framer-motion';

/**
 * AnimatedCard Component
 * Reusable card with smooth hover animations and entrance effects
 * 
 * Usage:
 * <AnimatedCard delay={0.1} className="p-6">
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </AnimatedCard>
 */
export default function AnimatedCard({
  children,
  delay = 0,
  className = '',
  hoverScale = 1.02,
  hoverY = -4,
  onClick,
  href
}) {
  const defaultClasses = 'bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg transition-all hover:shadow-md';

  const Component = href ? 'a' : 'div';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: hoverScale, y: hoverY }}
      transition={{
        initial: { duration: 0.3, delay },
        hover: { duration: 0.2 },
        tap: { duration: 0.1 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${defaultClasses} ${className}`}
      as={Component}
      {...(href ? { href } : {})}
    >
      {children}
    </motion.div>
  );
}
