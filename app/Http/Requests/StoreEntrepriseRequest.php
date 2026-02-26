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
            'email' => ['required', 'email', 'max:255', Rule::unique('entreprises', 'email')],
            "Abreviation" => ['nullable', 'string', Rule::unique('entreprises', 'Abreviation')],
            "Capital" => ['nullable', 'integer'],
            "NumeroRCCM" => ['nullable', 'string',Rule::unique('entreprises', 'NumeroRCCM')],
            "NIU" => ['nullable', 'string',Rule::unique('entreprises', 'NIU')],
            'codeAdherent'=> ['nullable','integer',Rule::unique('entreprises', 'codeAdherent')],
            'valeur'=> ['nullable','string',Rule::unique('entreprises', 'valeur')],
            'codeValeur'=> ['nullable','string',Rule::unique('entreprises', 'codeValeur')],
            "QuantiteTitresCollectes" => ['nullable', 'integer'],
            "QuantiteTitresCollectesTotale" => ['nullable', 'integer'],
            "TeneurDeComptesTitres" => ['nullable', 'string'],
        ];
    }
}
