<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attestation extends Model
{
    use HasFactory;


    protected $fillable = [
        'codeAttest',
        'nomSociete',
        'abreviation',
        'capital',
        'numeroRCCM',
        'NIU',
        'numeroAvis',
        'date',
        'codeAdherent',
        'valeur',
        'codeValeur',
        'quantiteTitresCollectes',
        'quantiteTitresCollectesTotale',
        'teneurDeComptesTitres',

        'status',

       'service_id', 
       'assigned_user_id',
        'created_by',
        'updated_by',
        'project_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function service()
    {
        return $this->belongsTo(Services::class, 'service_id');
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
