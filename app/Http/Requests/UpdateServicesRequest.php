<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServicesRequest extends FormRequest
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
            "Nom" => ['required', 'max:255'],
            "Abreviation" => ['nullable', 'string'],
            'Description' => ['nullable', 'string'],
            
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
                'Nom.required' => 'Service name is required',
                'Nom.max' => 'Service name must not exceed 255 characters',
            ],
            'fr' => [
                'Nom.required' => 'Le nom du service est obligatoire',
                'Nom.max' => 'Le nom du service ne doit pas dépasser 255 caractères',
            ]
        ];

        return $messages[$lang] ?? $messages['en'];
    }
}
