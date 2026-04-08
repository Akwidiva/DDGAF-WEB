<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class StoreEntrepriseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'Nom' => ['required', 'string', 'max:255', Rule::unique('entreprises', 'Nom')],
            'email' => ['nullable', 'email', 'max:255', Rule::unique('entreprises', 'email')],
            "Abreviation" => ['required', 'string', Rule::unique('entreprises', 'Abreviation')],
            "Capital" => ['required', 'integer'],
            "NumeroRCCM" => ['required', 'string',Rule::unique('entreprises', 'NumeroRCCM')],
            "NIU" => ['required', 'string',Rule::unique('entreprises', 'NIU')],
            'codeAdherent'=> ['required','integer',Rule::unique('entreprises', 'codeAdherent')],
            'valeur'=> ['required','string',Rule::unique('entreprises', 'valeur')],
            'codeValeur'=> ['required','string',Rule::unique('entreprises', 'codeValeur')],
            "QuantiteTitresCollectes" => ['required', 'integer'],
            "QuantiteTitresCollectesTotale" => ['required', 'integer'],
            "TeneurDeComptesTitres" => ['required', 'string'],
        ];
    }

    /**
     * Get custom messages for validator errors (bilingual).
     */
    public function messages(): array
    {
        return [
            'Nom.required' => 'Le nom de l\'entreprise est obligatoire',
            'Nom.unique' => 'Le nom a déjà été pris',
            'email.email' => 'L\'adresse email doit être valide',
            'email.unique' => 'L\'adresse email a déjà été prise',
            'Abreviation.required' => 'L\'abréviation est obligatoire',
            'Abreviation.unique' => 'L\'abréviation a déjà été prise',
            'Capital.required' => 'Le capital est obligatoire',
            'Capital.integer' => 'Le capital doit être un nombre entier',
            'NumeroRCCM.required' => 'Le numéro RCCM est obligatoire',
            'NumeroRCCM.unique' => 'Le numéro RCCM a déjà été pris',
            'NIU.required' => 'Le NIU est obligatoire',
            'NIU.unique' => 'Le NIU a déjà été pris',
            'codeAdherent.required' => 'Le code adhérent est obligatoire',
            'codeAdherent.unique' => 'Le code adhérent a déjà été pris',
            'codeAdherent.integer' => 'Le code adhérent doit être un nombre entier',
            'valeur.required' => 'La valeur est obligatoire',
            'valeur.unique' => 'La valeur a déjà été prise',
            'codeValeur.required' => 'Le code valeur est obligatoire',
            'codeValeur.unique' => 'Le code valeur a déjà été pris',
            'QuantiteTitresCollectes.required' => 'La quantité de titres collectés est obligatoire',
            'QuantiteTitresCollectes.integer' => 'La quantité de titres collectés doit être un nombre entier',
            'QuantiteTitresCollectesTotale.required' => 'La quantité totale de titres collectés est obligatoire',
            'QuantiteTitresCollectesTotale.integer' => 'La quantité totale de titres collectés doit être un nombre entier',
            'TeneurDeComptesTitres.required' => 'Le teneur de comptes titres est obligatoire',
        ];
    }
}
