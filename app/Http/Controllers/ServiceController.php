<?php

namespace App\Http\Controllers;

use App\Models\Services;
use App\Http\Requests\StoreServicesRequest;
use App\Http\Requests\UpdateServicesRequest;
use App\Http\Resources\ServiceResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Services::query();

        // Récupération des paramètres de tri
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        // Filtrage par nom de société (si fourni)
        if (request("Abreviation")) {
            $query->where("Abreviation", "like", "%" . request("Abreviation") . "%");
        }

        

        // Exécution de la requête avec tri et pagination
        $services = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1)
            ->withQueryString(); // Conserve les paramètres de requête dans les liens de pagination

        // Retour de la vue Inertia avec les données nécessaires
        return inertia("Service/Index", [
            'services' => ServiceResource::collection($services),
            'queryParams' => request(null)->query() ?: null,
            'success' => session('success'),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $services = Services::query()->orderBy('Nom', 'asc')->get();
        return inertia("Service/Create", [
            'services' => ServiceResource::collection($services),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServicesRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

       
        Services::create($data);
        return redirect()->route('service.index')
        ->with('success', 'Un service a été créé !');
 
    }

    /**
     * Display the specified resource.
     */
    public function show(Services $service)
    { {
            // Récupération des informations du projet et de l'utilisateur associés à l'service
            return inertia('Service/Show', [
                'service' => new ServiceResource($service),
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Services $service)
    {
        return inertia("Service/Edit", [
            'service' => new ServiceResource($service),

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServicesRequest $request, Services $service)
    {
        $data = $request->validated();
      $service->update($data);

        return to_route('service.index')
        ->with('success', "Le service \"$service->Nom\" a bien ete mis a jour !");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Services $service)
    {
        // dd($service);
    if ($service['statut'] == 'enable') {
        $service['statut'] = "disable";
    }else {
        $service["statut"] = "enable";
    }
           $service->update();


            return redirect()->route('service.index')->with('success', "Le service \"$service->Abreviation\" a été restauré avec succès !");
      
    }

   
}
