<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

// Définir la locale sur français
CarbonImmutable::setLocale('fr');

class ProjectResource extends JsonResource
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
            'name' => $this->name,
            'description' => $this->description,
            'dateAvis' => (new CarbonImmutable($this->dateAvis))->format('d-m-Y'),
            'numeroAvis' => $this->numeroAvis,
            'created_at' => (new CarbonImmutable($this->created_at))->format('d-m-Y H:i:s'),
            'due_date' => (new CarbonImmutable($this->due_date))->format('d F Y'),
            'status' => $this->status,
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
