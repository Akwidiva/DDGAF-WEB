import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { AiOutlineArrowLeft, AiOutlineEdit } from "react-icons/ai";
import {
  BiDetail,
  BiBuilding,
  BiUserCheck,
  BiMoney,
  BiUser,
  BiCalendar,
  BiEdit,
  BiLink,
} from "react-icons/bi";

export default function Show({ auth, entreprise }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Entreprise  "${entreprise.Nom}"`}
          </h2>

          <div className="flex space-x-4">
            <Link
              href={route("entreprise.index", entreprise.id)}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded shadow transition-colors duration-300 ease-in-out"
            >
              <AiOutlineArrowLeft className="h-5 w-5 mr-2" />
              Retour
            </Link>

            <Link
              href={route("entreprise.edit", entreprise.id)}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded shadow transition-colors duration-300 ease-in-out"
            >
              <AiOutlineEdit className="h-5 w-5 mr-2" />
              Éditer
            </Link>
          </div>
        </div>
      }
    >
      <Head title={`Entreprise "${entreprise.Nom}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-8 grid-cols-2 mt-2">
                <div>
                  <div className="mt-4">
                    <BiBuilding className="inline-block mr-2" />
                    <label className="font-bold text-lg">NOM DU PROPRIETAIRE</label>
                    <p className="mt-1">{entreprise.Nom}</p>
                  </div>
                  <div className="mt-4">
                    <BiDetail className="inline-block mr-2" />
                    <label className="font-bold text-lg">ABREVIATION</label>
                    <p className="mt-1">{entreprise.Abreviation}</p>
                  </div>
                  <div className="mt-4">
                    <BiMoney className="inline-block mr-2" />
                    <label className="font-bold text-lg">CAPITAL</label>
                    <p>{entreprise.Capital} Franc CFA</p>
                  </div>
                  <div className="mt-4">
                    <BiUserCheck className="inline-block mr-2" />
                    <label className="font-bold text-lg">CODE ADHESION</label>
                    <p className="mt-2">
                      {entreprise.codeAdherent}
                    </p>
                  </div>
                  <div className="mt-4">
                    <BiUserCheck className="inline-block mr-2" />
                    <label className="font-bold text-lg">NUMERO RCCM</label>
                    <p className="mt-2">
                      {entreprise.NumeroRCCM}
                    </p>
                  </div>
                  <div className="mt-4">
                    <BiUserCheck className="inline-block mr-2" />
                    <label className="font-bold text-lg">NIU</label>
                    <p className="mt-2">
                      {entreprise.NIU}
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <BiUser className="inline-block mr-2" />
                    <label className="font-bold text-lg">NUMERO AVIS</label>
                    <p className="mt-1">{entreprise.numeroAvis}</p>
                  </div>
                  <div className="mt-4">
                    <BiCalendar className="inline-block mr-2" />
                    <label className="font-bold text-lg">VALEUR</label>
                    <p className="mt-1">{entreprise.valeur}</p>
                  </div>
                  <div className="mt-4">
                    <BiCalendar className="inline-block mr-2" />
                    <label className="font-bold text-lg">CODE VALEUR</label>
                    <p className="mt-1">{entreprise.codeValeur}</p>
                  </div>
                  <div className="mt-4">
                    <BiCalendar className="inline-block mr-2" />
                    <label className="font-bold text-lg">QUANTITE TITRE COLLECTEE</label>
                    <p className="mt-1">{entreprise.QuantiteTitresCollectes} / {entreprise.QuantiteTitresCollectesTotale}</p>
                  </div>
                  <div className="mt-4">
                    <BiCalendar className="inline-block mr-2" />
                    <label className="font-bold text-lg">TENEUR DE COMPTES TITRES</label>
                    <p className="mt-1">{entreprise.TeneurDeComptesTitres}</p>
                  </div>
                </div>

              </div>
              <div className="flex justify-around my-5">
                <div className="mt-4">
                  <BiEdit className="inline-block mr-2" />
                  <label className="font-bold text-lg">CREE PAR</label>
                  <p className="mt-1">{entreprise.createdBy.name}</p>
                </div>
                <div className="mt-4">
                  <BiEdit className="inline-block mr-2" />
                  <label className="font-bold text-lg">EDITE PAR</label>
                  <p className="mt-1">{entreprise.updatedBy.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </AuthenticatedLayout>
  );
}
