import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";

import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

export default function Create({
  auth,
  error,
  users,
  projects,
  entreprises,
}) {
  const currentYear = new Date().getFullYear();
  const projectList = useMemo(() => projects?.data ?? [], [projects]);
  const fieldInputClass = "mt-1 block w-full rounded-2xl border border-emerald-200 bg-white/85 text-gray-900 placeholder:text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500";
  const selectInputClass = "mt-1 block w-full rounded-2xl border border-emerald-200 bg-white/90 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500";

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  const now = new Date().toISOString().split('T')[0];
  const endOfYear = new Date(currentYear, 11, 31);
  const formattedEndOfYear = endOfYear.toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric"
  });

  const firstUser = users.data.find(user => user.role === 'user') || { id: '', service_id: '' };
  const firstProject = projectList.length > 0 ? projectList[0] : null;

  const extractYearFromDateString = (dateString) => {
    if (!dateString) {
      return null;
    }
    const [day, month, year] = dateString.split('-');
    const parsedYear = parseInt(year, 10);
    return Number.isNaN(parsedYear) ? null : parsedYear;
  };

  // Fonction pour formater la date au format YYYY-MM-DD si nécessaire
  const formatDateToISO = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`; // Retourner au format YYYY-MM-DD
  };

  const initialDateAvis = firstProject && firstProject.dateAvis
    ? formatDateToISO(firstProject.dateAvis) // Format si la date est dans un autre format
    : "";

  const firstProjectYear = firstProject ? extractYearFromDateString(firstProject.dateAvis) : null;

  const projectYears = useMemo(() => {
    return projectList
      .map((project) => extractYearFromDateString(project.dateAvis))
      .filter((year) => typeof year === "number");
  }, [projectList]);

  const earliestProjectYear = projectYears.length ? Math.min(...projectYears) : currentYear;
  const startYear = Math.min(currentYear, earliestProjectYear);
  const MAX_SELECTABLE_YEAR = 2050;
  const yearOptions = useMemo(() => {
    const years = [];
    for (let year = startYear; year <= MAX_SELECTABLE_YEAR; year += 1) {
      years.push(year);
    }
    return years;
  }, [startYear]);

  const { data, setData, post, errors, reset } = useForm({
    name: firstProject ? firstProject.name : '',
    // date: now,
    nomSociete: "",
    abreviation: "",
    status: "En_Cours",
    capital: "",
    numeroRCCM: "",
    NIU: "",
    numeroAvis: firstProject ? firstProject.numeroAvis : '', // Initialiser avec la valeur de numeroAvis du premier projet
    dateAvis: initialDateAvis, // Initialiser avec la valeur de dateAvis du premier projet
    codeAdherent: "",
    valeur: "",
    codeValeur: "",
    quantiteTitresCollectes: "",
    quantiteTitresCollectesTotale: "",
    teneurDeComptesTitres: "",
    assigned_user_id: firstUser.id || '',      // ID de l'utilisateur assigné
    service_id: firstUser.service_id || '',    // ID du service de l'utilisateur
    project_id: firstProject ? firstProject.id : '', // Par défaut, le project_id du premier projet
  });
  // console.log(date);

  const defaultYear = firstProjectYear ?? (yearOptions[0] ?? currentYear);
  const [selectedYear, setSelectedYear] = useState(defaultYear);

  useEffect(() => {
    if (!yearOptions.includes(selectedYear)) {
      setSelectedYear(yearOptions[0] ?? currentYear);
    }
  }, [yearOptions, selectedYear, currentYear]);

  const projectForSelectedYear = useMemo(() => {
    return projectList.find(
      (project) => extractYearFromDateString(project.dateAvis) === selectedYear
    ) || null;
  }, [projectList, selectedYear]);

  useEffect(() => {
    if (projectForSelectedYear) {
      setData((prev) => ({
        ...prev,
        project_id: projectForSelectedYear.id || '',
        name: projectForSelectedYear.name || '',
        numeroAvis: projectForSelectedYear.numeroAvis || '',
        dateAvis: projectForSelectedYear.dateAvis
          ? formatDateToISO(projectForSelectedYear.dateAvis)
          : '',
      }));
    } else {
      setData((prev) => ({
        ...prev,
        project_id: '',
        name: '',
        numeroAvis: '',
        dateAvis: '',
      }));
    }
  }, [projectForSelectedYear, setData]);

  const hasProjectForSelectedYear = Boolean(projectForSelectedYear);


  const onSubmit = (e) => {
    e.preventDefault();
    post(route("attestation.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#2FAC86] p-4 rounded-md shadow-md text-white">
          <h2 className="font-semibold text-xl text-white leading-tight">
            Creer une nouvelle attestation
          </h2>
        </div>
      }
    >

      {/* <pre>{JSON.stringify(error, undefined, 2)}</pre> */}

      <Head title="Attestations" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {error && (
            <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 py-2 px-4 text-rose-900">
              {error}
            </div>
          )}
          <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-[#eefcf5] via-white to-[#f6fffb] shadow-xl">
            <form
              onSubmit={onSubmit}
              className="space-y-6 p-6 sm:p-10"
            >

              {/* capture de la valeur pour assigned_user_id */}
              <div className="form-group">
                <TextInput
                  id="assigned_user_id"
                  name="assigned_user_id"
                  value={data.assigned_user_id}
                  className="hidden mt-1 block w-full"
                  readOnly
                />
                <InputError message={errors.assigned_user_id} className="mt-2" />
              </div>

              {/* Champ pour service_id */}
              <div className="form-group">
                <TextInput
                  id="service_id"
                  name="service_id"
                  value={data.service_id}
                  className="hidden mt-1 block w-full"
                  readOnly
                />
                <InputError message={errors.service_id} className="mt-2" />
              </div>
              <div>
                <InputLabel
                  htmlFor="project_year"
                  value="Exercice affilié"
                />
                <SelectInput
                  id="project_year"
                  name="project_year"
                  value={String(selectedYear)}
                  className={selectInputClass}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </SelectInput>
                {!hasProjectForSelectedYear && (
                  <p className="mt-2 text-sm text-red-600">
                    Aucun exercice n'est enregistré pour {selectedYear}. Veuillez en créer un avant de générer l'attestation.
                  </p>
                )}

                {/* pour capture la valeur de l'id de l'exercice */}
                <TextInput
                  id="project_id"
                  type="text"
                  name="project_id"
                  value={data.project_id}
                  className="hidden mt-1 block w-full"
                  readOnly // Empêche la modification manuelle
                />
                {/* capture du nom de l'exercice */}
                <TextInput
                  id="project_name"
                  type="text"
                  name="name"
                  value={data.name}
                  autoComplete="off"
                  className="hidden"
                  readOnly
                />
                <InputError message={errors.project_id} className="mt-2" />
              </div>

              <div className="mt-4 flex items-center">
                <div className="flex-1">
                  <InputLabel
                    htmlFor="attestation_name_dropdown"
                    value="Selectionner le Nom de l'entreprise "
                  />
                  <div className="flex items-center">
                    <SelectInput
                      id="attestation_name_dropdown"
                      name="nomSociete_dropdown"
                      value={data.nomSociete}
                      className={selectInputClass}
                      onChange={(e) => {
                        const selectedAtt = entreprises.data.find(
                          (att) => att.Nom === e.target.value
                        );
                        // on recupere toutes les informations relatives a l'entreprise ayant ete selectionne
                        if (selectedAtt) {
                          setData({
                            ...data,
                            nomSociete: e.target.value,
                            abreviation: selectedAtt.Abreviation,
                            capital: selectedAtt.Capital,
                            numeroRCCM: selectedAtt.NumeroRCCM,
                            NIU: selectedAtt.NIU,
                            quantiteTitresCollectes: selectedAtt.QuantiteTitresCollectes,
                            quantiteTitresCollectesTotale: selectedAtt.QuantiteTitresCollectesTotale,
                            teneurDeComptesTitres: selectedAtt.TeneurDeComptesTitres,
                            codeValeur: selectedAtt.codeValeur,
                            valeur: selectedAtt.valeur,
                            codeAdherent: selectedAtt.codeAdherent
                          });
                        }
                      }}
                    >
                      <option value="">
                        Sélectionnez le nom de l'entreprise
                      </option>
                      {entreprises.data.map((entreprise) => (
                        <option key={entreprise.id} value={entreprise.Nom}>
                          {entreprise.Nom}
                        </option>
                      ))}
                    </SelectInput>
                  </div>

                  <InputError message={errors.nomSociete} className="mt-2" />
                </div>
              </div>

              {/* capture de l'abreviation de l'entreprise */}
              <div className="mt-4">
                <InputLabel htmlFor="abreviation" value="Abreviation " />
                <TextInput
                  id="abreviation"
                  type="text"
                  name="abreviation"
                  value={data.abreviation}
                  className={fieldInputClass}
                  readOnly
                  onChange={(e) =>
                    setData("abreviation", e.target.value.toUpperCase())
                  }
                />
                <InputError message={errors.abreviation} className="mt-2" />
              </div>

              {/* Capture du capital */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="capital"
                  value="Capital de l'entreprise (en FCFA)"
                />
                <TextInput
                  id="capital"
                  type="text" // Changer le type à text
                  name="capital"
                  value={data.capital ? formatNumber(data.capital) : ""}
                  className={fieldInputClass}
                  readOnly
                  onChange={(e) => {
                    // Récupérer la valeur saisie
                    const inputValue = e.target.value;

                    // Supprimer tous les caractères non numériques
                    const numericValue = inputValue.replace(/\D/g, "");

                    // Mettre à jour les données avec le montant numérique
                    setData("capital", parseInt(numericValue, 10) || 0);
                  }}
                />
                <InputError message={errors.capital} className="mt-2" />
              </div>

              {/* capture du numero RCCM */}
              <div className="mt-4">
                <InputLabel htmlFor="numeroRCCM" value="Numero RCCM " />
                <TextInput
                  id="numeroRCCM"
                  type="text"
                  name="numeroRCCM"
                  value={data.numeroRCCM}
                  className={fieldInputClass}
                  readOnly
                  onChange={(e) =>
                    setData("numeroRCCM", e.target.value.toUpperCase())
                  }
                />
                <InputError message={errors.numeroRCCM} className="mt-2" />
              </div>

              {/* capture du NIU */}
              <div className="mt-4">
                <InputLabel htmlFor="NIU" value="NIU " />
                <TextInput
                  id="NIU"
                  type="text"
                  name="NIU"
                  value={data.NIU}
                  readOnly
                  className={fieldInputClass}
                  onChange={(e) => setData("NIU", e.target.value.toUpperCase())}
                />
                <InputError message={errors.NIU} className="mt-2" />
              </div>

              {/* capture de la QTC */}
              <div className="mt-4 flex flex-wrap">
                <div className="w-full md:w-1/2 mb-4 flex flex-col">
                  <label
                    htmlFor="quantiteTitresCollectes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quantité de Titres Collectés:
                  </label>
                  <input
                    id="quantiteTitresCollectes"
                    type="text"
                    name="quantiteTitresCollectes"
                    value={data.quantiteTitresCollectes}
                    className="mt-1 block w-full rounded-2xl border border-emerald-200 bg-white/85 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                    readOnly
                    onChange={(e) =>
                      setData(
                        "quantiteTitresCollectes",
                        e.target.value.toUpperCase()
                      )
                    }
                  />
                  <p className="mt-2 text-sm text-red-600">
                    {errors.quantiteTitresCollectes}
                  </p>
                </div>
                {/* capture de la QTCT */}
                <div className="w-full md:w-1/2 mb-4 flex items-center">
                  <span className="border-l-5 h-4 mx-2"> / </span>
                  <div className="w-full">
                    <label
                      htmlFor="quantiteTitresCollectesTotale"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantité de Titres Collectés Totale:
                    </label>
                    <input
                      id="quantiteTitresCollectesTotale"
                      type="text"
                      name="quantiteTitresCollectesTotale"
                      value={data.quantiteTitresCollectesTotale}
                      className="mt-1 block w-full rounded-2xl border border-emerald-200 bg-white/85 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                      readOnly
                      onChange={(e) =>
                        setData(
                          "quantiteTitresCollectesTotale",
                          e.target.value.toUpperCase()
                        )
                      }
                    />
                    <p className="mt-2 text-sm text-red-600">
                      {errors.quantiteTitresCollectesTotale}
                    </p>
                  </div>
                </div>
              </div>

              {/* capture du teneur de comtpe */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="teneurDeComptesTitres"
                  value="Teneur De Comptes Titres "
                />
                <TextInput
                  id="teneurDeComptesTitres"
                  type="text"
                  name="teneurDeComptesTitres"
                  value={data.teneurDeComptesTitres}
                  className={fieldInputClass}
                  readOnly
                  onChange={(e) =>
                    setData(
                      "teneurDeComptesTitres",
                      e.target.value.toUpperCase()
                    )
                  }
                />
                <InputError
                  message={errors.teneurDeComptesTitres}
                  className="mt-2"
                />
              </div>

              {/* Capture du numero d'avis */}
              <div className="mt-4">
                <InputLabel htmlFor="numeroAvis" value="Numero Avis " />
                <TextInput
                  id="numeroAvis"
                  type="text"
                  name="numeroAvis"
                  value={data.numeroAvis}
                  className={fieldInputClass}
                  readOnly
                  onChange={(e) => setData("numeroAvis", e.target.value.toUpperCase())}
                />
                <InputError message={errors.numeroAvis} className="mt-2" />
              </div>

              {/* Capture de la date de l'avis */}
              <div className="mt-4">
                <InputLabel
                  htmlFor="attestation_due_date"
                  value="Date de l'avis"
                />
                <TextInput
                  id="attestation_due_date"
                  type="date"
                  name="dateAvis" // Modifier le nom ici pour correspondre au champ
                  value={data.dateAvis} // Lier la valeur de dateAvis
                  className={fieldInputClass}
                  readOnly
                  onChange={(e) => setData("dateAvis", e.target.value)} // Capturer la date saisie
                />
                <InputError message={errors.dateAvis} className="mt-2" />
              </div>

              {/* Capture du code adhérent */}
              <div className="mt-4">
                <InputLabel htmlFor="codeAdherent" value="Code Adherent " />
                <TextInput
                  id="codeAdherent"
                  type="text"
                  name="codeAdherent"
                  value={data.codeAdherent}
                  className={fieldInputClass}
                  readOnly
                  onChange={(e) => setData("codeAdherent", e.target.value.toUpperCase())}
                />
                <InputError message={errors.codeAdherent} className="mt-2" />
              </div>

              {/* capture de la valeur */}
              <div className="mt-4">
                <InputLabel htmlFor="valeur" value="Valeur " />
                <TextInput
                  id="valeur"
                  type="text"
                  name="valeur"
                  value={data.valeur}
                  className={fieldInputClass}
                  readOnly
                  onChange={(e) =>
                    setData("valeur", e.target.value.toUpperCase())
                  }
                />
                <InputError message={errors.valeur} className="mt-2" />
              </div>

              {/* capture du code de la valeur */}
              <div className="mt-4">
                <InputLabel htmlFor="codeValeur" value="Code Valeur " />
                <TextInput
                  id="codeValeur"
                  type="text"
                  name="codeValeur"
                  value={data.codeValeur}
                  readOnly
                  className={fieldInputClass}
                  onChange={(e) =>
                    setData("codeValeur", e.target.value.toUpperCase())
                  }
                />
                <InputError message={errors.codeValeur} className="mt-2" />
              </div>

              {/* on defini la valeur par defaut du statut de l'attestation de facon*/}
              <TextInput
                name="status"
                id="status"
                type="text"
                value="En_cours"
                className="hidden mt-1 block w-full"
                onChange={(e) => setData("date", e.target.value)}
              />

              <div className="mt-10 flex flex-wrap justify-end gap-3">
                <Link
                  href={route("attestation.index")}
                  className="rounded-2xl border border-emerald-200 bg-white/70 px-5 py-3 font-semibold text-emerald-700 shadow hover:border-emerald-300 hover:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100"
                >
                  Annuler
                </Link>
                <button className="rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition-transform hover:-translate-y-0.5 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200">
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}