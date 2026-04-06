<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
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
            "name" => ['nullable', 'max:255'],
            "description" => ['nullable', 'string'],
            'numeroAvis' => ['nullable', 'string'],
            'dateAvis' => ['nullable', 'date'],
            'due_date' => ['nullable', 'date'],
            'status' => ['nullable', Rule::in(['En_Attente', 'En_Cours', 'Archivee'])]
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
                'name.max' => 'Project name must not exceed 255 characters',
                'description.string' => 'Description must be a string',
                'numeroAvis.string' => 'Notice number must be a string',
                'dateAvis.date' => 'Notice date must be a valid date',
                'due_date.date' => 'Due date must be a valid date',
                'status.in' => 'Invalid status selected',
            ],
            'fr' => [
                'name.max' => 'Le nom du projet ne doit pas dépasser 255 caractères',
                'description.string' => 'La description doit être une chaîne de caractères',
                'numeroAvis.string' => 'Le numéro d\'avis doit être une chaîne de caractères',
                'dateAvis.date' => 'La date d\'avis doit être une date valide',
                'due_date.date' => 'La date d\'échéance doit être une date valide',
                'status.in' => 'Le statut sélectionné est invalide',
            ]
        ];

        return $messages[$lang] ?? $messages['en'];
    }
}
