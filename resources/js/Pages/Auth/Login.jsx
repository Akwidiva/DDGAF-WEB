import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PageTransition from '@/Components/PageTransition';
import { MdEmail, MdLock } from 'react-icons/md';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Connexion | DDGAF_WEB" />

            <PageTransition>
                <motion.div className="space-y-0">
                    {/* Header Section */}
                    <motion.div 
                        className="text-center space-y-3 pb-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                    >
                        <motion.div 
                            className="inline-block p-3 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <MdLock className="text-white text-3xl" />
                        </motion.div>
                        <motion.h1 
                            className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                        >
                            Bienvenue
                        </motion.h1>
                        <motion.p 
                            className="text-sm text-gray-600 dark:text-gray-400 max-w-sm mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.25 }}
                        >
                            Connectez-vous à votre compte pour accéder à la plateforme.
                        </motion.p>
                    </motion.div>
                    <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mx-auto mb-8" />

                    {status && (
                        <motion.div 
                            className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 dark:bg-green-900/40 dark:border-green-900 dark:text-green-200"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {status}
                        </motion.div>
                    )}

                    {/* Form Section */}
                    <motion.form 
                        onSubmit={submit} 
                        autoComplete="off" 
                        className="space-y-5 px-0.5"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.08,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Email Field with Icon */}
                        <motion.div 
                            className="space-y-2"
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <MdEmail className="text-emerald-600 dark:text-emerald-400 text-lg" />
                                <InputLabel htmlFor="email" value="Adresse e-mail" />
                            </div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/30"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="vous@exemple.com"
                            />
                            <InputError message={errors.email} className="text-sm text-red-500" />
                        </motion.div>

                        {/* Password Field with Icon */}
                        <motion.div 
                            className="space-y-2"
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <MdLock className="text-emerald-600 dark:text-emerald-400 text-lg" />
                                <InputLabel htmlFor="password" value="Mot de passe" />
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/30"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="text-sm text-red-500" />
                        </motion.div>

                        {/* Remember & Forgot Password */}
                        <motion.div 
                            className="flex flex-wrap items-center justify-between gap-3"
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <label className="inline-flex items-center text-sm text-gray-700 dark:text-gray-300 cursor-pointer group">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">Se souvenir de moi</span>
                            </label>

                            {canResetPassword && (
                                <motion.div
                                    whileHover={{ x: 2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Login Button */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <PrimaryButton className="w-full justify-center py-3 text-base font-semibold" disabled={processing}>
                                {processing ? 'Connexion en cours...' : 'Se connecter'}
                            </PrimaryButton>
                        </motion.div>
                    </motion.form>

                    {/* Signup Link */}
                    <motion.div 
                        className="text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        <p>
                            Pas encore de compte ?{' '}
                            <Link
                                href={route('register')}
                                className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                            >
                                Demander un accès
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>
            </PageTransition>
        </GuestLayout>
    );
}
