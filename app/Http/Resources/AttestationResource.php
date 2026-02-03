<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

// // Définir la locale sur français
// CarbonImmutable::setLocale('fr');

class AttestationResource extends JsonResource
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
            'codeAttest'=> $this->codeAttest,
            'nomSociete' => $this->nomSociete,
            'abreviation' => $this->abreviation,
            'capital' => $this->capital,

            'numeroRCCM' => $this->numeroRCCM,
            'NIU' => $this->NIU,
            'numeroAvis' => $this->numeroAvis,
            'date' => (new Carbon($this->date))->locale('fr')->format('d F Y'),

            'codeAdherent' => $this->codeAdherent,
            'valeur' => $this->valeur,
            'codeValeur' => $this->codeValeur,
            'quantiteTitresCollectes' => $this->quantiteTitresCollectes,
            'quantiteTitresCollectesTotale' => $this->quantiteTitresCollectesTotale,

            'teneurDeComptesTitres' => $this->teneurDeComptesTitres,
            'created_at' => (new Carbon($this->created_at))->format('d-m-Y H:i:s'),
            'status' => $this->status,
            //'priority' => $this->priority,
            'project_id' => $this->project_id,
            'assigned_user_id' => $this->assigned_user_id,
            'service_id' => $this->service_id,
            'service' => $this->service? new ServiceResource($this->service) : null,
            'assignedUser' => $this->assignedUser ? new UserResource($this->assignedUser) : null,
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
            'project' => new ProjectResource($this->project),

        ];
    }
}
