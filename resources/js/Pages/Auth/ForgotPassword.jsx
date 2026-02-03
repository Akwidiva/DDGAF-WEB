import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <GuestLayout>
      <Head title="Mot de passe oublie" />

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Mot de passe oublié? Aucun problème. Laissez-nous simplement votre
        adresse e-mail et nous vous enverrons un mot de passe lien de
        réinitialisation qui vous permettra d’en choisir un nouveau.
      </div>

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          {status}
        </div>
      )}

      <form onSubmit={submit} autocomplete="off">
        <TextInput
          id="email"
          type="email"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          isFocused={true}
          onChange={(e) => setData("email", e.target.value)}
        />

        <InputError message={errors.email} className="mt-2" />

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ms-4" disabled={processing}>
            Lien de réinitialisation du mot de passe par e-mail
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
