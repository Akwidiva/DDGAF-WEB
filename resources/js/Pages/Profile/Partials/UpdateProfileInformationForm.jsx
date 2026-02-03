import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { BiEdit, BiMailSend } from "react-icons/bi";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
    });

  const submit = (e) => {
    e.preventDefault();

    patch(route("profile.update"));
  };
 return (
   <section
     className={`${className} p-4 bg-white dark:bg-gray-800 shadow sm:rounded-lg`}
   >
     <header>
       <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
         <BiEdit className="inline-block mr-2 size-4" />
         Informations du Profil
       </h2>

       <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
         Mettez à jour les informations de profil et l'adresse e-mail de votre
         compte.
       </p>
     </header>

     <form onSubmit={submit} className="mt-6 space-y-6">
       <div>
         <InputLabel htmlFor="name" value="Name" />

         <TextInput
           id="name"
           className="mt-1 block w-full"
           value={data.name}
           onChange={(e) => setData("name", e.target.value)}
           required
           isFocused
           autoComplete="name"
         />

         <InputError className="mt-2" message={errors.name} />
       </div>

       <div>
         <InputLabel htmlFor="email" value="Email" />

         <TextInput
           id="email"
           type="email"
           className="mt-1 block w-full"
           value={data.email}
           onChange={(e) => setData("email", e.target.value)}
           required
           autoComplete="username"
         />

         <InputError className="mt-2" message={errors.email} />
       </div>

       {mustVerifyEmail && user.email_verified_at === null && (
         <div>
           <p className="text-sm mt-2 text-gray-800 dark:text-gray-200 flex items-center">
             <BiMailSend className="inline-block mr-2 size-4" />
             Votre adresse e-mail n'est pas vérifiée.
             <Link
               href={route("verification.send")}
               method="post"
               as="button"
               className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
             >
               Cliquez ici pour renvoyer l'e-mail de vérification.
             </Link>
           </p>

           {status === "verification-link-sent" && (
             <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
               Un nouveau lien de vérification a été envoyé à votre adresse
               e-mail.
             </div>
           )}
         </div>
       )}

       <div className="flex items-center gap-4">
         <PrimaryButton disabled={processing}>
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
