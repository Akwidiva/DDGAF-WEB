<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EntrepriseResource extends JsonResource
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
            'Capital' => $this->Capital,

            'NumeroRCCM' => $this->NumeroRCCM,
            'NIU' => $this->NIU,

            'numeroAvis' => $this->numeroAvis,
            'codeAdherent' => $this->codeAdherent,
            'valeur' => $this->valeur,
            'codeValeur' => $this->codeValeur,
            'QuantiteTitresCollectes' => $this->QuantiteTitresCollectes,
            'QuantiteTitresCollectesTotale' => $this->QuantiteTitresCollectesTotale,

            'TeneurDeComptesTitres' => $this->TeneurDeComptesTitres,
            'created_at' => (new Carbon($this->created_at))->locale('fr')->format('d F Y'),
            'Statut' => $this->Statut,
            //'priority' => $this->priority,
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
