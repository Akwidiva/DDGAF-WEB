import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  ATTESTATION_STATUS_CLASS_MAP,
  ATTESTATION_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import {
  AiOutlineArrowLeft,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineMail,
} from "react-icons/ai";
import {
  BiDetail,
  BiCalendar,
  BiUser,
  BiMoney,
  BiBuilding,
  BiUserCheck,
  BiEdit,
  BiLink,
} from "react-icons/bi";

export default function Show({ auth, attestation, id, success, error }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-lg shadow-lg dark:shadow-emerald-900/50 text-white">
          <div className="flex-1">
            <p className="text-sm font-medium opacity-90">Attestation de Dématérialisation</p>
            <h2 className="font-bold text-3xl leading-tight mt-1">
              {attestation.nomSociete}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            <Link
              href={route("attestation.index")}
              className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg shadow transition-all duration-300 ease-in-out backdrop-blur-sm font-medium text-sm"
            >
              <AiOutlineArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Link>

            <Link
              href={route("attestation.sendEmail", attestation.id)}
              method="post"
              as="button"
              className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg shadow transition-all duration-300 ease-in-out font-medium text-sm"
            >
              <AiOutlineMail className="h-4 w-4 mr-2" />
              Envoyer par Email
            </Link>

            <Link
              href={route("attestation.edit", attestation.id)}
              className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg shadow transition-all duration-300 ease-in-out font-medium text-sm"
            >
              <AiOutlineEdit className="h-4 w-4 mr-2" />
              Éditer
            </Link>

            <Link
              href={route("attestation.visualiserModel", attestation.id)}
              className="inline-flex items-center bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-lg shadow transition-all duration-300 ease-in-out font-medium text-sm"
            >
              <AiOutlineEye className="h-4 w-4 mr-2" />
              Visualiser
            </Link>
          </div>
        </div>
      }
    >
      <Head title={`Attestation-${attestation.nomSociete}`} />
      
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          
          {success && (
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg mb-6 text-emerald-700 font-medium shadow-sm">
              ✓ {success}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6 text-red-700 font-medium shadow-sm">
              ✕ {error}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            {/* Company Information Card */}
            <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 p-4 border-b border-emerald-200 dark:border-emerald-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Informations de l'Entreprise</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid gap-6 grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                      <BiBuilding className="h-4 w-4 mr-2" />
                      NOM DE L'ENTREPRISE
                    </div>
                    <p className="text-gray-900 dark:text-white font-semibold text-lg">{attestation.nomSociete}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                      <BiDetail className="h-4 w-4 mr-2" />
                      ABRÉVIATION
                    </div>
                    <p className="text-gray-900 dark:text-white font-semibold text-lg">{attestation.abreviation}</p>
                  </div>
                </div>

                <div className="grid gap-6 grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                      <BiUser className="h-4 w-4 mr-2" />
                      NUMÉRO RCCM
                    </div>
                    <p className="text-gray-900 dark:text-white font-semibold">{attestation.numeroRCCM}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                      <BiUser className="h-4 w-4 mr-2" />
                      NIU
                    </div>
                    <p className="text-gray-900 dark:text-white font-semibold">{attestation.NIU}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                      <AiOutlineMail className="h-4 w-4 mr-2" />
                      EMAIL DE L'ENTREPRISE
                    </div>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {attestation.entreprise?.email ? (
                        <span className="text-emerald-600 dark:text-emerald-400">{attestation.entreprise.email}</span>
                      ) : (
                        <span className="text-gray-400 italic">Non fourni</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Key Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 p-4 border-b border-emerald-200 dark:border-emerald-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Statut</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-7xl font-bold text-gray-200 dark:text-gray-700 text-center -mb-2">{attestation.id}</p>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 font-medium">ID</p>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg text-center">
                    <span className={"px-4 py-2 rounded-lg text-white font-bold text-sm inline-block " + ATTESTATION_STATUS_CLASS_MAP[attestation.status]}>
                      {ATTESTATION_STATUS_TEXT_MAP[attestation.status]}
                    </span>
                  </div>
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs font-medium">
                      <BiCalendar className="h-4 w-4 mr-2" />
                      DATE CRÉATION
                    </div>
                    <p className="text-gray-900 dark:text-white text-sm font-semibold">{attestation.created_at}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Securities Information */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/30 dark:to-slate-800/30 p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Valeurs Mobilières</h3>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                    <BiUser className="h-4 w-4 mr-2" />
                    CODE ADHÉRENT
                  </div>
                  <p className="text-gray-900 dark:text-white font-bold text-xl">{attestation.codeAdherent}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                    <BiMoney className="h-4 w-4 mr-2" />
                    VALEUR
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold">{attestation.valeur}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                    <BiDetail className="h-4 w-4 mr-2" />
                    CODE VALEUR (ISIN)
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold">{attestation.codeValeur}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                    <BiDetail className="h-4 w-4 mr-2" />
                    NUMÉRO D'AVIS
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold">{attestation.numeroAvis}</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                    <BiDetail className="h-4 w-4 mr-2" />
                    QUANTITÉ TITRES COLLECTÉS
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">{attestation.quantiteTitresCollectes}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                    <BiDetail className="h-4 w-4 mr-2" />
                    TOTAL COLLECTÉ
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">{attestation.quantiteTitresCollectesTotale}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                  <BiBuilding className="h-4 w-4 mr-2" />
                  TENEUR DE COMPTES-TITRES
                </div>
                <p className="text-gray-900 dark:text-white font-semibold">{attestation.teneurDeComptesTitres}</p>
              </div>
            </div>
          </div>

          {/* Audit Information */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-4 border-b border-orange-200 dark:border-orange-700">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">CRÉÉ PAR</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-900 dark:text-white font-semibold">{attestation.createdBy.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{attestation.created_at}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30 p-4 border-b border-cyan-200 dark:border-cyan-700">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">MODIFIÉ PAR</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-900 dark:text-white font-semibold">{attestation.updatedBy.name}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-r from-rose-50 to-rose-100 dark:from-rose-900/30 dark:to-rose-800/30 p-4 border-b border-rose-200 dark:border-rose-700">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">ASSIGNÉ À</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-900 dark:text-white font-semibold">{attestation.assignedUser.name}</p>
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 p-4 border-b border-emerald-200 dark:border-emerald-700">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Projet Affilié</h3>
            </div>
            <div className="p-6">
              <Link 
                href={route("project.show", attestation.project.id)} 
                className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors duration-200"
              >
                <BiLink className="h-5 w-5 mr-2" />
                Exercice {attestation.project.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
