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
}
