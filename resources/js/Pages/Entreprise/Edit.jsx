import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link,  useForm } from "@inertiajs/react";
import { AiOutlineEdit } from "react-icons/ai";

export default function Create({ auth, entreprise}) {
  const { data, setData, post, errors, reset } = useForm({
    Nom: entreprise.Nom || "",
    Abreviation: entreprise.Abreviation || "",
    Capital: entreprise.Capital || "",
    NumeroRCCM: entreprise.NumeroRCCM || "",
    NIU: entreprise.NIU || "",
    codeAdherent: entreprise.codeAdherent || "",
    valeur: entreprise.valeur || "",
    codeValeur: entreprise.codeValeur || "",
    QuantiteTitresCollectes: entreprise.QuantiteTitresCollectes || "",
    QuantiteTitresCollectesTotale: entreprise.QuantiteTitresCollectesTotale || "",
    TeneurDeComptesTitres: entreprise.TeneurDeComptesTitres || "",
   
    _method: "PATCH",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("entreprise.update", entreprise.id));
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   post(route("entreprise.update", entreprise.id));
  // };

  function goBackInHistory() {
    window.history.back();
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight flex space-x-4">
            <AiOutlineEdit className="h-5 w-5 mr-2" /> Edition de l'entreprise : " {entreprise.Nom} "
          </h2>
        </div>
      }
    >
      <Head title="Entreprises" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              
              <div className="mt-4">
                <InputLabel
                  htmlFor="entreprise_name"
                  value="Nom de l'entreprise "
                />
                <TextInput
                  id="entreprise_name"
                  type="text"
                  name="Nom"
                  value={data.Nom}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("Nom", e.target.value.toUpperCase())}
                />
                <InputError message={errors.Nom} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="Abreviation" value="Abreviation" />
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
                  htmlFor="Capital"
                  value="Capital de l'entreprise "
                />
                <TextInput
                  id="Capital"
                  type="text"
                  name="Capital"
                  value={data.Capital}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("Capital", e.target.value)}
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
                <InputLabel htmlFor="codeAdherent" value="Code adhérent"/>
                <TextInput
                  id="codeAdherent"
                  type="text"
                  name="codeAdherent"
                  value={data.codeAdherent}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("codeAdherent", e.target.value.toUpperCase())}
                />
                <InputError message={errors.codeAdherent} className="mt-2" />
              </div>
              
              <div className="mt-4">
                <InputLabel htmlFor="valeur" value="Entrez la valeur"/>
                <TextInput
                  id="valeur"
                  type="text"
                  name="valeur"
                  value={data.valeur}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("valeur", e.target.value.toUpperCase())}
                />
                <InputError message={errors.valeur} className="mt-2" />
              </div>
              
              <div className="mt-4">
                <InputLabel htmlFor="codeValeur" value="Entrez le code valeur (ISIN) "/>
                <TextInput
                  id="codeValeur"
                  type="text"
                  name="codeValeur"
                  value={data.codeValeur}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("codeValeur", e.target.value.toUpperCase())}
                />
                <InputError message={errors.codeValeur} className="mt-2" />
              </div>


              <div className="mt-4">
                <InputLabel
                  htmlFor="QuantiteTitresCollectes"
                  value="Quantite de Titres Collectes  "
                />
                <TextInput
                  id="QuantiteTitresCollectes"
                  type="number"
                  name="QuantiteTitresCollectes"
                  value={data.QuantiteTitresCollectes}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData(
                      "QuantiteTitresCollectes",
                      e.target.value.toUpperCase()
                    )
                  }
                />
                <InputError
                  message={errors.QuantiteTitresCollectes}
                  className="mt-2"
                />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="QuantiteTitresCollectesTotale"
                  value="Quantite de Titres Collectes Totale "
                />
                <TextInput
                  id="QuantiteTitresCollectesTotale"
                  type="number"
                  name="QuantiteTitresCollectesTotale"
                  value={data.QuantiteTitresCollectesTotale}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData(
                      "QuantiteTitresCollectesTotale",
                      e.target.value.toUpperCase()
                    )
                  }
                />
                <InputError
                  message={errors.QuantiteTitresCollectesTotale}
                  className="mt-2"
                />
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
                      e.target.value.toUpperCase()
                    )
                  }
                />
                <InputError
                  message={errors.TeneurDeComptesTitres}
                  className="mt-2"
                />
              </div>

              <div className="mt-4 text-right">
                <Link
                  onClick={() => goBackInHistory()}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Annuler
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
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
