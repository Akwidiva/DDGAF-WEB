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

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        $lang = app()->getLocale();
        
        $messages = [
            // English
            'en' => [
                'nomSociete.required' => 'Company name is required',
                'assigned_user_id.required' => 'Assigned user is required',
                'assigned_user_id.exists' => 'The selected user does not exist',
                'service_id.required' => 'Service is required',
                'service_id.exists' => 'The selected service does not exist',
                'project_id.required' => 'Project is required',
                'project_id.exists' => 'The selected project does not exist',
            ],
            // French
            'fr' => [
                'nomSociete.required' => 'Le nom de l\'entreprise est obligatoire',
                'assigned_user_id.required' => 'L\'utilisateur assigné est obligatoire',
                'assigned_user_id.exists' => 'L\'utilisateur sélectionné n\'existe pas',
                'service_id.required' => 'Le service est obligatoire',
                'service_id.exists' => 'Le service sélectionné n\'existe pas',
                'project_id.required' => 'L\'exercice est obligatoire',
                'project_id.exists' => 'L\'exercice sélectionné n\'existe pas',
            ]
        ];

        return $messages[$lang] ?? $messages['en'];
    }
}
