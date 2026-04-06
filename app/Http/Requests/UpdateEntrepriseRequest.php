<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEntrepriseRequest extends FormRequest
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
            'Nom' => ['required', 'string', 'max:255'],
            "Abreviation" => ['required', 'string'],
            'email' => ['nullable', 'email', 'max:255', Rule::unique('entreprises', 'email')->ignore($this->route('entreprise')->id)],
            "Capital" => ['required', 'integer'],
            "NumeroRCCM" => ['required', 'string'],
            "NIU" => ['required', 'string'],
            'codeAdherent'=> ['required','integer'],
            'valeur'=> ['required','string'],
            'codeValeur'=> ['required','string'],
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
                'Nom.string' => 'Company name must be a string',
                'Nom.max' => 'Company name must not exceed 255 characters',
                'email.email' => 'Email must be valid',
                'email.unique' => 'Email is already taken',
                'email.max' => 'Email must not exceed 255 characters',
                'Abreviation.required' => 'Abbreviation is required',
                'Abreviation.string' => 'Abbreviation must be a string',
                'Capital.required' => 'Capital is required',
                'Capital.integer' => 'Capital must be an integer',
                'NumeroRCCM.required' => 'RCCM Number is required',
                'NumeroRCCM.string' => 'RCCM Number must be a string',
                'NIU.required' => 'NIU is required',
                'NIU.string' => 'NIU must be a string',
                'codeAdherent.required' => 'Adherent Code is required',
                'codeAdherent.integer' => 'Adherent Code must be an integer',
                'valeur.required' => 'Value is required',
                'valeur.string' => 'Value must be a string',
                'codeValeur.required' => 'Value Code is required',
                'codeValeur.string' => 'Value Code must be a string',
                'QuantiteTitresCollectes.required' => 'Collected Securities Quantity is required',
                'QuantiteTitresCollectes.integer' => 'Collected Securities Quantity must be an integer',
                'QuantiteTitresCollectesTotale.required' => 'Total Collected Securities is required',
                'QuantiteTitresCollectesTotale.integer' => 'Total Collected Securities must be an integer',
                'TeneurDeComptesTitres.required' => 'Securities Account Holder is required',
                'TeneurDeComptesTitres.string' => 'Securities Account Holder must be a string',
            ],
            'fr' => [
                'Nom.required' => 'Le nom de l\'entreprise est obligatoire',
                'Nom.string' => 'Le nom de l\'entreprise doit être une chaîne de caractères',
                'Nom.max' => 'Le nom de l\'entreprise ne doit pas dépasser 255 caractères',
                'email.email' => 'L\'email doit être valide',
                'email.unique' => 'Cet email est déjà utilisé',
                'email.max' => 'L\'email ne doit pas dépasser 255 caractères',
                'Abreviation.required' => 'L\'abréviation est obligatoire',
                'Abreviation.string' => 'L\'abréviation doit être une chaîne de caractères',
                'Capital.required' => 'Le capital est obligatoire',
                'Capital.integer' => 'Le capital doit être un nombre entier',
                'NumeroRCCM.required' => 'Le numéro RCCM est obligatoire',
                'NumeroRCCM.string' => 'Le numéro RCCM doit être une chaîne de caractères',
                'NIU.required' => 'Le NIU est obligatoire',
                'NIU.string' => 'Le NIU doit être une chaîne de caractères',
                'codeAdherent.required' => 'Le code adhérent est obligatoire',
                'codeAdherent.integer' => 'Le code adhérent doit être un nombre entier',
                'valeur.required' => 'La valeur est obligatoire',
                'valeur.string' => 'La valeur doit être une chaîne de caractères',
                'codeValeur.required' => 'Le code valeur est obligatoire',
                'codeValeur.string' => 'Le code valeur doit être une chaîne de caractères',
                'QuantiteTitresCollectes.required' => 'La quantité de titres collectés est obligatoire',
                'QuantiteTitresCollectes.integer' => 'La quantité de titres collectés doit être un nombre entier',
                'QuantiteTitresCollectesTotale.required' => 'La quantité totale de titres collectés est obligatoire',
                'QuantiteTitresCollectesTotale.integer' => 'La quantité totale de titres collectés doit être un nombre entier',
                'TeneurDeComptesTitres.required' => 'Le teneur de comptes titres est obligatoire',
                'TeneurDeComptesTitres.string' => 'Le teneur de comptes titres doit être une chaîne de caractères',
            ]
        ];

        return $messages[$lang] ?? $messages['en'];
    }
}
