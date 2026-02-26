<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    use HasFactory;
    protected $fillable = [
        'Nom',
        'email',
        'Abreviation',
        'Capital',
        'NumeroRCCM',
        'NIU',
        
        'numeroAvis',
        'codeAdherent',
        'valeur',
        'codeValeur',
        'QuantiteTitresCollectes',
        'QuantiteTitresCollectesTotale',
        'TeneurDeComptesTitres',
      
        'created_by',
        'updated_by',
       
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
