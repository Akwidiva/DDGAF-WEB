import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { AiOutlineEdit } from "react-icons/ai";
export default function Create({ auth, attestation, projects, users }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    nomSociete: attestation.nomSociete || "",
    abreviation: attestation.abreviation || "",
    status: attestation.status || "",
    //priority: attestation.priority || "",
    capital: attestation.capital || "",
    numeroRCCM: attestation.numeroRCCM || "",
    NIU: attestation.NIU || "",
    numeroAvis: attestation.numeroAvis || "",
    date: attestation.date || "",
    codeAdherent: attestation.codeAdherent || "",
    valeur: attestation.valeur || "",
    codeValeur: attestation.codeValeur || "",
    quantiteTitresCollectes: attestation.quantiteTitresCollectes || "",
    quantiteTitresCollectesTotale: attestation.quantiteTitresCollectesTotale || "",
    teneurDeComptesTitres: attestation.teneurDeComptesTitres || "",
    assigned_user_id: attestation.assigned_user_id || "",
    project_id: attestation.project_id || "",
    service_id: attestation.service_id || "",
    email: attestation.entreprise?.email || "",

    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("attestation.update", attestation.id));
  };

  function goBackInHistory() {
    window.history.back();
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight flex space-x-4">
            <AiOutlineEdit className="h-5 w-5 mr-2" /> Editer l'attestation {attestation.nomSociete}
          </h2>
        </div>
      }
    >
      {/* <pre>{JSON.stringify(attestation, undefined, 2)}</pre> */}

      <Head title="Attestations" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel
                  htmlFor="attestation_name"
                  value="Nom de l'entreprise "
                />

                <TextInput
                  id="attestation_name"
                  type="text"
                  name="nomSociete"
                  value={data.nomSociete}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) =>
                    setData("nomSociete", e.target.value.toUpperCase())
                  }
                />

                <InputError message={errors.nomSociete} className="mt-2" />
              </div>
              
              <div className="mt-4">
                <InputLabel htmlFor="email" value="Email de l'entreprise" />
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="abreviation" value="Abreviation" />

                <TextInput
                  id="abreviation"
                  type="text"
                  name="abreviation"
                  value={data.abreviation}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData("abreviation", e.target.value.toUpperCase())
                  }
                />

                <InputError message={errors.abreviation} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="capital"
                  value="Capital de l'entreprise "
                />

                <TextInput
                  id="capital"
                  type="text"
                  name="capital"
                  value={data.capital}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("capital", e.target.value)}
                />

                <InputError message={errors.capital} className="mt-2" />
              </div>
              
              <div className="mt-4">
                <InputLabel htmlFor="numeroRCCM" value="Numero RCCM " />

                <TextInput
                  id="numeroRCCM"
                  type="text"
                  name="numeroRCCM"
                  value={data.numeroRCCM}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData("numeroRCCM", e.target.value.toUpperCase())
                  }
                />

                <InputError message={errors.numeroRCCM} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="numeroAvis" value="Numero Avis " />

                <TextInput
                  id="numeroAvis"
                  type="text"
                  name="numeroAvis"
                  value={data.numeroAvis}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData("numeroAvis", e.target.value.toUpperCase())
                  }
                />

                <InputError message={errors.numeroAvis} className="mt-2" />
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
                <InputLabel htmlFor="codeAdherent" value="Code Adherent " />

                <TextInput
                  id="codeAdherent"
                  type="text"
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
                <InputLabel htmlFor="valeur" value="Valeur " />

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
                <InputLabel htmlFor="codeValeur" value="Code Valeur " />

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
              <div className="mt-4">
                <InputLabel
                  htmlFor="quantiteTitresCollectes"
                  value="Quantite de Titres Collectes  "
                />

                <TextInput
                  id="quantiteTitresCollectes"
                  type="number"
                  name="quantiteTitresCollectes"
                  value={data.quantiteTitresCollectes}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData(
                      "quantiteTitresCollectes",
                      e.target.value.toUpperCase()
                    )
                  }
                />

                <InputError
                  message={errors.quantiteTitresCollectes}
                  className="mt-2"
                />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="quantiteTitresCollectesTotale"
                  value="Quantite de Titres Collectes Totale  "
                />

                <TextInput
                  id="quantiteTitresCollectesTotale"
                  type="number"
                  name="quantiteTitresCollectesTotale"
                  value={data.quantiteTitresCollectesTotale}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData(
                      "quantiteTitresCollectesTotale",
                      e.target.value.toUpperCase()
                    )
                  }
                />

                <InputError
                  message={errors.quantiteTitresCollectesTotale}
                  className="mt-2"
                />
              </div>
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
                  className="mt-1 block w-full"
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
              <div className="mt-4">
                <InputLabel
                  htmlFor="assigned_user_id"
                  value="Utilisateur Assigne "
                />

                <SelectInput
                  name="assigned_user_id"
                  id="assigned_user_id"
                  className="mt-1 block w-full"
                  defaultValue={data.assigned_user_id}
                  onChange={(e) => setData("assigned_user_id", e.target.value)}
                >
                  {users.data
                    .filter((user) => user.role === "user")
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </SelectInput>

                <InputError
                  message={errors.assigned_user_id}
                  className="mt-2"
                />
              </div>
              <div className="mt-4 text-right">
                <button
                  type="button"
                  onClick={() => goBackInHistory()}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Annuler
                </button>
                <button type="submit" className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
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
