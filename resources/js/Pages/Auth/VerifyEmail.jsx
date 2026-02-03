import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm({});

  const submit = (e) => {
    e.preventDefault();

    post(route("verification.send"));
  };

  return (
    <GuestLayout>
      <Head title="Verification de l'Email " />

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Merci pour l'enregistrement! Avant de commencer, pourriez-vous vérifier
        votre adresse e-mail en cliquant sur le lien que nous venons de vous
        envoyer par e-mail ? Si vous n'avez pas reçu l'e-mail, nous vous en
        enverrons volontiers un autre.
      </div>

      {status === "verification-link-sent" && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          Un nouveau lien de vérification a été envoyé à l'adresse e-mail que
          vous avez fournis lors de l’inscription.
        </div>
      )}

      <form onSubmit={submit} autocomplete="off">
        <div className="mt-4 flex items-center justify-between">
          <PrimaryButton disabled={processing}>
            Renvoyer l'e-mail de vérification
          </PrimaryButton>

          <Link
            href={route("logout")}
            method="post"
            as="button"
            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            Se Deconnecter
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}
