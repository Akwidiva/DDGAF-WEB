import { motion } from 'framer-motion';

export default function DangerButton({ className = '', disabled, children, ...props }) {
    return (
        <motion.button
            {...props}
            whileHover={!disabled ? { scale: 1.04, y: -1 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={
                `inline-flex items-center px-4 py-2 bg-red-600 dark:bg-red-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 dark:hover:bg-red-600 active:bg-red-700 dark:active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
}
