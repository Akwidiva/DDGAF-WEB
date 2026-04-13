<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\AttestationResource;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $projects = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1)
            ->withQueryString(); // Conserve les paramètres de requête dans les liens de pagination

        return inertia("Project/Index", [
            "projects" => ProjectResource::collection($projects),
            'queryParams' => request(null)->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.clea
     */
    public function create()
    {
        // Obtenir la date du dernier jour de l'année
        $due_date = Carbon::now()->endOfYear()->toDateString(); // Format YYYY-MM-DD

        return inertia("Project/Create", [
            'due_date' => $due_date,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        // dd($request->all());
        $data = $request->validated();


        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        Project::create($data);

        return to_route('project.index')
            ->with('success', 'Un exercice a été créé !');
    }


    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $this->authorize('view', $project);
        $query = $project->attestations();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("nomSociete")) {
            $query->where("nomSociete", "like", "%" . request("nomSociete") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $attestations = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            "attestations" => AttestationResource::collection($attestations),
            'queryParams' => request(null)->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $this->authorize('update', $project);
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $this->authorize('update', $project);
        $data = $request->validated();
        $data['updated_by'] = Auth::id();
        $project->update($data);

        return to_route('project.index')
            ->with('success', "L'exercice \"$project->name\" a bien ete mis a jour !");
    }




    public function destroy(Project $project, Request $request)
    {
        $this->authorize('delete', $project);
        $name = $project->name;
        if ($project->status == 'Archivee') {

            $project->attestations()->update(['status' => 'En_Cours']);

            // Marquer le project comme En_Cours
            $project->status = 'En_Cours';
            // $project->due_date = null;
            $project->save();

            return redirect()->route('project.index')
                ->with('success', "L'exercice \"$name\" a été restauré avec succès ! ");
        } else {
            $request->validate([
                'password' => ['required', 'current_password'],
            ]);
            // Marquer le project comme Archivee
            $project->status = 'Archivee';
            // Mettre à jour le statut de toutes les attestations liées à ce projet en "Archivee"
            $project->attestations()->update(['status' => 'Archivee']);

            // Archiver le projet
            $project->status = 'Archivee';
            $project->due_date = Carbon::now();
            $project->save();

            return redirect()->route('project.index')
                ->with('success', "L'exercice \"$name\" a été archivé avec succès ! ");
        };
    }

    /**
     * Get available years from projects name field
     * This endpoint returns dynamically extracted years from all projects
     */
    public function getAvailableYears()
    {
        $years = Project::query()
            ->whereNotNull('name')
            ->get()
            ->map(function ($project) {
                // Extract year from project name (which is typically a year like "2025")
                $year = (int) $project->name;
                if ($year > 1900 && $year < 2100) {
                    return $year;
                }
                return null;
            })
            ->filter()
            ->unique()
            ->sort()
            ->values();

        return response()->json([
            'years' => $years,
            'success' => true,
        ]);
    }
}
