import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            {...props}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-emerald-400 dark:border-emerald-600 text-gray-900 dark:text-gray-100 focus:border-emerald-700 '
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 ') +
                className
            }
        >
            <div className="relative inline-flex items-center">
                {children}
                {(active || isHovered) && (
                    <motion.div
                        layoutId="underline"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded"
                        initial={{ scaleX: active ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{ originX: 0 }}
                    />
                )}
            </div>
        </Link>
    );
}
