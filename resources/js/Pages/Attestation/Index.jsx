import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link } from "@inertiajs/react";

import AttestationsTable from "./AttestationsTable";
import { FiFilePlus } from 'react-icons/fi'; // Import de l'icône FileText
import { BiCheckCircle, BiArchive, BiUser, BiCog, BiUserPlus, BiSolidUserDetail } from "react-icons/bi";

export default function Index({
  auth,
  success,
  attestations,
  queryParams = null,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#2FAC86] p-4 rounded-md shadow-md text-white">
          <div className="flex items-center">
            <BiArchive className="inline-block align-middle mr-1" />
            <h2 className="font-semibold text-xl text-white leading-tight">
              ATTESTATIONS
            </h2>
          </div>
          <Link
            href={route("attestation.create")}
            className="flex items-center bg-[#87888a] hover:bg-[#7a7b7d] text-white py-1 px-3 rounded shadow-md transition-colors"
          >
            <FiFilePlus className="mr-2" /> Générer une attestation
          </Link>
        </div>
      }
    >
      <Head title="Attestations" />

      <div className="py-6">
        <div className="max-w-7x2 mx-auto sm:px-6 lg:px-8">
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
    </AuthenticatedLayout>
  );
}
