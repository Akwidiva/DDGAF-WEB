import { forwardRef, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();
    const [isFocusedState, setIsFocusedState] = useState(false);

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <motion.input
            {...props}
            type={type}
            onFocus={() => setIsFocusedState(true)}
            onBlur={() => setIsFocusedState(false)}
            animate={{
                boxShadow: isFocusedState
                    ? 'rgba(16, 185, 129, 0.1) 0px 0px 0px 3px, rgba(16, 185, 129, 0.5) 0px 0px 0px 1px'
                    : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}
            transition={{ duration: 0.2 }}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-emerald-500 dark:focus:ring-emerald-500 rounded-md shadow-sm transition-all ' +
                className
            }
            ref={input}
        />
    );
});
