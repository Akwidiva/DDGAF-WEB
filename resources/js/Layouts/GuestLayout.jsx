import GuestLogo from '@/Components/GuestLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900 transition-colors">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl px-8 py-12 space-y-6 transition-colors">
                    <div className="flex justify-center">
                        <Link href="/" aria-label="Retour à l'accueil CAA">
                            <GuestLogo />
                        </Link>
                    </div>
                    <div
                        className="w-full h-2 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 dark:from-emerald-600 dark:via-emerald-500 dark:to-emerald-700"
                    />
                    {children}
                </div>
            </div>
        </div>
    );
}
 
