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
            "Abreviation" => ['nullable', 'string'],
            "Capital" => ['nullable', 'integer'],
            "NumeroRCCM" => ['nullable', 'string'],
            "NIU" => ['nullable', 'string'],
            'codeAdherent'=> ['nullable','integer'],
            'valeur'=> ['nullable','string'],
            'codeValeur'=> ['nullable','string'],
            "QuantiteTitresCollectes" => ['nullable', 'integer'],
            "QuantiteTitresCollectesTotale" => ['nullable', 'integer'],
            "TeneurDeComptesTitres" => ['nullable', 'string'],
        ];
    }
}
