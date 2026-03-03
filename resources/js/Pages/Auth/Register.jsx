import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

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

            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Créer un accès</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Renseignez vos informations pour rejoindre la plateforme DDGAF_WEB et suivre vos attestations.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-5" autoComplete="off">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <InputLabel htmlFor="name" value="Nom complet" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="text-sm text-red-500" />
                        </div>

                        <div className="space-y-1.5">
                            <InputLabel htmlFor="email" value="Adresse e-mail" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                onChange={(e) => setData('email', e.target.value)}
                                required
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
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="text-sm text-red-500" />
                        </div>

                        <div className="space-y-1.5">
                            <InputLabel htmlFor="password_confirmation" value="Confirmer le mot de passe" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="text-sm text-red-500" />
                        </div>
                    </div>

                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Créer mon compte
                    </PrimaryButton>
                </form>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Déjà inscrit ?{' '}
                    <Link
                        href={route('login')}
                        className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200"
                    >
                        Retour à la connexion
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
