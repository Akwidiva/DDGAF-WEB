import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import Modal from "@/Components/Modal";
import { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import {
  AiOutlineEdit,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { FiUserPlus } from 'react-icons/fi'; // Import de l'icône UserPlus
import { BiUserCheck, BiUserPin, BiUserX } from "react-icons/bi";

export default function Index({ auth, users, services, queryParams = null, success }) {

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

  const [userToDisable, setUserToDisable] = useState(null);

  const confirmUserDeletion = (user) => {
    setUserToDisable(user);
    setConfirmingUserDeletion(true);
  };

  const deleteUser = (e) => {
    e.preventDefault();
    if (userToDisable) {
      desactiverCompte(userToDisable);
    }
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    setUserToDisable(null);
    reset();
  };

  const desactiverCompte = (user) => {
    destroy(route("user.destroy", user.id), {
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

    router.get(route("user.index"), queryParams);
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
    router.get(route("user.index"), queryParams);
  };

  const reActiverCompte = (user) => {
    if (
      !window.confirm(
        "Êtes-vous sûr de vouloir activer a nouveau le compte de " +
        user.name +
        "?"
      )
    ) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };


  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#2FAC86] p-4 rounded-md shadow-md dark:shadow-emerald-900/50 text-white">
          <h2 className="font-semibold text-xl text-white leading-tight">
            Comptes Utilisateurs
          </h2>
          <Link
            href={route("user.create")}
            className="flex items-center bg-[#87888a] hover:bg-[#7a7b7d] text-white py-1 px-3 rounded shadow-md transition-colors"
          >
            <FiUserPlus className="mr-2" /> Ajouter un compte
          </Link>
        </div>
      }
    >
      <Head title="Comptes-Utilisateurs" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
          {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap text-center">
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
                        NOMS
                      </TableHeading>

                      <TableHeading
                        name="email"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        E-Mail
                      </TableHeading>

                      <TableHeading
                        name="role"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ROLE
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

                      <th className="px-3 py-3 text-center ">ACTIONS</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="Noms de l'utilisateur"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="E-Mail de l'utilisateur"
                          onBlur={(e) =>
                            searchFieldChanged("email", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("email", e)}
                        />
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.data.map((user, index) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={user.id}
                      >
                        <td className="px-3 py-2 text-nowrap text-center">
                          {index + 1} {/* Affiche le numéro qui s'incrémente */}
                        </td>
                        <th className="px-3 py-2 text-black-300 text-nowrap hover:underline text-center">
                          <Link href={route("user.show", user.id)}>
                            {user.name}
                          </Link>
                        </th>
                        <td className="px-3 py-2 text-nowrap text-center">
                          {user.email}
                        </td>

                        <td className="px-3 py-2 text-center text-black-200 rounded inline-block ">
                          {/* Assurez-vous que 'service' est correctement défini */}
                          {user.service ? user.service.Abreviation : 'Aucun service'}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span
                            className={
                              "px-2 py-1 rounded text-white inline-block " +
                              USER_STATUS_CLASS_MAP[user.status]
                            }
                          >
                            {USER_STATUS_TEXT_MAP[user.status]}
                          </span>
                          {user.status === "active" ? (
                            <AiOutlineCheckCircle className="inline-block ml-2 text-green-500" />
                          ) : (
                            <AiOutlineCloseCircle className="inline-block ml-2 text-red-500" />
                          )}
                        </td>
                        <td className="px-3 py-2 text-nowrap text-center">
                          {user.created_at}
                        </td>
                        <td className="px-3 py-2 text-nowrap text-center">
                          <div className="flex items-center">
                            <Link
                              href={route("user.edit", user.id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center mr-4"
                            >
                              <AiOutlineEdit className="mr-1" /> Modifier
                            </Link>

                            {user.status === "disabled" ? (
                              <button
                                onClick={() => reActiverCompte(user)}
                                className="font-medium text-green-600 dark:text-green-500 hover:underline flex items-center"
                              >
                                <BiUserCheck className="mr-1" />{" "}
                                Activer
                              </button>
                            ) : (
                              <button
                                onClick={() => confirmUserDeletion(user)}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline flex items-center"
                              >
                                <BiUserX className="mr-1" />{" "}
                                Désactiver
                              </button>
                            )}
                          </div>
                          {/* Modal moved outside the loop (see below) */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Single Modal instance for disabling a user */}
              <Modal show={!!userToDisable} onClose={() => { }}>
                <form onSubmit={(e) => deleteUser(e)} className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Confirmation de désactivation du compte
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {userToDisable
                      ? `Êtes-vous sûr de vouloir désactiver le compte de ${userToDisable.name} ? Cette opération est délicate et requiert votre mot de passe.`
                      : 'Êtes-vous sûr de vouloir désactiver ce compte ? Cette opération est délicate et requiert votre mot de passe.'}
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
                      onChange={(e) => setData("password", e.target.value)}
                      className="mt-1 block w-full border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                      placeholder="Entrez votre mot de passe"
                    />
                    <InputError message={errors.password} className="mt-2 text-sm text-red-500" />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal} disabled={processing}>
                      Annuler
                    </SecondaryButton>
                    <DangerButton type="submit" className="ms-3" disabled={processing}>
                      Désactiver le Compte
                    </DangerButton>
                  </div>
                </form>
              </Modal>

              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
