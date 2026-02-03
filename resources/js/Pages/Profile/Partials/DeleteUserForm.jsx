import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { BiError } from "react-icons/bi";
export default function DeleteUserForm({ className = "" }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: "",
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser = (e) => {
    e.preventDefault();

    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);

    reset();
  };

  return (
    <section className={`space-y-6 ${className} p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg`}>
      <header>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Désactivation du compte
        </h2>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Attention !!! <br />
          Lorsque vous désactivez votre compte, l'accès à l'application est bloqué. Pour le réactiver ultérieurement, contactez la DSI qui détient les identifiants du super administrateur pour cette démarche.
        </p>
      </header>

      <DangerButton onClick={confirmUserDeletion}>
        <BiError className="inline-block mr-2 size-4" />
        Désactiver le Compte
      </DangerButton>

      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <form onSubmit={deleteUser} className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Confirmation de désactivation du compte
          </h2>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Voulez-vous vraiment désactiver votre compte? Cette opération est délicate et requiert votre mot de passe.
          </p>

          <div className="mt-6">
            <InputLabel
              htmlFor="password"
              value="Password"
              className="sr-only"
            />

            <TextInput
              id="password"
              type="password"
              name="password"
              ref={passwordInput}
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              className="mt-1 block w-3/4"
              isFocused
              placeholder="Entrer votre Mot de Passe"
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Annuler</SecondaryButton>

            <DangerButton className="ms-3" disabled={processing}>
              Désactiver le Compte
            </DangerButton>
          </div>
        </form>
      </Modal>
    </section>
  );
}
