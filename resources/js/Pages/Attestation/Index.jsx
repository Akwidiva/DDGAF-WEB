import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link } from "@inertiajs/react";

import AttestationsTable from "./AttestationsTable";
import { FiFilePlus } from 'react-icons/fi';
import { BiArchive } from "react-icons/bi";
import { motion } from 'framer-motion';
import PageTransition from "@/Components/PageTransition";

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
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#2FAC86] p-4 rounded-md shadow-md dark:shadow-emerald-900/50 text-white"
        >
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <BiArchive className="inline-block align-middle mr-1 text-xl" />
            </motion.div>
            <h2 className="font-semibold text-xl text-white leading-tight">
              ATTESTATIONS
            </h2>
          </div>
          <Link
            href={route("attestation.create")}
            className="flex items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="flex items-center bg-[#87888a] hover:bg-[#7a7b7d] text-white py-1 px-3 rounded shadow-md transition-colors gap-2"
            >
              <FiFilePlus className="text-lg" /> Générer une attestation
            </motion.button>
          </Link>
        </motion.div>
      }
    >
      <Head title="Attestations" />

      <PageTransition>
        <div className="py-6">
          <div className="max-w-7x2 mx-auto sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg transition-all hover:shadow-md"
            >
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <AttestationsTable
                  attestations={attestations}
                  queryParams={queryParams}
                  success={success}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </AuthenticatedLayout>
  );
}
