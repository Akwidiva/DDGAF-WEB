import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
// import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";

import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const currentYear = new Date().getFullYear();
  const endOfYear = new Date(currentYear, 11, 32); // Fin de l'année en cours

  // Formater la date de fin d'année au format "YYYY-MM-DD"
  const formattedEndOfYear = endOfYear.toISOString().split('T')[0]; // "YYYY-MM-DD"

  const { data, setData, post, errors, reset } = useForm({
    name: currentYear.toString(),
    status: "En_Cours",
    date: formattedEndOfYear, // Utilise le format correct pour le champ "date"
    description: "",
    due_date: formattedEndOfYear, // Toujours au format correct si utilisé ailleurs
    dateAvis: "", // Ajoute dateAvis dans les données initiales
  });

  console.log(formattedEndOfYear)

  const onSubmit = (e) => {
    e.preventDefault();
    // Créer l'exercice
    post(route("project.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#2FAC86] p-4 rounded-md shadow-md text-white">
          <h2 className="font-semibold text-xl text-white leading-tight">
            Creer un nouvel exercice
          </h2>
        </div>
      }
    >
      <Head title="Exercices" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <label htmlFor="project_name">Nom de l'Exercice </label>

                <TextInput
                  id="project_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  readOnly // Ajoutez l'attribut readOnly pour rendre le champ non modifiable  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_description"
                  value="Description de l'exercice "
                />

                <TextAreaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  autoFocus
                  onChange={(e) =>
                    setData("description", e.target.value.toUpperCase())
                  }
                />

                <InputError message={errors.description} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="numeroAvis" value="Numero d'avis" />

                <TextInput
                  id="numeroAvis"
                  type="text"
                  name="numeroAvis"
                  value={data.numeroAvis}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData("numeroAvis", e.target.value.toUpperCase())
                  }
                />

                <InputError message={errors.numeroAvis} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="attestation_date"
                  value="Date de l'avis"
                />
                <TextInput
                  id="attestation_date"
                  type="date"
                  name="dateAvis"
                  className="mt-1 block w-full"
                  // readOnly
                  onChange={(e) => setData("dateAvis", e.target.value)}
                />
                <InputError message={errors.date} className="mt-2" />
              </div>

              {/* capture du dernier jour de l'annee en cours */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="attestation_due_date"
                  value="Date de l'attestation"
                />
                <TextInput
                  id="attestation_due_date"
                  type="date"
                  name="date"
                  value={data.date} // La date au format "YYYY-MM-DD"
                  className="mt-1 block w-full"
                  readOnly
                  onChange={(e) => setData("date", e.target.value)} // Si nécessaire
                />
                <InputError message={errors.date} className="mt-2" />
              </div>

              <div className="mt-4">
                <label htmlFor="project_status">Statut de l'exercice </label>

                <select
                  name="status"
                  id="project_status"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                  value={data.status}
                >
                  <option value="">Selectionnez le statut</option>
                  <option value="En_Cours">En Cours</option>
                  <option value="Archivee" disabled>
                    Archivee
                  </option>
                </select>

                <div className="mt-2">{errors.project_status}</div>
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("project.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Annuler
                </Link>
                <button className="bg-[#87888a] hover:bg-[#7a7b7d] text-white py-1 px-3 rounded shadow transition-colors">
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
