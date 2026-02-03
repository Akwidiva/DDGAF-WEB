<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAttestationRequest extends FormRequest
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
            // 'codeAttest'=> ['nullable','integer',Rule::unique('attestation', 'codeAttest')],
            
            "nomSociete" => ['required', 'max:255'],
            "abreviation" => ['nullable', 'string'],
            'image' => ['nullable', 'string'],
            "numeroRCCM" => ['nullable', 'string'],
            "capital" => ['nullable', 'integer'],
            "NIU" => ['nullable', 'string'],

            "numeroAvis" => ['nullable', 'string'],
            "codeAdherent" => ['nullable', 'integer'],
            "valeur"  => ['nullable', 'string'],
            "codeValeur"  => ['nullable', 'string'],

            "quantiteTitresCollectes" => ['nullable', 'integer'],
            "quantiteTitresCollectesTotale" => ['nullable', 'integer'],
            "teneurDeComptesTitres" => ['nullable', 'string'],
            "assigned_user_id" => ['required', 'exists:users,id'],

            "service_id" => ['required', 'exists:services,id'],
            
            "project_id" => ['required', 'exists:projects,id'],
            'date' => ['nullable', 'date'],
            'status' => ['nullable', Rule::in([ 'En_Cours', 'Archivee'])],


        ];
    }
}
