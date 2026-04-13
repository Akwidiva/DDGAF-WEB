<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\UserCRUDResource;
use App\Http\Resources\UserResource;
use App\Models\Services;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query();
        $sortField = request("sort_field", 'name');
        $sortDirection = request("sort_direction", "asc");
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }

        $users = $query->with('service') // Charge la relation 'service' pour chaque utilisateur
            ->orderBy($sortField, $sortDirection)
            ->paginate(5)
            ->onEachSide(1)
            ->withQueryString(); // Conserve les paramètres de requête dans les liens de pagination

        $services = Services::query()->orderBy('Abreviation', 'asc')->get();
        return inertia("User/Index", [
            "users" => UserResource::collection($users),
            "services" => ServiceResource::collection($services),
            'queryParams' => request(null)->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $services = Services::query()
            ->where('statut', 'actif') // ou 'active' selon la valeur utilisée dans votre table
            ->orderBy('Abreviation', 'asc')
            ->get();
        return inertia("User/Create", [
            'services' => ServiceResource::collection($services),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);
        // service_id is already in validated data from the request

        User::create($data);
        return to_route('user.index')
            ->with('success', 'Un compte utilisateur a ete cree !');
    }

    /**
     * Display the specified resource.
     */

    public function show(User $user)
    { {
            // Récupération des informations du projet et de l'utilisateur associés à l'attestation
            return inertia('User/Show', [
                'user' => new UserResource($user),
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $services = Services::query()
            ->where('statut', 'actif') // ou 'active' selon la valeur utilisée dans votre table
            ->orderBy('Abreviation', 'asc')
            ->get();
        return inertia('User/Edit', [
            'user' => new UserCRUDResource($user),
            'services' => ServiceResource::collection($services),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $data["service_id"] = $request->service_id;
        $password = $data['password'] ?? null;
        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }
        $user->update($data);
        
        return to_route('user.index')
            ->with('success', "Le compte  de \"$user->name\" a bien ete mis a jour !");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, Request $request)
    {
        $name = $user->name;
        if ($user->status == 'disabled') {
            // Marquer le user comme active
            $user->status = 'active';
            $user->save();
            return to_route('user.index')
                ->with('success', "Le compte de \"$name\" a ete activé avec succes ! ");
        } else {
            $request->validate([
                'password' => ['required', 'current_password'],
            ]);
            // Marquer le user comme disabled
            $user->status = 'disabled';
            $user->save();
            return to_route('user.index')
                ->with('success', "Le compte de \"$name\" a ete desactivé avec succes ! ");
        };
    }
}
