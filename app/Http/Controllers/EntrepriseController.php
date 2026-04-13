<?php

namespace App\Http\Controllers;

use App\Models\Entreprise;
use App\Http\Requests\StoreEntrepriseRequest;
use App\Http\Requests\UpdateEntrepriseRequest;
use App\Http\Resources\EntrepriseResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class EntrepriseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Entreprise::query();

        // Récupération des paramètres de tri
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        // Filtrage par nom de société (si fourni)
        if (request("Nom")) {
            $query->where("Nom", "like", "%" . request("Nom") . "%");
        }

        // Filtrage par statut (si fourni)
        if (request("Statut")) {
            $query->where("Statut", request("Statut"));
        }

        // Exécution de la requête avec tri et pagination
        $entreprises = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1)
            ->withQueryString(); // Conserve les paramètres de requête dans les liens de pagination

        // Retour de la vue Inertia avec les données nécessaires
        return inertia("Entreprise/Index", [
            'entreprises' => EntrepriseResource::collection($entreprises),
            'queryParams' => request(null)->query() ?: null,
            'success' => session('success'),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $entreprises = Entreprise::query()->orderBy('Nom', 'asc')->get();
        return inertia("Entreprise/Create", [
            'entreprises' => EntrepriseResource::collection($entreprises),
            'error' => session('error'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEntrepriseRequest $request)
    {
        $QuantiteTitresCollectes = $request->QuantiteTitresCollectes;
        $QuantiteTitresCollectesTotale = $request->QuantiteTitresCollectesTotale;

        if ($QuantiteTitresCollectes > $QuantiteTitresCollectesTotale) {
            return redirect()->route('entreprise.create')
                ->with('error', 'desole mais la quantite collecte est plus grande que la quantite totale, veuillez entrer des valeurs correctes !');
        }

        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        Entreprise::create($data);
        return redirect()->route('entreprise.index')
            ->with('success', 'Une entreprise a été créée !');
    }

    /**
     * Display the specified resource.
     */
    public function show(Entreprise $entreprise)
    {
        // Récupération des informations du projet et de l'utilisateur associés à l'entreprise
        return inertia('Entreprise/Show', [
            'entreprise' => new EntrepriseResource($entreprise),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Entreprise $entreprise)
    {

        return inertia("Entreprise/Edit", [
            'entreprise' => new EntrepriseResource($entreprise),

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEntrepriseRequest $request, Entreprise $entreprise)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();
        $entreprise->update($data);

        return to_route('entreprise.index')
            ->with('success', "L'entreprise \"$entreprise->Nom\" a bien ete mis a jour !");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entreprise $entreprise, Request $request)
    {
        $name = $entreprise->Nom;

        if ($entreprise->Statut == 'Archivee') {

            // Marquer l'entreprise comme en cours
            $entreprise->Statut = 'En_Cours';
            $entreprise->save();

            return redirect()->route('entreprise.index')->with('success', "L'entreprise \"$name\" a été restaurée avec succès !");
        } else {
            $request->validate([
                'password' => ['required', 'current_password'],
            ]);
            // Marquer l'entreprise comme archivée
            $entreprise->Statut = 'Archivee';
            $entreprise->save();

            return redirect()->route('entreprise.index')->with('success', "L'entreprise \"$name\" a été archivée avec succès !");
        }
    }
}
