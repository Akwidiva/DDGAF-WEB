<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use App\Models\Attestation;
use App\Models\Entreprise;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Link existing attestations to entreprises based on nomSociete match
        $attestations = Attestation::whereNull('entreprise_id')->get();
        
        foreach ($attestations as $attestation) {
            $entreprise = Entreprise::where('Nom', $attestation->nomSociete)->first();
            
            if ($entreprise) {
                $attestation->update(['entreprise_id' => $entreprise->id]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reset entreprise_id to null for all attestations
        Attestation::query()->update(['entreprise_id' => null]);
    }
};
