<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'Nom' => $this->Nom,
            'Abreviation' => $this->Abreviation,
            'Description' => $this->Description,
            'Statut' => $this->statut,
            'assigned_user_id' => $this->assigned_user_id,
            'assignedUser' => new UserResource($this->assignedUser),
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
            'created_at' => (new Carbon($this->created_at))->locale('fr')->format('d F Y'),
           
            
        ];
    }
}
