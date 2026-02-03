import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";

import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Description } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, projects, users, services }) {
  const { data, setData, post, errors, reset } = useForm({
  
    Nom: "",
    Abreviation: "",
    Description: "",
  
   
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("service.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Enregistrer un nouveau service
          </h2>
        </div>
      }
    >
      <Head title="Services" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
             

              <div className="mt-4 flex items-center">
                <div className="flex-1">
                  <InputLabel
                    htmlFor="service_name"
                    value="Entrer le Nom de l'service"
                  />

                  <div className="flex items-center">
                    <TextInput
                      id="service_name"
                      type="text"
                      name="Nom"
                      value={data.Nom}
                      className="mt-1 block w-full"
                      isFocused={true}
                      onChange={(e) =>
                        setData("Nom", e.target.value.toUpperCase())
                      }
                    />
                  
                  </div>

                  <InputError message={errors.Nom} className="mt-2" />
                </div>
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="Abreviation" value="Abreviation " />

                <TextInput
                  id="Abreviation"
                  type="text"
                  name="Abreviation"
                  value={data.Abreviation}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData("Abreviation", e.target.value.toUpperCase())
                  }
                />

                <InputError message={errors.Abreviation} className="mt-2" />
              </div>
             

              <div className="mt-4">
                <InputLabel htmlFor="Description" value="Description " />

                <TextInput
                  id="Description"
                  type="text"
                  name="Description"
                  value={data.Description}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData("Description", e.target.value.toUpperCase())
                  }
                />

                <InputError message={errors.Description} className="mt-2" />
              </div>

           
          
              <div className="mt-8 text-right">
                <Link
                  href={route("service.index")}
                  className="bg-gray-100 py-2 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Annuler
                </Link>
                <button className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
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
