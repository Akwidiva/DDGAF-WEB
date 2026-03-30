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
}
