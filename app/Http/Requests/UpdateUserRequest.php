<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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

        $user = $this->user();

        return [
            "name" => ["required", "string", "max:255"],
            "email" => [
                "required",
                "email",
               
            ],
            "status" => [
                "required",
                Rule::in(['active', 'disabled']), // Utilisation de Rule::in pour limiter les valeurs possibles
            ],
            "password" => [
                'nullable',
                'confirmed',
                Password::min(8)->letters()->symbols(),
            ],
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
                'name.required' => 'Name is required',
                'name.string' => 'Name must be a string',
                'name.max' => 'Name must not exceed 255 characters',
                'email.required' => 'Email is required',
                'email.email' => 'Email must be valid',
                'status.required' => 'Status is required',
                'status.in' => 'Invalid status selected',
                'password.confirmed' => 'Password confirmation does not match',
                'password.min' => 'Password must be at least 8 characters',
            ],
            'fr' => [
                'name.required' => 'Le nom est obligatoire',
                'name.string' => 'Le nom doit être une chaîne de caractères',
                'name.max' => 'Le nom ne doit pas dépasser 255 caractères',
                'email.required' => 'L\'email est obligatoire',
                'email.email' => 'L\'email doit être valide',
                'status.required' => 'Le statut est obligatoire',
                'status.in' => 'Le statut sélectionné est invalide',
                'password.confirmed' => 'La confirmation du mot de passe ne correspond pas',
                'password.min' => 'Le mot de passe doit contenir au moins 8 caractères',
            ]
        ];

        return $messages[$lang] ?? $messages['en'];
    }
}
