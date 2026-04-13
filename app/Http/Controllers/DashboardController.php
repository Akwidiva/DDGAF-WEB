<?php

namespace App\Http\Controllers;

use App\Http\Resources\AttestationResource;
use App\Models\Attestation;
//use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {

        $user = $request->user();

        // on recupere toutes les attestations dans la BD
        $attestations = Attestation::all();
        
        // chaque que fois que l'utilisateur se connecte ou accede a la page principale, un controle de session est effectue sur toutes les attestation
        foreach($attestations as $attestation){
            // Extraire l'année de codeAttest
            // codeAttest est au format: strrev(codeAdherent . '-' . name)
            // On inverse pour revenir au format: codeAdherent-name
            $originalCode = strrev($attestation->codeAttest);
            $parts = explode('-', $originalCode);
            $attestationYear = isset($parts[1]) ? $parts[1] : null;
            $currentYear = date('Y');
            
            // Archiver si l'année de l'attestation ne correspond pas à l'année en cours
            if($attestationYear && $attestationYear !== $currentYear){
                $attestation->status = 'Archivee';
                $attestation->save();
            }
        }
        
        $totalPendingAttestations = Attestation::query()
            ->where('status', 'En_Attente')
            ->count();
        $myPendingAttestations = Attestation::query()
            ->where('status', 'En_Attente')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalProgressAttestations = Attestation::query()
            ->where('status', 'En_Cours')
            ->count();
        $myProgressAttestations = Attestation::query()
            ->where('status', 'En_Cours')
            ->where('assigned_user_id', $user->id)
            ->count();


        $totalArchiveAttestations = Attestation::query()
            ->where('status', 'Archivee')
            ->count();
        $myArchiveAttestations = Attestation::query()
            ->where('status', 'Archivee')
            ->where('assigned_user_id', $user->id)
            ->count();

        $activeAttestations = Attestation::query()
            ->where('status', ['En_Attente', 'En_Cours'])
            ->where('assigned_user_id', $user->id)
            ->limit(10)
            ->get();

        $activeAttestations = AttestationResource::collection($activeAttestations);



        $query = Attestation::query();

        // Récupération des paramètres de tri
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        // Filtrage par nom de société (si fourni)
        if (request("nomSociete")) {
            $query->where("nomSociete", "like", "%" . request("nomSociete") . "%");
        }

        // Filtrage par statut (si fourni)
        if (request("status")) {
            $query->where("status", request("status"));
        }

        // Exécution de la requête avec tri et pagination
        $attestations = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Dashboard', [
            'totalPendingAttestations' => $totalPendingAttestations,
            'myPendingAttestations' => $myPendingAttestations,
            'totalProgressAttestations' => $totalProgressAttestations,
            'myProgressAttestations' => $myProgressAttestations,
            'totalArchiveAttestations' => $totalArchiveAttestations,
            'myArchiveAttestations' => $myArchiveAttestations,
            'activeAttestations' => $activeAttestations,
            'attestations' => AttestationResource::collection($attestations),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
