import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { Head, Link, router, useForm } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import { useRef, useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineUndo,
  AiOutlineFile,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
  import { FiPlus } from 'react-icons/fi'; // Import de l'icône Plus
import { FaCalendarPlus } from "react-icons/fa";
import { BiArchiveIn, BiArchiveOut, BiCalendarPlus } from "react-icons/bi";


export default function Index({ auth, projects, queryParams = null, success }) {
  const [confirmingProjectDeletion, setConfirmingProjectDeletion] =
    useState(false);
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

  const [projectToDisable, setProjectToDisable] = useState(null);

  const confirmProjectDeletion = (project) => {
    setProjectToDisable(project);
    setConfirmingProjectDeletion(true);
  };

  const deleteProject = (e) => {
    e.preventDefault();
    if (projectToDisable) {
      archiverProject(projectToDisable);
    }
  };

  const closeModal = () => {
    setConfirmingProjectDeletion(false);
    reset();
  };

  const archiverProject = (project) => {
    destroy(route("project.destroy", project.id), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset(),
    });
  };

  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("project.index"), queryParams);
  };

  const RestaurerProjet = (project) => {
    if (
      !window.confirm(
        "Êtes-vous sûr de vouloir restaurer l'exercice " + project.name + "?"
      )
    ) {
      return;
    }
    router.delete(route("project.destroy", project.id));
  };
  const currentYear = new Date().getFullYear();

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#2FAC86] p-4 rounded-md shadow-md text-white">
          <h2 className="font-semibold text-xl text-white leading-tight">
            EXERCICES
          </h2>
          <Link
            href={route("project.create")}
            className="flex items-center bg-[#87888a] hover:bg-[#7a7b7d] text-white py-1 px-3 rounded shadow-md transition-colors"
          >
            <BiCalendarPlus className="mr-2" /> Créer un exercice
          </Link>
        </div>
      }
    >
      <Head title="Exercices" />

      {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        NOM DE L'EXERCICE
                      </TableHeading>

                      <TableHeading
                        name="status"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        STATUT
                      </TableHeading>

                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        DATE DE CREATION
                      </TableHeading>

                      <TableHeading
                        name="due_date"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        DATE D'ARCHIVAGE
                      </TableHeading>
                      <th className="px-3 py-3">CREE PAR</th>
                      <th className="px-3 py-3 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="Taper le Nom de l'exercice ici ..."
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Selectionnez le statut</option>
                          <option value="En_Attente">En Attente</option>
                          <option value="En_Cours">En Cours</option>
                          <option value="Archivee">Archivee</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.data.map((project) => {
                      {
                        // Vérifier si l'année actuelle est supérieure à project.name
                        if (currentYear > parseInt(project.name, 10)) {
                          project.status = "Archivee";
                          project.due_date = new Date().toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "long", year: "numeric" }
                          );
                        } else if (currentYear < parseInt(project.name, 10)) {
                          project.status = "En_Attente";
                          project.due_date = "NULL";
                        }
                      }
                      return (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={project.id}
                        >
                          <td className="px-3 py-2 text-nowrap text-center">
                            {project.id}
                          </td>
                          <th className="px-3 py-2 text-center text-black-300 hover:underline">
                            <Link href={route("project.show", project.id)}>
                              {project.name}
                            </Link>
                          </th>
                          <td className="px-3 py-2 text-nowrap text-center">
                            <span
                              className={
                                "px-2 py-1 text-nowrap text-center rounded text-white " +
                                PROJECT_STATUS_CLASS_MAP[project.status]
                              }
                            >
                              {PROJECT_STATUS_TEXT_MAP[project.status]}
                            </span>
                            {project.status === "En_Cours" ? (
                              <AiOutlineCheckCircle className="inline-block ml-2 text-green-500" />
                            ) : (
                              <AiOutlineCloseCircle className="inline-block ml-2 text-red-500" />
                            )}
                          </td>

                          <td className="px-3 py-2 text-nowrap text-center">
                            {project.created_at}
                          </td>
                          <td className="px-3 py-2 text-nowrap text-center">
                            {project.due_date}
                          </td>
                          <td className="px-3 py-2 text-nowrap text-center">
                            {project.createdBy.name}
                          </td>
                          <td className="px-3 py-2 text-nowrap text-center">
                            <div className="flex items-center">
                              <Link
                                href={route("project.edit", project.id)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center mr-4"
                              >
                                <AiOutlineEdit className="mr-1" /> Modifier
                              </Link>

                              {project.status === "Archivee" ? (
                                <button
                                  onClick={() => RestaurerProjet(project)}
                                  className="font-medium text-green-600 dark:text-green-500 hover:underline flex items-center"
                                >
                                  <BiArchiveOut className="mr-1" /> Restaurer
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    confirmProjectDeletion(project)
                                  }
                                  className="font-medium text-red-600 dark:text-red-500 hover:underline flex items-center"
                                >
                                  <BiArchiveIn className="mr-1" /> Archiver
                                </button>
                              )}
                            </div>
                            <Modal
                              show={confirmingProjectDeletion}
                              onClose={closeModal}
                            >
                              <form
                                onSubmit={(e) => deleteProject(e, project)}
                                className="p-6"
                              >
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                  Confirmation de l'archivage
                                </h2>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                  Êtes-vous sûr de vouloir archiver cet exercice
                                  ? Cette opération est délicate car elle
                                  archivera toutes les attestations de cet
                                  exercice. Pour continuer, veuillez confirmer
                                  en fournissant votre mot de passe.
                                </p>
                                <div className="mt-6">
                                  <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                  >
                                    Mot de passe
                                  </label>
                                  <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) =>
                                      setData("password", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                                    placeholder="Entrez votre mot de passe"
                                  />
                                  <InputError
                                    message={errors.password}
                                    className="mt-2 text-sm text-red-500"
                                  />
                                </div>
                                <div className="mt-6 flex justify-end">
                                  <SecondaryButton
                                    onClick={closeModal}
                                    disabled={processing}
                                  >
                                    Annuler
                                  </SecondaryButton>
                                  <DangerButton
                                    type="submit"
                                    className="ms-3"
                                    disabled={processing}
                                  >
                                    Archiver l'exercice
                                  </DangerButton>
                                </div>
                              </form>
                            </Modal>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
