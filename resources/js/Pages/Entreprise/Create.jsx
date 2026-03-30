import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";

import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, error }) {
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  const fieldInputClass = "mt-1 block w-full rounded-2xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 placeholder:text-emerald-400 dark:placeholder:text-emerald-500 focus:border-emerald-500 focus:ring-emerald-500";
  const { data, setData, post, errors, reset } = useForm({
    Nom: "",
    Abreviation: "",

    Capital: "",
    NumeroRCCM: "",
    NIU: "",
    QuantiteTitresCollectes: "",
    QuantiteTitresCollectesTotale: "",
    TeneurDeComptesTitres: "",
    email: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("entreprise.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-emerald-600 dark:bg-emerald-700 p-4 rounded-md shadow-md dark:shadow-emerald-900/50 text-white">
          <h2 className="font-semibold text-xl text-white leading-tight">
            Enregistrer une nouvelle entreprise
          </h2>
        </div>
      }
    >
      <Head title="Entreprises" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {error && (
            <div className="mb-4 rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-gray-700 py-2 px-4 text-rose-900 dark:text-rose-300">
              {error}
            </div>
          )}
          <div className="overflow-hidden rounded-3xl border border-emerald-100 dark:border-emerald-900 bg-gradient-to-br from-emerald-50 dark:from-gray-800 via-white dark:via-gray-800 to-emerald-50 dark:to-gray-800 shadow-xl dark:shadow-gray-900/50">
            <form
              onSubmit={onSubmit}
              className="space-y-6 p-6 sm:p-10 text-gray-900 dark:text-gray-100"
            >
              <div className="mt-4 flex items-center">
                <div className="flex-1">
                  <InputLabel
                    htmlFor="entreprise_name"
                    value="Entrer le Nom de l'entreprise"
                  />
                  <div className="flex items-center">
                    <TextInput
                      id="entreprise_name"
                      type="text"
                      name="Nom"
                      value={data.Nom}
                      className={fieldInputClass}
                      isFocused={true}
                      onChange={(e) =>
                        setData("Nom", e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <InputError message={errors.Nom} className="mt-2" />
                </div>
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="Abreviation" value="Abreviation " />
                <TextInput
                  id="Abreviation"
                  type="text"
                  name="Abreviation"
                  value={data.Abreviation}
                  className={fieldInputClass}
                  onChange={(e) =>
                    setData("Abreviation", e.target.value.toUpperCase())
                  }
                />
                <InputError message={errors.Abreviation} className="mt-2" />
              </div>
              
              <div className="mt-4">
                <InputLabel
                  htmlFor="email"
                  value="Adresse Email de l'entreprise"
                />

                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  className={fieldInputClass}
                  placeholder="exemple@entreprise.com"
                  onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />
              </div>
              
              <div className="mt-4">
                <InputLabel
                  htmlFor="Capital"
                  value="Capital de l'entreprise (en FCFA)"
                />
                <TextInput
                  id="Capital"
                  type="text"
                  name="Capital"
                  value={data.Capital ? formatNumber(data.Capital) : ""}
                  className={fieldInputClass}
                  onChange={(e) => {
                    // Récupérer la valeur saisie
                    const inputValue = e.target.value;

                    // Supprimer tous les caractères non numériques et espaces
                    const numericValue = inputValue.replace(/\D/g, "");

                    // Mettre à jour les données avec le montant numérique
                    setData("Capital", parseInt(numericValue, 10) || 0);
                  }}
                />

                <InputError message={errors.Capital} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="NumeroRCCM" value="Numero RCCM " />

                <TextInput
                  id="NumeroRCCM"
                  type="text"
                  name="NumeroRCCM"
                  value={data.NumeroRCCM}
                  className={fieldInputClass}
                  onChange={(e) =>
                    setData("NumeroRCCM", e.target.value.toUpperCase())
                  }
                />

                <InputError message={errors.NumeroRCCM} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="NIU" value="NIU " />
                <TextInput
                  id="NIU"
                  type="text"
                  name="NIU"
                  value={data.NIU}
                  className={fieldInputClass}
                  onChange={(e) => setData("NIU", e.target.value.toUpperCase())}
                />
                <InputError message={errors.NIU} className="mt-2" />
              </div> 
                
              
              <div className="mt-4">
                <InputLabel htmlFor="codeAdherent" value="Code adhérent" />

                <TextInput
                  id="codeAdherent"
                  type="number"
                  name="codeAdherent"
                  value={data.codeAdherent}
                  className={fieldInputClass}
                  onChange={(e) =>
                    setData("codeAdherent", e.target.value.toUpperCase())
                  }
                />

                <InputError message={errors.codeAdherent} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="valeur" value="Entrez la valeur" />

                <TextInput
                  id="valeur"
                  type="text"
                  name="valeur"
                  value={data.valeur}
                  className={fieldInputClass}
                  onChange={(e) =>
                    setData("valeur", e.target.value.toUpperCase())
                  }
                />

                <InputError message={errors.valeur} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="codeValeur"
                  value="Entrez le code valeur (ISIN) "
                />

                <TextInput
                  id="codeValeur"
                  type="text"
                  name="codeValeur"
                  value={data.codeValeur}
                  className={fieldInputClass}
                  onChange={(e) =>
                    setData("codeValeur", e.target.value.toUpperCase())
                  }
                />

                <InputError message={errors.codeValeur} className="mt-2" />
              </div>

              <div className="mt-4 flex flex-wrap">
                <div className="w-full md:w-1/2 mb-4 flex flex-col">
                  <label
                    htmlFor="QuantiteTitresCollectes"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Quantité de Titres Collectés:
                  </label>
                  <input
                    id="QuantiteTitresCollectes"
                    type="text"
                    name="QuantiteTitresCollectes"
                    value={data.QuantiteTitresCollectes}
                    className="mt-1 block w-full rounded-2xl border border-emerald-200 bg-white/85 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                    onChange={(e) =>
                      setData(
                        "QuantiteTitresCollectes",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                  <p className="mt-2 text-sm text-red-600">
                    {errors.QuantiteTitresCollectes}
                  </p>
                </div>

                <div className="w-full md:w-1/2 mb-4 flex items-center">
                  <span className="border-l-5 h-4 mx-2 dark:text-gray-200">
                    {" "}
                    /{" "}
                  </span>
                  <div className="w-full">
                    <label
                      htmlFor="QuantiteTitresCollectesTotale"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Quantité de Titres Collectés Totale:
                    </label>
                    <input
                      id="QuantiteTitresCollectesTotale"
                      type="text"
                      name="QuantiteTitresCollectesTotale"
                      value={data.QuantiteTitresCollectesTotale}
                      className="mt-1 block w-full rounded-2xl border border-emerald-200 bg-white/85 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                      onChange={(e) =>
                        setData(
                          "QuantiteTitresCollectesTotale",
                          e.target.value.toUpperCase(),
                        )
                      }
                    />
                    <p className="mt-2 text-sm text-red-600">
                      {errors.QuantiteTitresCollectesTotale}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="TeneurDeComptesTitres"
                  value="Teneur De Comptes Titres "
                />

                <TextInput
                  id="TeneurDeComptesTitres"
                  type="text"
                  name="TeneurDeComptesTitres"
                  value={data.TeneurDeComptesTitres}
                  className={fieldInputClass}
                  onChange={(e) =>
                    setData(
                      "TeneurDeComptesTitres",
                      e.target.value.toUpperCase(),
                    )
                  }
                />

                <InputError
                  message={errors.TeneurDeComptesTitres}
                  className="mt-2"
                />
              </div>
              <div className="mt-10 flex flex-wrap justify-end gap-3">
                <Link
                  href={route("entreprise.index")}
                  className="rounded-2xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-gray-700 px-5 py-3 font-semibold text-emerald-700 dark:text-emerald-400 shadow dark:shadow-emerald-900/30 hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/50"
                >
                  Annuler
                </Link>
                <button className="rounded-2xl bg-emerald-500 dark:bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50 transition-transform hover:-translate-y-0.5 hover:bg-emerald-600 dark:hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-900/50">
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
