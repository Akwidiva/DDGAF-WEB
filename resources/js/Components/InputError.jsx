export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm text-red-600 dark:text-red-400 font-medium mt-1 ' + className}>
            {message}
        </p>
    ) : null;
}
