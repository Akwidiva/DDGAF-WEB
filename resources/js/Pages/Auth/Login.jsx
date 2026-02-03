import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <GuestLayout>
      <Head
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
        title="CONNEXION | DDGAF_WEB"
      />

      <h1 className="text-3xl font-bold text-center mt-8 mb-6 text-gray-800 dark:text-white">
       DDGAF_WEB
      </h1>
      <p className="text-lg text-center mb-6 text-gray-600 dark:text-gray-400">
        Plateforme Interne de Génération Automatique d'Attestations de
        Dématérialisation des Valeurs Mobilières Sécurisées
      </p>
      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <form onSubmit={submit} autoComplete="off" className="space-y-4">
        <InputLabel htmlFor="email" value="Adresse E-mail" />

        <TextInput
          id="email"
          type="email"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          isFocused={true}
          onChange={(e) => setData("email", e.target.value)}
        />

        <InputError message={errors.email} className="mt-2 text-red-500" />

        <InputLabel htmlFor="password" value="Mot de Passe" />

        <TextInput
          id="password"
          type="password"
          name="password"
          value={data.password}
          className="mt-1 block w-full"
          onChange={(e) => setData("password", e.target.value)}
        />

        <InputError message={errors.password} className="mt-2 text-red-500" />

        <div className="flex items-center">
          <Checkbox
            name="remember"
            checked={data.remember}
            onChange={(e) => setData("remember", e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Se souvenir de moi
          </span>
        </div>

        <div className="flex justify-between items-center">
          {canResetPassword && (
            <Link
              href={route("password.request")}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              Mot de passe oublié?
            </Link>
          )}

          <PrimaryButton disabled={processing}>Se Connecter</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
