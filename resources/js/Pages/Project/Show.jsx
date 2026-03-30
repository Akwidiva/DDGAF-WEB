import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import AttestationsTable from "../Attestation/AttestationsTable.jsx";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { FaIdCard, FaUser, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
      
export default function Show({
  auth,
  success,
  project,
  attestations,
  queryParams,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#2FAC86] p-4 rounded-md shadow-md dark:shadow-emerald-900/50 text-white">
          <h2 className="font-semibold text-xl text-white leading-tight">
            {`Exercice ${project.name}`}
          </h2>
          <div className="flex flex-wrap gap-3 justify-end">
            <Link
              href={route("project.index", project.id)}
              className="bg-red-500 py-1 px-3 mr-2 text-white rounded shadow transition-all hover:bg-red-600 flex items-center"
            >
              <FaArrowLeft className="mr-1" />
              Retour
            </Link>
            <Link
              href={route("project.edit", project.id)}
              className="bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600 flex items-center"
            >
              <FaEdit className="mr-1" />
              Editer
            </Link>
          </div>
        </div>
      }
    >
      <Head title={`Project-${project.name}`} />

      {/* <pre>{JSON.stringify(project, undefined, 2)}</pre> */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <FaIdCard className="inline-block mr-2" />
                    <label className="font-bold text-lg">
                      ID de l'exercice
                    </label>
                    <p className="mt-1">{project.id}</p>
                  </div>
                  <div className="mt-4">
                    <FaEdit className="inline-block mr-2" />
                    <label className="font-bold text-lg">
                      Nom de l'exercice
                    </label>
                    <p className="mt-1">{project.name}</p>
                  </div>
                  <div className="mt-4">
                    <FaInfoCircle className="inline-block mr-2" />
                    <label className="font-bold text-lg">
                      Statut de l'exercice
                    </label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          PROJECT_STATUS_CLASS_MAP[project.status]
                        }
                      >
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <FaUser className="inline-block mr-2" />
                    <label className="font-bold text-lg">Cree Par</label>
                    <p className="mt-1">{project.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <FaCalendarAlt className="inline-block mr-2" />
                    <label className="font-bold text-lg">Date d'Echeance</label>
                    <p className="mt-1">{project.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <FaCalendarAlt className="inline-block mr-2" />
                    <label className="font-bold text-lg">
                      Date de Creation
                    </label>
                    <p className="mt-1">{project.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <FaUser className="inline-block mr-2" />
                    <label className="font-bold text-lg">Edite Par</label>
                    <p className="mt-1">{project.updatedBy.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="font-bold text-lg">
                  Description de l'exercice
                </label>
                <p className="mt-1">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <AttestationsTable
                attestations={attestations}
                queryParams={queryParams}
                success={success}
                hideProjectColumn={true}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
