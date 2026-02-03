import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import { useRef, useState } from "react";
import { FiBriefcase, FiFolderPlus } from 'react-icons/fi'; // Import de l'icône Briefcase 
import {
  AiOutlineEdit,
  AiOutlineUndo,
  AiOutlineFile,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineBank,
} from "react-icons/ai";
export default function Index({ auth, entreprises, queryParams = null, success }) {
  const [confirmingEntrepriseDeletion, setConfirmingEntrepriseDeletion] =
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

  const [entrepriseToDisable, setEntrepriseToDisable] = useState(null);

  const confirmEntrepriseDeletion = (entreprise) => {
    setEntrepriseToDisable(entreprise);
    setConfirmingEntrepriseDeletion(true);
  };

  const deleteEntreprise = (e) => {
    e.preventDefault();
    if (entrepriseToDisable) {
      archiverEntreprise(entrepriseToDisable);
    }
  };

  const closeModal = () => {
    setConfirmingEntrepriseDeletion(false);
    reset();
  };

  const archiverEntreprise = (entreprise) => {
    destroy(route("entreprise.destroy", entreprise.id), {
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

    router.get(route("entreprise.index"), queryParams);
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
    router.get(route("entreprise.index"), queryParams);
  };

  const RestaurerEntreprise = (entreprise) => {
    if (
      !window.confirm(
        "Êtes-vous sûr de vouloir restaurer l'entreprise " + entreprise.Nom + "?"
      )
    ) {
      return;
    }
    router.delete(route("entreprise.destroy", entreprise.id));
  };


  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md">
          <h2 className="font-semibold text-2xl text-gray-800 dark:text-gray-200 leading-tight flex items-center">
            <AiOutlineBank className="h-6 w-6 mr-2" /> ENTREPRISES
          </h2>
          <Link
            href={route("entreprise.create")}
            className="flex items-center bg-emerald-500 py-1 px-3 text-white rounded shadow-md transition-all hover:bg-emerald-600"
          >
            <FiFolderPlus className="mr-2" /> Enregistrer une entreprise
          </Link>
        </div>
      }
    >
      <Head title="Entreprise" />

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
                        name="Nom"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        NOM
                      </TableHeading>

                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        DATE DE CREATION
                      </TableHeading>

                      <th className="px-3 py-3 text-center">CREE PAR</th>
                      <th className="px-3 py-3 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      {/* <th className="px-3 py-3"></th> */}
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.Nom}
                          placeholder="Taper le Nom de l'entreprise ici ..."
                          onBlur={(e) =>
                            searchFieldChanged("Nom", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("Nom", e)}
                        />
                      </th>

                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {entreprises.data.map((entreprise) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={entreprise.id}
                      >
                        {/* <td className="px-3 py-2 text-nowrap text-center">
                          {entreprise.id}
                        </td> */}
                        <th className="px-3 py-2 text-center text-black-300 hover:underline">
                          <Link href={route("entreprise.show", entreprise.id)}>
                            {entreprise.Nom}
                          </Link>
                        </th>
                        <td className="px-3 py-2 text-nowrap text-center">
                          {entreprise.created_at}
                        </td>
                        <td className="px-3 py-2 text-nowrap text-center">
                          {entreprise.createdBy.name}
                        </td>
                        <td className="px-3 py-2 text-nowrap text-center">
                          <div className="flex justify-center">
                            <Link
                              href={route("entreprise.edit", entreprise.id)}
                              style={{ width : 110, display : "flex", justifyContent : "space-between", alignItems : "center"}}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded button-link"
                            >
                              <AiOutlineEdit className="mr-1" /> Modifier
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={entreprises.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
