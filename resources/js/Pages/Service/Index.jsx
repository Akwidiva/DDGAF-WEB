import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
// import Modal from "@/Components/Modal";
import { FiTool } from "react-icons/fi"; // Import de l'icône Tool
import {
  AiOutlineEdit,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BiLayerPlus, BiSolidLayerPlus } from "react-icons/bi";

export default function Index({ auth, services, queryParams = null, success }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("service.index"), queryParams);
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
    router.get(route("service.index"), queryParams);
  };

  const confirmServiceDeletion = (user) => {
    setUserToDisable(user);
    setConfirmingUserDeletion(true);
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset();
  };

  const BloquerService = (service) => {
    if (
      !window.confirm(
        "Êtes-vous sûr de vouloir bloquer le service " + service.Nom + "?"
      )
    ) {
      return;
    }
    router.delete(route("service.destroy", service.id));
  };
  
  const DebloquerService = (service) => {
    if (
      !window.confirm(
        "Êtes-vous sûr de vouloir bloquer le service " + service.Nom + "?"
      )
    ) {
      return;
    }
    router.delete(route("service.destroy", service.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#2FAC86] p-4 rounded-md shadow-md dark:shadow-emerald-900/50 text-white">
          <h2 className="font-semibold text-xl text-white leading-tight">
            SERVICES
          </h2>
          <Link
            href={route("service.create")}
            className="flex items-center bg-[#87888a] hover:bg-[#7a7b7d] text-white py-1 px-3 rounded shadow-md transition-colors"
          >
            <BiLayerPlus className="mr-2" /> Enregistrer un service
          </Link>
        </div>
      }
    >
      <Head title="Service" />

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
                        name="Nom"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        NOM
                      </TableHeading>
                      <th className="px-3 py-3 text-nowrap text-center">
                        ABREVIATION
                      </th>
                      {/* <th className="px-3 py-3 text-nowrap text-center">
                        DESCRIPTION
                      </th> */}
                      <th className="px-3 py-3 text-center">ACTIONS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {services.data.map((service) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={service.id}
                      >
                        <td className="px-3 py-2 text-nowrap text-center">
                          {service.id}
                        </td>

                        <th className="px-3 py-2 text-center text-black-300 hover:underline">
                          <Link href={route("service.show", service.id)}>
                            {service.Nom}
                          </Link>
                        </th>

                        <td className="px-3 py-2 text-nowrap text-center">
                          {service.Abreviation}
                        </td>
                        {/* <td className="px-3 py-2 text-center">
                          {service.Description}
                        </td> */}
                        <td className="px-3 py-2 text-nowrap text-center">
                          <div className="flex items-center">
                            <Link
                              href={route("service.edit", service.id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center mr-4"
                            >
                              <AiOutlineEdit className="mr-1" /> Modifier
                            </Link>

                            {service.Statut === "disable" ? (
                              <button
                                onClick={() => DebloquerService(service)}
                                className="font-medium text-green-600 dark:text-green-500 hover:underline flex items-center"
                              >
                                <AiOutlineCheckCircle className="mr-1" />{" "}
                                Activer
                              </button>
                            ) : (
                              <button
                                onClick={() => BloquerService(service)}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline flex items-center"
                              >
                                <AiOutlineCloseCircle className="mr-1" />{" "}
                                Désactiver
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={services.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
