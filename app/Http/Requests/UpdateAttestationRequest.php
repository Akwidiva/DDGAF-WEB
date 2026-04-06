<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAttestationRequest extends FormRequest
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
        'nomSociete' => 'required|string|max:255',
        'abreviation' => 'required|string|max:10',
        'capital' => 'required|numeric|min:0',
        'numeroRCCM' => 'required|string|max:50',
        'status' => 'required|in:En_Cours,Archivee,Validée',
        'service_id' => 'required|exists:services,id',
        'assigned_user_id' => 'required|exists:users,id',
        'project_id' => 'required|exists:projects,id',
        'email' => ['nullable', 'email', ],
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
                'nomSociete.required' => 'Company name is required',
                'abreviation.required' => 'Abbreviation is required',
                'capital.required' => 'Capital is required',
                'capital.numeric' => 'Capital must be a number',
                'capital.min' => 'Capital must be at least 0',
                'numeroRCCM.required' => 'RCCM Number is required',
                'status.required' => 'Status is required',
                'service_id.required' => 'Service is required',
                'assigned_user_id.required' => 'Assigned user is required',
                'project_id.required' => 'Project is required',
                'email.email' => 'Email must be valid',
            ],
            'fr' => [
                'nomSociete.required' => 'Le nom de l\'entreprise est obligatoire',
                'abreviation.required' => 'L\'abréviation est obligatoire',
                'capital.required' => 'Le capital est obligatoire',
                'capital.numeric' => 'Le capital doit être un nombre',
                'capital.min' => 'Le capital doit être au moins 0',
                'numeroRCCM.required' => 'Le numéro RCCM est obligatoire',
                'status.required' => 'Le statut est obligatoire',
                'service_id.required' => 'Le service est obligatoire',
                'assigned_user_id.required' => 'L\'utilisateur assigné est obligatoire',
                'project_id.required' => 'L\'exercice est obligatoire',
                'email.email' => 'L\'email doit être valide',
            ]
        ];

        return $messages[$lang] ?? $messages['en'];
    }
}
