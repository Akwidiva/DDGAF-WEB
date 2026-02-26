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

}
