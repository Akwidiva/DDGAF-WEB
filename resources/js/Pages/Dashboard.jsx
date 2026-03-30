import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import AttestationsTable from "./Attestation/AttestationsTable";
import { FiBarChart2, FiCalendar, FiLayers, FiUsers } from "react-icons/fi";
import { BiArchive, BiUser, BiSolidUserDetail } from "react-icons/bi";
import { FiTool } from 'react-icons/fi';
import { AiOutlineBank } from "react-icons/ai";
import { FaObjectGroup, FaObjectUngroup, FaRegObjectUngroup } from "react-icons/fa";
import { motion } from 'framer-motion';
import { animations } from '@/utils/AnimationConfig';

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
  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    whileHover: { y: -8, scale: 1.02 }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

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
              <FiBarChart2 className="text-white mr-2" />
            </motion.div>
            <h2 className="font-semibold text-xl text-white leading-tight">
              TABLEAU DE BORD
            </h2>
          </div>
        </motion.div>
      }
    >
      <Head title="TABLEAU DE BORD" />
      {auth.user.role === "user" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="py-8"
        >
          <div className="py-4 flex justify-center">
            <div className="max-w-7xl sm:px-6 lg:px-8 mt-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden rounded-3xl border border-emerald-100 dark:border-emerald-900 bg-gradient-to-br from-emerald-50 dark:from-gray-800 via-white dark:via-gray-800 to-emerald-50 dark:to-gray-800 shadow-xl dark:shadow-gray-900/50"
              >
                <div className="p-8 text-center text-gray-900 dark:text-gray-100">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-3xl font-semibold text-emerald-800 dark:text-emerald-400"
                  >
                    Bienvenue, Utilisateur !
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-3 text-lg text-emerald-900/80 dark:text-emerald-300/80"
                  >
                    Maintenant vous êtes connecté(e), que souhaitez-vous faire ensuite ?
                  </motion.p>
                  <motion.div
                    className="mt-8 flex flex-wrap justify-center gap-4"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <Link href="attestation/mes-attestations">
                      <motion.button
                        variants={cardVariants}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 rounded-2xl bg-emerald-500 dark:bg-emerald-600 px-5 py-3 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50 transition-all hover:bg-emerald-600 dark:hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-900/50"
                      >
                        <BiArchive className="text-xl" />
                        Gérer vos attestations
                      </motion.button>
                    </Link>
                    <Link href="entreprise">
                      <motion.button
                        variants={cardVariants}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 rounded-2xl bg-emerald-500 dark:bg-emerald-600 px-5 py-3 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50 transition-all hover:bg-emerald-600 dark:hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-900/50"
                      >
                        <AiOutlineBank className="text-xl" />
                        Gérer les entreprises
                      </motion.button>
                    </Link>
                    <Link href="/profile">
                      <motion.button
                        variants={cardVariants}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 rounded-2xl bg-emerald-500 dark:bg-emerald-600 px-5 py-3 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50 transition-all hover:bg-emerald-600 dark:hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-900/50"
                      >
                        <BiSolidUserDetail className="text-xl" />
                        Gérer votre Profil
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-2 gap-2"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="p-6 text-gray-900 dark:text-gray-100 text-center">
                <h3 className="text-blue-500 text-xl font-semibold">
                  Mes Attestations En Cours
                </h3>
                <motion.p
                  className="text-xl mt-4 flex items-center justify-center"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <span className="text-6xl font-bold text-blue-500">
                    {myProgressAttestations}
                  </span>
                  <span className="text-gray-500 text-2xl ml-1">
                    /{totalProgressAttestations}
                  </span>
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="p-6 text-gray-900 dark:text-gray-100 text-center">
                <h3 className="text-green-500 text-xl font-semibold">
                  Mes Attestations Archivées
                </h3>
                <motion.p
                  className="text-xl mt-4 flex items-center justify-center"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <span className="text-6xl font-bold text-green-500">
                    {myArchiveAttestations}
                  </span>
                  <span className="text-gray-500 text-2xl ml-1">
                    /{totalArchiveAttestations}
                  </span>
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg"
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
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="py-12 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
            className="max-w mx-auto bg-white dark:bg-gray-800 overflow-hidden shadow-md sm:rounded-lg p-6 text-center"
          >
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl font-semibold mb-4 dark:text-gray-300"
            >
              Bienvenue à vous !
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-lg text-gray-700 dark:text-gray-300"
            >
              Vous êtes maintenant connecté. Que souhaitez-vous faire ensuite ?
            </motion.p>
            <motion.div
              className="mt-6 flex justify-center items-center gap-4 flex-wrap"
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              <Link href="/user">
                <motion.button
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all duration-300"
                >
                  <FiUsers className="inline-block mr-2" />
                  Gérer les utilisateurs
                </motion.button>
              </Link>
              <span className="mx-2 text-gray-400 ">|</span>
              <Link href="/service">
                <motion.button
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all duration-300"
                >
                  <FiLayers className="inline-block align-middle mr-1" />
                  Gérer les services
                </motion.button>
              </Link>
              <span className="mx-2 text-gray-400 ">|</span>
              <Link href="/profile">
                <motion.button
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all duration-300"
                >
                  <FiCalendar className="inline-block mr-2" />
                  Gérer les exercices
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AuthenticatedLayout>
  );
}
