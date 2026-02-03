import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth,services }) {
  const { data, setData, post, errors, reset } = useForm({
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("user.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Creer un nouveau compte
          </h2>
        </div>
      }
    >
      <Head title="Compte-Utilisateur" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="user_name" value="Nom de l'Utilisateur " />

                <TextInput
                  id="user_name"
                  type="text"
                  name="name"
                  value={data.name}
                  isFocused={true}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="user_email"
                  value="E-Mail de l'Utilisateur "
                />

                <TextInput
                  id="user_email"
                  type="text"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("email", e.target.value.toLowerCase())}
                />

                <InputError message={errors.email} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="service_id"
                  value="Service Concerne "
                />

                <SelectInput
                  name="service_id"
                  id="service_id"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("service_id", e.target.value)}
                >
                  <option value="">Selectionnez le service</option>
                  {services.data.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.Abreviation}
                    </option>
                  ))}
                </SelectInput>

                <InputError
                  message={errors.service_id}
                  className="mt-2"
                />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="user_password"
                  value="Mot de passe de l'Utilisateur "
                />

                <TextInput
                  id="user_password"
                  type="password"
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("password", e.target.value)}
                />

                <InputError message={errors.password} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="user_password"
                  value=" Confirmation du Mot de passe de l'Utilisateur "
                />

                <TextInput
                  id="user_password"
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData("password_confirmation", e.target.value)
                  }
                />

                <InputError
                  message={errors.password_confirmation}
                  className="mt-2"
                />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("user.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Annuler
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
