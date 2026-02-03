<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            'service_id' => $this->service_id, // Inclure service_id
            'service' => new ServiceResource($this->whenLoaded('service')), // Inclure la relation complète
            "role" => $this->role,
            "status" => $this->status,
            'created_at' => Carbon::parse($this->created_at)->locale('fr')->isoFormat('D MMM YYYY - HH:mm'),
        ];
    }
}
