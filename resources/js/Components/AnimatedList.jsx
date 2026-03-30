import { motion } from 'framer-motion';

/**
 * AnimatedList Component
 * Wraps a list with staggered entrance animations for all children
 * Perfect for tables, item lists, or any repeating elements
 * 
 * Usage:
 * <AnimatedList delay={0.1} stagger={0.08}>
 *   {items.map(item => (
 *     <motion.tr key={item.id}>
 *       <td>{item.name}</td>
 *     </motion.tr>
 *   ))}
 * </AnimatedList>
 */
export default function AnimatedList({
  children,
  delay = 0,
  stagger = 0.08,
  duration = 0.3,
  direction = 'up',
  as = 'div'
}) {
  const directionVariants = {
    up: {
      hidden: { opacity: 0, y: 15 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: delay + i * stagger,
          duration,
          ease: [0.4, 0, 0.2, 1]
        }
      })
    },
    left: {
      hidden: { opacity: 0, x: -20 },
      visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: delay + i * stagger,
          duration,
          ease: [0.4, 0, 0.2, 1]
        }
      })
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: {
          delay: delay + i * stagger,
          duration,
          ease: [0.4, 0, 0.2, 1]
        }
      })
    }
  };

  const variants = directionVariants[direction] || directionVariants.up;
  const Component = motion[as];

  return (
    <Component>
      {children && Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={child.key || index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={variants}
            >
              {child}
            </motion.div>
          ))
        : children}
    </Component>
  );
}
