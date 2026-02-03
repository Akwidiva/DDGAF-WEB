import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import AttestationsTable from "./Attestation/AttestationsTable";
import { FiBarChart2, FiCalendar, FiLayers, FiUsers } from "react-icons/fi"; // Import de l'icône BarChart2
import { BiArchive, BiUser, BiSolidUserDetail, } from "react-icons/bi";
import { FiTool, } from 'react-icons/fi'; // Import des icônes nécessaires 
import { AiOutlineBank, } from "react-icons/ai";
import { FaObjectGroup, FaObjectUngroup, FaRegObjectUngroup } from "react-icons/fa";

export default function Dashboard({
  auth,
  myProgressAttestations,
  totalProgressAttestations,

  myArchiveAttestations,
  totalArchiveAttestations,
  success,
  attestations,
  queryParams = null,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md">
          <div className="flex items-center">
            <FiBarChart2 className="text-gray-600 dark:text-gray-300 mr-2" />
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              TABLEAU DE BORD
            </h2>
          </div>
        </div>
      }
    >
      <Head title="TABLEAU DE BORD" />
      {auth.user.role === "user" ? (
        <div className="py-8">
          <div className="py-4 flex justify-center">
            <div className="max-w-7xl sm:px-6 lg:px-8 mt-4">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-center text-gray-900 dark:text-gray-100">
                  <h3 className="text-3xl font-semibold mb-4">
                    Bienvenue, Utilisateur !
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Maintenant vous êtes connecté(e), que souhaitez-vous faire
                    ensuite ?
                  </p>
                  <div className="mt-6 flex justify-center gap-4">
                    <Link href="attestation/mes-attestations">
                      <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
                        <BiArchive className="inline-block mr-2" />
                        Gérer vos attestations
                      </button>
                    </Link>
                    <Link href="entreprise">
                      <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
                        <AiOutlineBank className="inline-block align-middle mr-1" />
                        Gérer les entreprises
                      </button>
                    </Link>
                    <Link href="/profile">
                      <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
                        <BiSolidUserDetail className="inline-block mr-2" />
                        Gérer votre Profil
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-2 gap-2">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex flex-col items-center justify-center">
              <div className="p-6 text-gray-900 dark:text-gray-100 text-center">
                <h3 className="text-blue-500 text-xl font-semibold">
                  Mes Attestations En Cours
                </h3>
                <p className="text-xl mt-4 flex items-center justify-center">
                  <span className="text-6xl font-bold text-blue-500">
                    {myProgressAttestations}
                  </span>
                  <span className="text-gray-500 text-2xl ml-1">
                    /{totalProgressAttestations}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex flex-col items-center justify-center">
              <div className="p-6 text-gray-900 dark:text-gray-100 text-center">
                <h3 className="text-green-500 text-xl font-semibold">
                  Mes Attestations Archivées
                </h3>
                <p className="text-xl mt-4 flex items-center justify-center">
                  <span className="text-6xl font-bold text-green-500">
                    {myArchiveAttestations}
                  </span>
                  <span className="text-gray-500 text-2xl ml-1">
                    /{totalArchiveAttestations}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="py-8">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <AttestationsTable
                    attestations={attestations}
                    queryParams={queryParams}
                    success={success}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 flex justify-center items-center">
          <div className="max-w mx-auto bg-white dark:bg-gray-800 overflow-hidden shadow-md sm:rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-semibold mb-4 dark:text-gray-300">
              Bienvenue à vous !
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Vous êtes maintenant connecté. Que souhaitez-vous faire ensuite ?
            </p>
            <div className="mt-6 flex justify-center items-center gap-4">
              <Link href="/user">
                <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all duration-300">
                  <FiUsers className="inline-block mr-2" />
                  Gérer les utilisateurs
                </button>
              </Link>
              <span className="mx-2 text-gray-400 ">|</span>
              <Link href="/service">
                <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all duration-300">
                  <FiLayers className="inline-block align-middle mr-1" />
                  Gérer les services
                </button>
              </Link>
              <span className="mx-2 text-gray-400 ">|</span>
              <Link href="/profile">
                <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all duration-300">
                  <FiCalendar className="inline-block mr-2" />
                  Gérer les exercices
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
