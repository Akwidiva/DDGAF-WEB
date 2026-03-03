import GuestLogo from '@/Components/GuestLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#87888a] dark:bg-[#0b1220] transition-colors">
            <div className="w-full max-w-xl">
                <div className="bg-white dark:bg-[#1c2233] shadow-2xl rounded-3xl px-8 py-8 space-y-6 transition-colors">
                    <div className="flex justify-center">
                        <Link href="/" aria-label="Retour à l'accueil CAA">
                            <GuestLogo />
                        </Link>
                    </div>
                    <div
                        className="w-full h-2 rounded-full bg-[linear-gradient(90deg,#2FAC86_0%,#44d09f_25%,#b5b6b8_60%,#87888a_100%)] dark:bg-[linear-gradient(90deg,#2FAC86_0%,#33b383_20%,#3d4f4a_55%,#0b1220_100%)]"
                    />
                    {children}
                </div>
            </div>
        </div>
    );
}
 
