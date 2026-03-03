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
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#2FAC86] p-4 rounded-md shadow-md text-white">
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
            <div className="bg-red-500 py-2 px-4 text-white rounded mb-4">
              {error}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
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
                      className="mt-1 block w-full"
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
                  className="mt-1 block w-full"
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
                  className="mt-1 block w-full"
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
                  className="mt-1 block w-full"
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
                  className="mt-1 block w-full"
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
                  className="mt-1 block w-full"
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
                  className="mt-1 block w-full"
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
                  className="mt-1 block w-full"
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
                  className="mt-1 block w-full"
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
                    className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
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
                      className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
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
                  className="mt-1 block w-full"
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
              <div className="mt-8 text-right">
                <Link
                  href={route("entreprise.index")}
                  className="bg-gray-100 py-2 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Annuler
                </Link>
                <button className="bg-[#87888a] hover:bg-[#7a7b7d] text-white py-2 px-3 rounded shadow transition-colors">
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
