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
  AiOutlineMail, // --- ADDED THIS ICON ---
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
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#2FAC86] p-4 rounded-md shadow-md dark:shadow-emerald-900/50 text-white">
          <h2 className="font-semibold text-2xl text-white leading-tight">
            {`Attestation de ${attestation.nomSociete}`}
          </h2>

          <div className="flex flex-wrap gap-3">
            <Link
              href={route("attestation.index")}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded shadow transition-colors duration-300 ease-in-out"
            >
              <AiOutlineArrowLeft className="h-5 w-5 mr-2" />
              Retour
            </Link>

            {/* --- ADDED: THE SEND EMAIL BUTTON --- */}
            <Link
              href={route("attestation.sendEmail", attestation.id)}
              method="post"
              as="button"
              className="flex items-center bg-[#87888a] hover:bg-[#7a7b7d] text-white py-1 px-3 rounded shadow transition-colors duration-300 ease-in-out"
            >
              <AiOutlineMail className="h-5 w-5 mr-2" />
              Envoyer par Email
            </Link>
            {/* --- END OF ADDED BUTTON --- */}

            <Link
              href={route("attestation.edit", attestation.id)}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded shadow transition-colors duration-300 ease-in-out"
            >
              <AiOutlineEdit className="h-5 w-5 mr-2" />
              Éditer
            </Link>

            <Link
              href={route("attestation.visualiserModel", attestation.id)}
              className="flex items-center bg-[#87888a] hover:bg-[#7a7b7d] text-white py-1 px-3 rounded shadow transition-colors duration-300 ease-in-out"
            >
              <AiOutlineEye className="h-5 w-5 mr-2" />
              Visualiser
            </Link>
          </div>
        </div>
      }
    >
      <Head title={`Attestation-${attestation.nomSociete}`} />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          
          {/* --- ADDED: SUCCESS/ERROR MESSAGE ALERT --- */}
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-500 py-2 px-4 text-white rounded mb-4">
              {error}
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-8 grid-cols-3 mt-2">
                <div>
                  <div>
                    <BiDetail className="inline-block mr-2" />
                    <label className="font-bold text-lg">IDENTIFIANT</label>
                    <p className="mt-1">{attestation.id}</p>
                  </div>
                  <div className="mt-4">
                    <BiBuilding className="inline-block mr-2" />
                    <label className="font-bold text-lg">NOM DU PROPRIETAIRE</label>
                    <p className="mt-1">{attestation.nomSociete}</p>
                  </div>
                  
                  {/* --- ADDED: DISPLAY EMAIL FIELD --- */}
                  <div className="mt-4">
                    <AiOutlineMail className="inline-block mr-2" />
                    <label className="font-bold text-lg">EMAIL DE L'ENTREPRISE</label>
                    <p className="mt-1 text-emerald-400 font-semibold">
                      {attestation.entreprise?.email || "Aucun email fourni"}
                    </p>
                  </div>

                  <div className="mt-4">
                    <BiDetail className="inline-block mr-2" />
                    <label className="font-bold text-lg">ABREVIATION</label>
                    <p className="mt-1">{attestation.abreviation}</p>
                  </div>
                  <div className="mt-4">
                    <BiUserCheck className="inline-block mr-2" />
                    <label className="font-bold text-lg">STATUT DE L'ATTESTATION</label>
                    <p className="mt-2">
                      <span className={"px-2 py-1 rounded text-white " + ATTESTATION_STATUS_CLASS_MAP[attestation.status]}>
                        {ATTESTATION_STATUS_TEXT_MAP[attestation.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-6">
                    <BiCalendar className="inline-block mr-2" />
                    <label className="font-bold text-lg">DATE</label>
                    <p className="mt-1">{attestation.date}</p>
                  </div>
                </div>

                <div>
                  <div className="mt-1">
                    <BiUser className="inline-block mr-2" />
                    <label className="font-bold text-lg">NIU</label>
                    <p className="mt-1">{attestation.NIU}</p>
                  </div>
                  <div className="mt-4">
                    <BiDetail className="inline-block mr-2" />
                    <label className="font-bold text-lg">NUMERO AVIS</label>
                    <p className="mt-1">{attestation.numeroAvis}</p>
                  </div>
    
                  <div className="mt-4">
                    <BiUser className="inline-block mr-2" />
                    <label className="font-bold text-lg">CODE ADHERENT</label>
                    <p className="mt-1">{attestation.codeAdherent}</p>
                  </div>
                  <div className="mt-4">
                    <BiMoney className="inline-block mr-2" />
                    <label className="font-bold text-lg">VALEUR</label>
                    <p className="mt-1">{attestation.valeur}</p>
                  </div>
                  <div className="mt-4">
                    <BiDetail className="inline-block mr-2" />
                    <label className="font-bold text-lg">CODE VALEUR</label>
                    <p className="mt-1">{attestation.codeValeur}</p>
                  </div>
                  <div className="mt-4">
                    <BiDetail className="inline-block mr-2" />
                    <label className="font-bold text-lg">QUANTITE TITRES COLLECTES</label>
                    <p className="mt-1">{attestation.quantiteTitresCollectes}</p>
                  </div>
                  <div className="mt-4">
                    <BiDetail className="inline-block mr-2" />
                    <label className="font-bold text-lg">QUANTITE TITRES COLLECTES TOTALE</label>
                    <p className="mt-1">{attestation.quantiteTitresCollectesTotale}</p>
                  </div>
                  <div className="mt-4">
                    <BiDetail className="inline-block mr-2" />
                    <label className="font-bold text-lg">TENEUR DE COMPTE TITRES</label>
                    <p className="mt-1">{attestation.teneurDeComptesTitres}</p>
                  </div>
                </div>

                <div>
                  <div className="mt-1">
                    <BiCalendar className="inline-block mr-2" />
                    <label className="font-bold text-lg">DATE DE CREATION</label>
                    <p className="mt-1">{attestation.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <BiEdit className="inline-block mr-2" />
                    <label className="font-bold text-lg">CREE PAR</label>
                    <p className="mt-1">{attestation.createdBy.name}</p>
                  </div>
                  <div className="mt-4">
                    <BiEdit className="inline-block mr-2" />
                    <label className="font-bold text-lg">EDITE PAR</label>
                    <p className="mt-1">{attestation.updatedBy.name}</p>
                  </div>
                  <div className="mt-4">
                    <BiLink className="inline-block mr-2" />
                    <label className="font-bold text-lg">PROJET AFFILIE</label>
                    <p className="mt-1">
                      <Link href={route("project.show", attestation.project.id)} className="hover:underline">
                        {attestation.project.name}
                      </Link>
                    </p>
                  </div>
                  <div className="mt-4">
                    <BiUserCheck className="inline-block mr-2" />
                    <label className="font-bold text-lg">UTILISATEUR ASSIGNE</label>
                    <p className="mt-1">{attestation.assignedUser.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
