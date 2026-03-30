import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { AiOutlineArrowLeft, AiOutlineEdit } from "react-icons/ai";
import {
  BiDetail,
  BiBuilding,
  BiUserCheck,
} from "react-icons/bi";

export default function Show({ auth, service }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#2FAC86] p-4 rounded-md shadow-md dark:shadow-emerald-900/50 text-white">
          <h2 className="font-semibold text-xl text-white leading-tight">
            {`Service  ${service.Nom}`}
          </h2>

          <div className="flex flex-wrap gap-3">
            <Link
              href={route("service.index", service.id)}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded shadow transition-colors duration-300 ease-in-out"
            >
              <AiOutlineArrowLeft className="h-5 w-5 mr-2" />
              Retour
            </Link>

            <Link
              href={route("service.edit", service.id)}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded shadow transition-colors duration-300 ease-in-out"
            >
              <AiOutlineEdit className="h-5 w-5 mr-2" />
              Éditer
            </Link>
          </div>
        </div>
      }
    >
      <Head title={`Service "${service.Nom}"`} />
     
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <div className="grid gap-8 grid-cols-2 pt-2">
              <div>
                <div>
                  <BiDetail className="inline-block mr-2" />
                  <label className="font-bold text-lg">IDENTIFIANT</label>
                  <p className="mt-1">{service.id}</p>
                </div>
                <div className="mt-4">
                  <BiBuilding className="inline-block mr-2" />
                  <label className="font-bold text-lg">NOM DU SERVICE</label>
                  <p className="mt-1">{service.Nom}</p>
                </div>
                <div className="mt-4">
                  <BiDetail className="inline-block mr-2" />
                  <label className="font-bold text-lg">ABREVIATION</label>
                  <p className="mt-1">{service.Abreviation}</p>
                </div>
                <div className="mt-4">
                  <BiUserCheck className="inline-block mr-2" />
                  <label className="font-bold text-lg">DESCRIPTION</label>
                  <p>{service.Description}</p>
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
