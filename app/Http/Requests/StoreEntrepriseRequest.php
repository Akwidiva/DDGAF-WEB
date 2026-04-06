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
        $lang = app()->getLocale();
        
        $messages = [
            'en' => [
                'Nom.required' => 'Company name is required',
                'Nom.unique' => 'Company name is already taken',
                'email.email' => 'Email must be valid',
                'email.unique' => 'Email is already taken',
                'Abreviation.required' => 'Abbreviation is required',
                'Abreviation.unique' => 'Abbreviation is already taken',
                'Capital.required' => 'Capital is required',
                'Capital.integer' => 'Capital must be an integer',
                'NumeroRCCM.required' => 'RCCM Number is required',
                'NumeroRCCM.unique' => 'RCCM Number is already taken',
                'NIU.required' => 'NIU is required',
                'NIU.unique' => 'NIU is already taken',
                'codeAdherent.required' => 'Adherent Code is required',
                'codeAdherent.unique' => 'Adherent Code is already taken',
                'codeAdherent.integer' => 'Adherent Code must be an integer',
                'valeur.required' => 'Value is required',
                'valeur.unique' => 'Value is already taken',
                'codeValeur.required' => 'Value Code is required',
                'codeValeur.unique' => 'Value Code is already taken',
                'QuantiteTitresCollectes.required' => 'Collected Securities Quantity is required',
                'QuantiteTitresCollectes.integer' => 'Collected Securities Quantity must be an integer',
                'QuantiteTitresCollectesTotale.required' => 'Total Collected Securities is required',
                'QuantiteTitresCollectesTotale.integer' => 'Total Collected Securities must be an integer',
                'TeneurDeComptesTitres.required' => 'Securities Account Holder is required',
            ],
            'fr' => [
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
            ]
        ];

        return $messages[$lang] ?? $messages['en'];
    }
}
