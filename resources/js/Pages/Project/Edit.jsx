import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { AiOutlineEdit } from "react-icons/ai";
export default function Create({ auth, project }) {
  const { data, setData, post, errors, reset } = useForm({
    name: project.name || "",
    status: project.status || "",
    description: project.description || "",
    due_date: project.due_date || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("project.update", project.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight flex space-x-4">
            <AiOutlineEdit className="h-5 w-5 mr-2" /> Editer l'exercie
            {" "} {project.name}
          </h2>
        </div>
      }
    >
      <Head title="Exercice" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="project_name" value="Nom de l'Exercice " />

                <TextInput
                  id="project_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  readOnly
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_description"
                  value="Description de l'Exercice "
                />

                <TextAreaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) =>
                    setData("description", e.target.value.toUpperCase())
                  }
                />

                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_due_date"
                  value="Deadline de l'Exercice"
                />

                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                />

                <InputError message={errors.due_date} className="mt-2" />
              </div>
              {/**
               * <div className="mt-4">
                <InputLabel htmlFor="project_status" value="Statut de l'Exercice" />

                <SelectInput
                  name="status"
                  id="project_status"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Selectionnez le statut</option>
                  <option value="En_Attente">En Attente</option>
                  <option value="En_Cours">En Cours</option>
                  <option value="Archivee">Archivee</option>
                </SelectInput>

                <InputError message={errors.status} className="mt-2" />
              </div> */}
              <div className="mt-4 text-right">
                <Link
                  href={route("project.index")}
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
