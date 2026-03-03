import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import React from "react";

const Model = ({ auth, attestation }) => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#2FAC86] p-4 rounded-md shadow-md text-white">
          <h2 className="font-semibold text-xl text-white leading-tight">
            {`Attestation de  "${attestation.nomSociete}"`}
          </h2>

          <div className="flex flex-wrap gap-3">
            <Link
              href={route("attestation.telechargerModel", attestation.id)}
              className="bg-[#87888a] hover:bg-[#7a7b7d] text-white py-1 px-3 rounded shadow transition-colors duration-300 ease-in-out"
            >
              Télécharger
            </Link>
          </div>
        </div>
      }
    >
      <Head title={`Attestation "${attestation.nomSociete}"`} />
      <pre>{/* {JSON.stringify(attestation, undefined, 2)} */}</pre>
      <div name="pdf">
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 px-12 text-gray-900 dark:text-gray-100">
                <div
                  className="bg-white p-12 px-12 sm:rounded-lg flex items-center flex-col "
                  style={{ color: "black" }}
                >
                  <div className="max-w-3xl bg-white mx-12 p-12">
                    <div className="pt-5 flex items-center flex-col ">
                      Attestation de Dematerialisation des valeurs mobilieres{" "}
                      {attestation.project.name}
                    </div>
                    <div className="pt-5 pb-3 flex items-center justify-center">
                      N°<b>__________</b>/CAA/DG/DDGAF/SDD/SPCSPD/cra
                    </div>
                    <p>
                      La Caisse Autonome d'Amortissement, Conservateur des
                      Valeurs Mobilieres non côtées, agissant en vertu de
                      l'article trentième de la Loi de finances 2019,
                    </p>
                    <p>
                      Atteste que la{" "}
                      <strong style={{ textTransform: "uppercase" }}>
                        {" "}
                        {attestation.nomSociete}{" "}
                      </strong>
                      , en abrégé <strong> {attestation.abreviation} </strong>
                      au capital de{" "}
                      <strong style={{ textTransform: "uppercase" }}>
                        {" "}
                        fcfa {attestation.capital}{" "}
                      </strong>
                      ,
                      <strong style={{ textTransform: "uppercase" }}>
                        {" "}
                        N°RCCM : {attestation.numeroRCCM}{" "}
                      </strong>
                      ,
                      <strong style={{ textTransform: "uppercase" }}>
                        {" "}
                        NIU : {attestation.NIU}{" "}
                      </strong>
                      , a rempli les conditions fixées pas{" "}
                      <strong style={{ textTransform: "uppercase" }}>
                        {" "}
                        l'avis N°{attestation.numeroAvis}{" "}
                      </strong>
                      ,
                      <em style={{ textTransform: "none" }}>
                        {" "}
                        {attestation.date}{" "}
                      </em>
                      , à savoir :{" "}
                    </p>
                    <ol>
                      <li>
                        La codification et l'inscription en compte des valeurs
                        mobilières qu'elle a émises ;
                      </li>
                      <li>
                        Le dépôt des certificats physiques d'actions collectés
                        auprès de ses actionnaires accompagnes des autorisations
                        de destruction ;
                      </li>
                      <li>
                        La transmission des modalites de tenue des comptes tires
                        (copie de la convention de mandat signee avec une
                        societe de bourse agreee ou descriptif du logicielde
                        gestion titres acquis) ;
                      </li>
                      <li>
                        La transmission des extraits de compte generes au{" "}
                        <b>31 decembre 2023</b> (Attestation de propriete,
                        compte global d'emission, journal general des
                        operations, historique du compte de chaque actionnaire,
                        tableau de suivi des actions en desherence, etc...);
                      </li>
                      <li>
                        La transmission du registre des titres nominatifs a
                        date;
                      </li>
                      <li>
                        Le reglement des commissions dues a la CAA (codification
                        et inscription en compte, Opertation sur titre, Droit de
                        grade annuel <b>2024</b>);
                      </li>
                    </ol>
                    <p className="bg-white p-4 sm:rounded-lg flex w1-100 flex-col max-w-2xl ">
                      Suivant les caracteristiques ci-apres :{" "}
                    </p>
                    <ul>
                      <li>
                        Code adherent : <b>{attestation.codeAdherent}</b>
                      </li>
                      <li>
                        valeur : <b>{attestation.valeur}</b>
                      </li>
                      <li>
                        Code Valeur (ISIN) : <b>{attestation.codeValeur}</b>
                      </li>
                      <li>
                        Quantite titres collectes :{" "}
                        <b>{attestation.quantiteTitresCollectes}</b>
                      </li>
                      <li>
                        teneur de comptes titres :{" "}
                        <b>{attestation.teneurDeComptesTitres}</b>
                      </li>
                    </ul>

                    <p className="bg-white p-4">
                      En foi de quoi la presente attestation de
                      dematerialisation, valable pour l'annee <b>2024</b> a
                      annexer a la Declaration Statique et fiscale (DSF) de{" "}
                      <b>2023</b>, lui est delivree pour servir ce que de droit.
                    </p>
                  </div>
                  {/* <img src={(new QRCode)->render($data)} alt="QR Code" />; */}
                  {/* {{!! QRCode::Size(100)->generate(Request::url) !!}} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Model;
