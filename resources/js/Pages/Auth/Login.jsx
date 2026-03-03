import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

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

            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Bienvenue sur DDGAF_WEB</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Plateforme interne de génération automatique d'attestations de dématérialisation des valeurs mobilières sécurisées.
                    </p>
                </div>

                {status && (
                    <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 dark:bg-green-900/40 dark:border-green-900 dark:text-green-200">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} autoComplete="off" className="space-y-5">
                    <div className="space-y-1.5">
                        <InputLabel htmlFor="email" value="Adresse e-mail" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-1.5">
                        <InputLabel htmlFor="password" value="Mot de passe" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="text-sm text-red-500" />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <label className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ml-2">Se souvenir de moi</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                                Mot de passe oublié ?
                            </Link>
                        )}
                    </div>

                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Se connecter
                    </PrimaryButton>
                </form>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Pas encore de compte ?{' '}
                    <Link
                        href={route('register')}
                        className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200"
                    >
                        Demander un accès
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
