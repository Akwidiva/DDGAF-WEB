<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
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
            "name" => ["required", "string", "max:255"],
            "email" => ["required", "string", "email", "unique:users,email"],
            "password" => [
                "required",
                'confirmed',
                Password::min(8)->letters()->symbols(),
            ],
            "service_id" => ["required", "exists:services,id"],
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
                'email.required' => 'Email is required',
                'email.email' => 'Email must be valid',
                'email.unique' => 'Email is already taken',
                'password.required' => 'Password is required',
                'password.confirmed' => 'Password confirmation does not match',
                'password.min' => 'Password must be at least 8 characters',
            ],
            'fr' => [
                'name.required' => 'Le nom est obligatoire',
                'email.required' => 'L\'email est obligatoire',
                'email.email' => 'L\'email doit être valide',
                'email.unique' => 'Cet email est déjà utilisé',
                'password.required' => 'Le mot de passe est obligatoire',
                'password.confirmed' => 'La confirmation du mot de passe ne correspond pas',
                'password.min' => 'Le mot de passe doit contenir au moins 8 caractères',
            ]
        ];

        return $messages[$lang] ?? $messages['en'];
    }
}
