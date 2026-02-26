<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'attestation_id',
        'recipient_email',
        'status',
        'error_message',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attestation()
    {
        return $this->belongsTo(Attestation::class);
    }
}
