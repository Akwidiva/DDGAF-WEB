import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PageTransition from '@/Components/PageTransition';
import { MdPersonAdd, MdEmail, MdLock, MdPerson } from 'react-icons/md';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Créer un compte | DDGAF_WEB" />

            <PageTransition>
                <motion.div className="space-y-6">
                    {/* Header Section */}
                    <div className="text-center">
                        <motion.div 
                            className="inline-block p-3 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 mb-6"
                            animate={{ rotate: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <MdPersonAdd className="text-white text-3xl" />
                        </motion.div>

                        <motion.h1 
                            className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent mb-2"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Créer un compte
                        </motion.h1>

                        <motion.p 
                            className="text-gray-600 dark:text-gray-400 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Renseignez vos informations pour rejoindre la plateforme
                        </motion.p>

                        <motion.div 
                            className="w-12 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mt-4"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        />
                    </div>

                    <motion.form 
                        onSubmit={submit} 
                        className="space-y-5" 
                        autoComplete="off"
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
                        <motion.div className="grid gap-4 sm:grid-cols-2">
                            <motion.div 
                                className="space-y-1.5"
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <MdPerson className="text-emerald-600 dark:text-emerald-400 text-lg" />
                                    <InputLabel htmlFor="name" value="Nom complet" />
                                </div>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/30"
                                    autoComplete="off"
                                    isFocused={true}
                                    placeholder="Jean Dupont"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="text-sm text-red-500" />
                            </motion.div>

                            <motion.div 
                                className="space-y-1.5"
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
                                    className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/30"
                                    autoComplete="off"
                                    placeholder="vous@exemple.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="text-sm text-red-500" />
                            </motion.div>

                            <motion.div 
                                className="space-y-1.5"
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
                                    className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/30"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="text-sm text-red-500" />
                            </motion.div>

                            <motion.div 
                                className="space-y-1.5"
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <MdLock className="text-emerald-600 dark:text-emerald-400 text-lg" />
                                    <InputLabel htmlFor="password_confirmation" value="Confirmer le mot de passe" />
                                </div>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900/30"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="text-sm text-red-500" />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                                {processing ? 'Création en cours...' : 'Créer mon compte'}
                            </PrimaryButton>
                        </motion.div>
                    </motion.form>

                    <motion.div
                        className="border-t border-gray-200 dark:border-gray-700 pt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Déjà inscrit ?{' '}
                            <Link
                                href={route('login')}
                                className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                            >
                                Retour à la connexion
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>
            </PageTransition>
        </GuestLayout>
    );
}
