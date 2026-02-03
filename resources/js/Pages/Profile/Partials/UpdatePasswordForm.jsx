import { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { BiEdit, BiLock, BiMailSend } from "react-icons/bi";


export default function UpdatePasswordForm({ className = "" }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: "",
      password: "",
      password_confirmation: "",
    });

  const updatePassword = (e) => {
    e.preventDefault();

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset("password", "password_confirmation");
          passwordInput.current.focus();
        }

        if (errors.current_password) {
          reset("current_password");
          currentPasswordInput.current.focus();
        }
      },
    });
  };
 return (
   <section
     className={`${className} p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg`}
   >
     <header>
       <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
         <BiLock className="inline-block mr-2" />
         Editer le mot de passe
       </h2>

       <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
         Assurez-vous que votre compte utilise un mot de passe long et aléatoire
         pour rester en sécurité.
       </p>
     </header>

     <form onSubmit={updatePassword} className="mt-6 space-y-6">
       <div>
         <InputLabel htmlFor="current_password" value="Mot de Passe Courant" />

         <TextInput
           id="current_password"
           value={data.current_password}
           onChange={(e) => setData("current_password", e.target.value)}
           type="password"
           className="mt-1 block w-full"
           autoComplete="current-password"
         />

         <InputError message={errors.current_password} className="mt-2" />
       </div>

       <div>
         <InputLabel htmlFor="password" value="Nouveau Mot de Passe" />

         <TextInput
           id="password"
           value={data.password}
           onChange={(e) => setData("password", e.target.value)}
           type="password"
           className="mt-1 block w-full"
           autoComplete="new-password"
         />

         <InputError message={errors.password} className="mt-2" />
       </div>

       <div>
         <InputLabel
           htmlFor="password_confirmation"
           value="Confirmation du Mot de Passe"
         />

         <TextInput
           id="password_confirmation"
           value={data.password_confirmation}
           onChange={(e) => setData("password_confirmation", e.target.value)}
           type="password"
           className="mt-1 block w-full"
           autoComplete="new-password"
         />

         <InputError message={errors.password_confirmation} className="mt-2" />
       </div>

       <div className="flex items-center gap-4">
         <PrimaryButton disabled={processing}>
           {" "}
           <BiEdit className="inline-block mr-2 size-4" />
           Enregistrer
         </PrimaryButton>

         <Transition
           show={recentlySuccessful}
           enter="transition ease-in-out"
           enterFrom="opacity-0"
           leave="transition ease-in-out"
           leaveTo="opacity-0"
         >
           <p className="text-sm text-gray-600 dark:text-gray-400">
             Enregistrement...
           </p>
         </Transition>
       </div>
     </form>
   </section>
 );
}
