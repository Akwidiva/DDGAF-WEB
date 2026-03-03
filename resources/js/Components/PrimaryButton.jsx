export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-[#87888a] border border-transparent rounded-lg font-semibold text-sm text-white tracking-wide hover:bg-[#7a7b7d] focus:bg-[#6f7072] active:bg-[#626366] focus:outline-none focus:ring-2 focus:ring-[#87888a] focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
