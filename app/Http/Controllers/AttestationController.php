<?php

namespace App\Http\Controllers;

use App\Models\Attestation;
use App\Http\Requests\StoreAttestationRequest;
use App\Http\Requests\UpdateAttestationRequest;
use App\Http\Resources\AttestationResource;
use App\Http\Resources\EntrepriseResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\UserResource;
use App\Models\Entreprise;
use App\Models\Project;
use App\Models\Services;
use App\Models\User;
use TCPDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Mail; // --- ADDED ---
use App\Mail\AttestationMail;
use App\Models\EmailLog;

class AttestationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Attestation::query();

        // Récupération des paramètres de tri
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        // Filtrage par nom de société (si fourni)
        if (request("nomSociete")) {
            $query->where("nomSociete", "like", "%" . request("nomSociete") . "%");
        }

        // Filtrage par code de l'attestation (si fourni)
        if (request("codeAttest")) {
            $query->where("codeAttest", "like", "%" . request("codeAttest") . "%");
        }

        // Filtrage par statut (si fourni)
        if (request("status")) {
            $query->where("status", request("status"));
        }

        // Exécution de la requête avec tri et pagination
        $attestations = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1)
            ->withQueryString(); // Conserve les paramètres de requête dans les liens de pagination

        // Retour de la vue Inertia avec les données nécessaires
        return inertia("Attestation/Index", [
            'attestations' => AttestationResource::collection($attestations),
            'queryParams' => request(null)->query() ?: null,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }
      
    public function sendEmail(Attestation $attestation)
    {
        // 1. Check if attestation has associated company
        if (!$attestation->entreprise) {
            return back()->with('error', "Cette attestation n'est pas associée à une entreprise.");
        }

        // 2. Fetch the email from the related entreprise
        $email = $attestation->entreprise->email ?? null;

        if (!$email) {
            return back()->with('error', "L'entreprise '{$attestation->entreprise->Nom}' n'a pas d'adresse email configurée. Veuillez ajouter l'email de l'entreprise dans la section ENTREPRISES.");
        }

        try {
            // 3. Generate the PDF file with random name and save to storage (not public)
            $randomFilename = "Attestation_" . uniqid() . "_" . time() . ".pdf";
            $storagePath = storage_path("app/private/attestations/");
            
            // Ensure directory exists
            if (!is_dir($storagePath)) {
                mkdir($storagePath, 0755, true);
            }
            
            $filePath = $storagePath . $randomFilename;

            // Generate the PDF file and save to storage
            $this->generatePDF($attestation, $filePath);

            // Verify file exists before sending
            if (!file_exists($filePath)) {
                EmailLog::create([
                    'user_id' => Auth::id(),
                    'attestation_id' => $attestation->id,
                    'recipient_email' => $email,
                    'status' => 'failure',
                    'error_message' => 'PDF file not generated',
                ]);

                return back()->with('error', "Impossible de générer le fichier PDF.");
            }

            // 4. Send the Mail FROM the company email TO the company
            Mail::to($email)->send(new AttestationMail($attestation, $filePath));

            // Log success
            EmailLog::create([
                'user_id' => Auth::id(),
                'attestation_id' => $attestation->id,
                'recipient_email' => $email,
                'status' => 'success',
            ]);

            return back()->with('success', "Attestation envoyée avec succès à {$attestation->entreprise->Nom} ({$email})");
        } catch (\Exception $e) {
            // Log failure
            EmailLog::create([
                'user_id' => Auth::id(),
                'attestation_id' => $attestation->id,
                'recipient_email' => $email,
                'status' => 'failure',
                'error_message' => $e->getMessage(),
            ]);

            return back()->with('error', "Échec de l'envoi à {$email}: " . $e->getMessage());
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::orderBy('created_at', 'desc')->get();
        $users = User::query()->where('id', Auth::id())->get();
        $attestations = Attestation::query()->orderBy('nomSociete', 'asc')->get();
        $entreprises = Entreprise::query()->orderBy('Nom', 'asc')->get();
        $services = Services::query()->orderBy('Abreviation', 'asc')->get();

        //dd($users, $attestations, $entreprises, $services, $projects);

        // Log for debugging: confirm controller is reached and which user is authenticated
        logger()->info('AttestationController@create called', [
            'user_id' => Auth::id(),
            'user_role' => Auth::user()?->role ?? null,
            'user_status' => Auth::user()?->status ?? null,
        ]);

        return inertia("Attestation/Create", [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
            'services' => ServiceResource::collection($services),
            'entreprises' => EntrepriseResource::collection($entreprises),
            'attestations' => AttestationResource::collection($attestations),
            // expose minimal debug info to help trace client-side rendering issues (safe: id/role/status only)
            'debugUser' => [
                'id' => Auth::id(),
                'role' => Auth::user()?->role ?? null,
                'status' => Auth::user()?->status ?? null,
            ],
            'error' => session('error'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttestationRequest $request)
    {
        $data = $request->validated();

        $entreprise = Entreprise::where('Nom', $request->nomSociete)->first();
        if ($entreprise) {
            $data['entreprise_id'] = $entreprise->id;
            
            // Check if attestation already exists for this company and project
            $existingAttestation = Attestation::where('entreprise_id', $entreprise->id)
                ->where('project_id', $request->project_id)
                ->exists();
            
            if ($existingAttestation) {
                return redirect()->route('attestation.create')
                    ->with('error', "Une attestation existe déjà pour {$entreprise->Nom} pour cet exercice. Une seule attestation par entreprise par exercice est autorisée!");
            }
        }
        
        // Génération sécurisée du code
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $data['codeAttest'] = strrev($request->codeAdherent . '-' . $request->name);
        $data['date'] = $request['dateAvis'];

        // Vérification optimisée des doublons
        if (Attestation::where('codeAttest', $data['codeAttest'])->exists()) {
            return redirect()->back()->with('error', 'Une attestation avec ce code existe déjà');
        }

        Attestation::create($data);
        return redirect()->route('attestation.index')
            ->with('success', 'Une attestation a été créée !');
    }

    /**
     * Display the specified resource.
     */
    public function show(Attestation $attestation)
    {
        $this->authorize('view', $attestation);
        $attestation->load(['entreprise', 'project', 'createdBy', 'updatedBy', 'assignedUser']);
         // Récupération des informations du projet et de l'utilisateur associés à l'attestation
        return inertia('Attestation/Show', [
            'attestation' => new AttestationResource($attestation),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    public function edit(Attestation $attestation)
    {
        $this->authorize('update', $attestation);
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();
        return inertia("Attestation/Edit", [
            'attestation' => new AttestationResource($attestation),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttestationRequest $request, Attestation $attestation)
    {
        $this->authorize('update', $attestation);
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        if (!$attestation->entreprise_id) {
            $entreprise = Entreprise::where('Nom', $request->nomSociete)->first();
            if ($entreprise) {
                $data['entreprise_id'] = $entreprise->id;
            }
        }

        $attestation->update($data);

        // Update the entreprise email if provided
        if ($request->has('email')) {
            $attestation->load('entreprise'); // Reload the relationship
            if ($attestation->entreprise) {
                $attestation->entreprise->update([
                    'email' => $request->email
                ]);
            }
        }

        return to_route('attestation.show', $attestation->id)
            ->with('success', "L'attestation \"$attestation->nomSociete\" a bien ete mis a jour !");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attestation $attestation, Request $request)
    {
        $this->authorize('delete', $attestation);
        $name = $attestation->nomSociete;

        if ($attestation->status == 'Archivee') {

            // Marquer l'attestation comme en cours
            $attestation->status = 'En_Cours';
            $attestation->save();

            return redirect()->route('attestation.index')->with('success', "L'attestation \"$name\" a été restaurée avec succès !");
        } else {
            $request->validate([
                'password' => ['required', 'current_password'],
            ]);
            // Marquer l'attestation comme archivée
            $attestation->status = 'Archivee';
            $attestation->save();

            return redirect()->route('attestation.index')->with('success', "L'attestation \"$name\" a été archivée avec succès !");
        }
    }

    public function myAttestations(Request $request)
    {
        $user = $request->user();
        $query = Attestation::where('assigned_user_id', $user->id);

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

        // Retour de la vue Inertia avec les données nécessaires
        return inertia("Attestation/Index", [
            'attestations' => AttestationResource::collection($attestations),
            'queryParams' => request(null)->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function myAttestationsArchivees(Request $request)
    {
        $user = $request->user();
        $query = Attestation::where('status', 'Archivee');


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

        // Retour de la vue Inertia avec les données nécessaires
        return inertia("Attestation/Index", [
            'attestations' => AttestationResource::collection($attestations),
            'queryParams' => request(null)->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function formatNumber($num)
    {
        return number_format($num, 0, ',', ' ');
    }

    public function visualiserModel(Attestation $attestation)
    {
        $qrCodes = [];
        // Use the record creation date as the authoritative date for PDFs
        $exercice = \Carbon\Carbon::parse($attestation->created_at)->year;
        // Construction du contenu avec plusieurs lignes de texte
        $content = "code de l'attestation " . $attestation->codeAttest . "\n";
        $content .= "Exercice: " . $exercice . "\n";
        $content .= "Nom de l'entreprise: " . $attestation->nomSociete . "\n";
        $content .= "N° RCCM: " . $attestation->numeroRCCM . "\n";
        $content .= "N° NIU: " . $attestation->NIU . "\n";
        $content .= "Code adherent: " . $attestation->codeAdherent . "\n";
        $content .= "Valeur: " . $attestation->valeur . "\n";
        $content .= "Code valeur: " . $attestation->codeValeur . "\n";
        $content .= "Teneur en compte: " . $attestation->teneurDeComptesTitres . "\n";

        // abreviation du nom de l'utilisateur assigne
        $words = explode(' ', $attestation['assignedUser']['name']); // Divise la chaîne en mots en utilisant l'espace comme délimiteur
        $abbreviations = array_map(function ($word) {
            return substr($word, 0, 2);
        }, $words);
        $result = implode('', $abbreviations); // Rejoint les mots abrégés en utilisant l'espace comme séparateur
        $result = strtoupper($result);

        $attestation['name'] = $result;

        // Formater le capital
        $formattedCapital = $this->formatNumber($attestation->capital);
        $content .= "Capital de l'entreprise: " . $formattedCapital . " FCFA\n";

        // Chemin vers le logo dans le répertoire public
        $logoPath = public_path('logo CAA-small.png');

        // Génération du QR Code avec le contenu construit et le logo
        $qrCodes['changeBgColor'] = QrCode::size(60)
            ->backgroundColor(255, 255, 255)
            ->generate($content);

        $qrCodePath = null;

        return view('pdfSample2', compact('attestation', 'qrCodes', 'qrCodePath', 'formattedCapital'));
    }

    public function telechargerModel(Attestation $attestation)
    {
        // Check authorization
        $this->authorize('view', $attestation);
        
        // Generate PDF with random filename in storage
        $randomFilename = "Attestation_" . uniqid() . "_" . time() . ".pdf";
        $storagePath = storage_path("app/private/attestations/");
        
        // Ensure directory exists
        if (!is_dir($storagePath)) {
            mkdir($storagePath, 0755, true);
        }
        
        $filePath = $storagePath . $randomFilename;
        $this->generatePDF($attestation, $filePath);

        // Download the PDF from storage (not publicly accessible)
        return response()->download($filePath, "Attestation_de_" . $attestation->nomSociete . ".pdf")->deleteFileAfterSend();
    }

    private function generatePDF(Attestation $attestation, $filePath)
    {
        // Use the record creation date as the authoritative date for PDFs
        $exercice = \Carbon\Carbon::parse($attestation->created_at)->year;
        // Construction du contenu avec plusieurs lignes de texte
        $content = "code de l'attestation " . $attestation->codeAttest . "\n";
        $content .= "Exercice: " . $exercice . "\n";
        $content .= "Nom de l'entreprise: " . $attestation->nomSociete . "\n";
        $content .= "N° RCCM: " . $attestation->numeroRCCM . "\n";
        $content .= "N° NIU: " . $attestation->NIU . "\n";
        $content .= "Code adherent: " . $attestation->codeAdherent . "\n";
        $content .= "Valeur: " . $attestation->valeur . "\n";
        $content .= "Code valeur: " . $attestation->codeValeur . "\n";
        $content .= "Teneur en compte: " . $attestation->teneurDeComptesTitres . "\n";

        // Formater le capital
        $formattedCapital = $this->formatNumber($attestation->capital);
        $content .= "Capital de l'entreprise: " . $formattedCapital . " FCFA\n";

        // Génération du QR Code avec le contenu construit
        $qrCodeContent = $content;
        $qrCode = QrCode::size(50) // Taille réduite du QR Code pour économiser de l'espace
            ->backgroundColor(255, 255, 255)
            ->generate($qrCodeContent);

        $data = [
            'attestation' => $attestation,
            'qrCode' => $qrCode,
            'formattedCapital' => $formattedCapital, // Passer le capital formaté à la vue, si nécessaire
        ];

        // abreviation du nom de l'utilisateur assigne
        $words = explode(' ', $attestation['assignedUser']['name']); // Divise la chaîne en mots en utilisant l'espace comme délimiteur
        $abbreviations = array_map(function ($word) {
            return substr($word, 0, 2);
        }, $words);
        $result = implode('', $abbreviations); // Rejoint les mots abrégés en utilisant l'espace comme séparateur
        $result = strtoupper($result);

        $attestation['name'] = $result;

        // Rendu de la vue entière
        $html = view('pdfSample2', $data)->render();

        // Extraire uniquement le contenu de la div "pdf"
        $dom = new \DOMDocument();
        @$dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        $xpath = new \DOMXPath($dom);
        $pdfContent = $xpath->query("//div[@name='pdf']")->item(0);

        // Récupérer le HTML de la section sélectionnée
        $pdfHtml = $dom->saveHTML($pdfContent);

        // Créer le PDF
        $pdf = new TCPDF;
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);
        $pdf->SetTitle("Attestation_de_" . $attestation->nomSociete);

        // Ajouter une nouvelle page
        $pdf->AddPage();
        $pdf->SetTopMargin(30); // Définir la marge supérieure à 40px

        // Réglage des marges (gauche, haut, droite)
        $pdf->SetMargins(20, 10, 30); // Marges ajustées pour gagner de l'espace

        // Ajouter le contenu HTML extrait
        $pdf->writeHTML($pdfHtml, false, false, false, true, '');

        // Positionner le QR code en bas à gauche
        $pageHeight = $pdf->getPageHeight();
        $x = 30;
        $y = $pageHeight - 41; // Position ajustée pour éviter le débordement
        $qrWidth = 20;
        $qrHeight = 20;

        $style = array(
            'border' => 0,
            'padding' => 0,
            'fgcolor' => array(0, 0, 0),
            'bgcolor' => array(255, 255, 255)
        );

        // Pour une sécurité élevée, utiliser la ligne suivante mais nécessite que le QR code prenne plus d'espace
        $pdf->write2DBarcode($qrCodeContent, 'QRCODE,L', $x, $y, $qrWidth, $qrHeight, $style, 'N');

        // Sortie du PDF dans un fichier
        $pdf->Output($filePath, 'F');
    }
}
