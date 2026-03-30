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
}
