import { motion } from 'framer-motion';

export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <motion.button
            {...props}
            whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={
                `inline-flex items-center px-4 py-2 bg-emerald-600 dark:bg-emerald-700 border border-transparent rounded-lg font-semibold text-sm text-white tracking-wide hover:bg-emerald-500 dark:hover:bg-emerald-600 focus:bg-emerald-700 dark:focus:bg-emerald-800 active:bg-emerald-800 dark:active:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
}
