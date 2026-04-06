<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
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
            "name" => ['required', 'max:255'],
            "description" => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'status' => ['required', Rule::in(['En_Attente', 'En_Cours', 'Archivee'])],


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
                'name.required' => 'Project name is required',
                'name.max' => 'Project name must not exceed 255 characters',
                'description.string' => 'Description must be a string',
                'due_date.date' => 'Due date must be a valid date',
                'status.required' => 'Status is required',
                'status.in' => 'Invalid status selected',
            ],
            'fr' => [
                'name.required' => 'Le nom du projet est obligatoire',
                'name.max' => 'Le nom du projet ne doit pas dépasser 255 caractères',
                'description.string' => 'La description doit être une chaîne de caractères',
                'due_date.date' => 'La date d\'échéance doit être une date valide',
                'status.required' => 'Le statut est obligatoire',
                'status.in' => 'Le statut sélectionné est invalide',
            ]
        ];

        return $messages[$lang] ?? $messages['en'];
    }
}
