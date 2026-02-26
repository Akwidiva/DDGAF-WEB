import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import {
  ATTESTATION_STATUS_CLASS_MAP,
  ATTESTATION_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { Link, router, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import { FaEye, FaEdit, FaTrashRestore, FaArchive } from "react-icons/fa";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

export default function AttestationsTable({
  attestations,
  success,
  error,
  queryParams = null,
  hideProjectColumn = false,
}) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    console.log(value)
    console.log(name)
    console.log(queryParams)
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("attestation.index"), queryParams);
  };

  const searchFieldChange = (codeAttest, value) => {
    console.log(value)
    console.log(codeAttest)
    console.log(queryParams)
    if (value) {
      queryParams[codeAttest] = value;
    } else {
      delete queryParams[codeAttest];
    }

    router.get(route("attestation.index"), queryParams);
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
    router.get(route("attestation.index"), queryParams);
  };

  const restaurerAttestation = (attestation) => {
    if (
      !window.confirm("Êtes-vous sûr de vouloir restaurer l'attestation de " + attestation.nomSociete + "?")
    ) {
      return;
    }
    router.delete(route("attestation.destroy", attestation.id));
  };

  const [confirmingAttestationDeletion, setConfirmingAttestationDeletion] = useState(false);
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

  const [attestationToDisable, setAttestationToDisable] = useState(null);

  const confirmAttestationDeletion = (attestation) => {
    setAttestationToDisable(attestation);
    setConfirmingAttestationDeletion(true);
  };

  const deleteAttestation = (e) => {
    e.preventDefault();
    if (attestationToDisable) {
      archiverAttestation(attestationToDisable);
    }
  };

  const closeModal = () => {
    setConfirmingAttestationDeletion(false);
    reset();
  };

  const archiverAttestation = (attestation) => {
    destroy(route("attestation.destroy", attestation.id), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset(),
    });
  };

  return (
    <>
      {success && (
        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
          {error}
        </div>
      )}
      {/* <pre>{JSON.stringify(attestations, undefined, 2)}</pre> */}
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400">
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
              {!hideProjectColumn && (
                <th className="px-3 py-3 text-center">
                  Nom de l'exercice affilie{" "}
                </th>
              )}
              <TableHeading
                name="codeAttest"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Code de l'attestation
              </TableHeading>

              <TableHeading
                name="name"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                 Nom du particulier
              </TableHeading>

              <TableHeading
                name="status"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Statut
              </TableHeading>

              <TableHeading
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Date de creation
              </TableHeading>

              {/* <th className="px-3 py-3 text-center">Cree par</th> */}
              <th className="px-3 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-3"></th>
              {!hideProjectColumn && <th className="px-3 py-3"></th>}
              <th className="px-3 py-3 text-center">
                <TextInput
                  className="w-full"
                  defaultValue={queryParams.codeAttest}
                  placeholder="Code de l'attestation..."
                  onBlur={(e) =>
                    searchFieldChange("codeAttest", e.target.value)
                  }
                  onKeyPress={(e) => onKeyPress("codeAttest", e)}
                />
              </th>
              <th className="px-3 py-3 text-center">
                <TextInput
                  className="w-full"
                  defaultValue={queryParams.name}
                  placeholder="Nom du particulier..."
                  onBlur={(e) =>
                    searchFieldChanged("nomSociete", e.target.value)
                  }
                  onKeyPress={(e) => onKeyPress("nomSociete", e)}
                />
              </th> 
              <th className="px-3 py-3 text-center">
                <SelectInput
                  className="w-full"
                  defaultValue={queryParams.status}
                  onChange={(e) => searchFieldChanged("status", e.target.value)}
                >
                  <option value="">Selectionnez le statut</option>
                  {/** <option value="En_Attente">En Attente</option> */}
                  <option value="En_Cours">En Cours</option>
                  <option value="Archivee">Archivee</option>
                </SelectInput>
              </th>
              <th className="px-3 py-3"></th>
              {/* <th className="px-3 py-3"></th> */}
              <th className="px-3 py-3"></th>
              <th className="px-0 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {attestations.data.map((attestation) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={attestation.id}
              >
                <td className="px-3 py-2 text-center">{attestation.id}</td>
                {!hideProjectColumn && (
                  <td className="px-3 py-2 text-center">
                    {attestation.project.name}
                  </td>
                )}
                <th className="px-3 py-2 text-center text-black-100 hover:underline">
                  <Link href={route("attestation.show", attestation.id)}>
                    {attestation.codeAttest}
                  </Link>
                </th>
                <th className="px-3 py-2 text-center text-black-100 hover:underline">
                  <Link href={route("attestation.show", attestation.id)}>
                    {attestation.nomSociete}
                  </Link>
                </th>
                <td className="px-3 py-2 text-nowrap text-center">
                  <span
                    className={
                      "px-2 py-1 text-nowrap text-center rounded text-white " +
                      ATTESTATION_STATUS_CLASS_MAP[attestation.status]
                    }
                  >
                    {ATTESTATION_STATUS_TEXT_MAP[attestation.status]}
                  </span>
                  {attestation.status === "En_Cours" ? (
                    <AiOutlineCheckCircle className="inline-block ml-2 text-green-500" />
                  ) : (
                    <AiOutlineCloseCircle className="inline-block ml-2 text-red-500" />
                  )}
                </td>
                <td className="px-3 py-2 text-nowrap text-center">
                  {attestation.created_at}
                </td>
                {/* <td className="px-3 py-2 text-center ">
                  {attestation.createdBy.name}
                </td> */}
                <td className="px-3 py-2 whitespace-nowrap text-center">
                  <div className="flex space-x-1 items-center">
                    <Link
                      href={route(
                        "attestation.visualiserModel",
                        attestation.id
                      )}
                      style={{ width : 120, display : "flex", justifyContent : "space-between", alignItems : "center"}}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded button-link"
                    >
                      <FaEye className="icon" />
                      Visualiser
                    </Link>

                    {/* <Link
                      href={route("attestation.edit", attestation.id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded button-link"
                    >
                      <FaEdit className="icon" />
                      Editer
                    </Link> */}

                    {/* {attestation.status === "Archivee" ? (
                      <button
                        onClick={() => restaurerAttestation(attestation)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded button"
                      >
                        <FaTrashRestore className="icon" />
                        Restaurer
                      </button>
                    ) : (
                      <button
                        onClick={() => confirmAttestationDeletion(attestation)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded button"
                      >
                        <FaArchive className="icon" />
                        Archiver
                      </button>
                    )} */}
                    {/* <Modal
                      show={confirmingAttestationDeletion}
                      onClose={closeModal}
                    >
                      <form
                        onSubmit={(e) => deleteAttestation(e, attestation)}
                        className="p-6"
                      >
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          Confirmation d'archivage de l'attestation
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Êtes-vous sûr de vouloir archiver cette attestation ?
                          Cette opération est délicate et requiert votre mot de
                          passe.
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
                            Archiver l'attestation
                          </DangerButton>
                        </div>
                      </form>
                    </Modal> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={attestations.meta.links} />
    </>
  );
}
