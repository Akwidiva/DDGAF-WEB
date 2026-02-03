<?php

namespace Tests\Feature;

use App\Models\Attestation;
use App\Models\User;
use App\Models\Project;
use App\Models\Services;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Carbon\Carbon;
use PHPUnit\Framework\Attributes\Test;

class AttestationTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_can_create_an_attestation()
    {
        // Création d'un utilisateur et d'un projet
        $user = User::factory()->create();
        $service = Services::factory()->create();  // Crée un service pour l'attestation
        $project = Project::factory()->create(['created_by' => $user->id]);

        // Envoi de la requête pour créer une attestation avec tous les champs requis
        /** @var \App\Models\User $user Envoi de la requête pour créer une attestation*/
        $response = $this->actingAs($user)->post('/attestation', [
            'codeAttest' => '4321',  // Code de l'attestation
            'nomSociete' => 'Societe Test',
            'abreviation' => 'ST',
            'capital' => 5000000,
            'numeroRCCM' => 'RCCM123456',
            'NIU' => 'NIU123456',
            'numeroAvis' => 'AVIS123456',
            'date' => now()->format('Y-m-d'),  // Date actuelle formatée
            'codeAdherent' => 1234,
            'valeur' => '100000',
            'codeValeur' => 'VAL123',
            'quantiteTitresCollectes' => 1000,
            'quantiteTitresCollectesTotale' => 2000,
            'teneurDeComptesTitres' => 'Teneur Test',
            'status' => 'En_Cours',  // Statut valide selon les règles de validation
            'service_id' => $service->id,  // Utilise un service valide
            'assigned_user_id' => $user->id,  // Utilisateur assigné
            'created_by' => $user->id,  // Utilisateur créateur
            'updated_by' => $user->id,  // Utilisateur ayant mis à jour
            'project_id' => $project->id,  // Projet associé
        ]);
        // Vérification que la requête redirige correctement
        $response->assertRedirect('/attestation');

        // Vérification que les données sont bien présentes dans la base de données
        $this->assertDatabaseHas('attestations', [
            'codeAttest' => '4321',
            'nomSociete' => 'Societe Test',
            'project_id' => $project->id,
            'status' => 'En_Cours',
        ]);
    }

    #[Test]
    public function it_can_delete_an_attestation()
    {
        // Création d'une attestation existante
        $user = User::factory()->create();
        $project = Project::factory()->create();
        $service = Services::factory()->create();

        /** @var \App\Models\User $user Envoi de la requête pour créer une attestation*/
        $attestation = Attestation::factory()->create([
            'codeAttest' => '2325',
            'nomSociete' => 'Societe Updated',
            'abreviation' => 'ST',
            'capital' => 5000000,
            'numeroRCCM' => 'RCCM123456',
            'NIU' => 'NIU123456',
            'numeroAvis' => 'AVIS123456',
            'date' => Carbon::now()->format('Y-m-d'),
            'codeAdherent' => 1234,
            'valeur' => '100000',
            'codeValeur' => 'VAL123',
            'quantiteTitresCollectes' => 1000,
            'quantiteTitresCollectesTotale' => 2000,
            'teneurDeComptesTitres' => 'Teneur Test',
            'status' => 'En_Cours',
            'service_id' => $service->id,
            'assigned_user_id' => $user->id,
            'created_by' => $user->id,
            'updated_by' => $user->id,
            'project_id' => $project->id,
        ]);

        // Envoi de la requête pour supprimer l'attestation
        /** @var \App\Models\User $user */
        $response = $this->actingAs($user)->delete("/attestation/{$attestation->id}");

        $response->assertStatus(302);
        $this->assertDatabaseMissing('attestations', ['id' => $attestation->id]);
    }

    #[Test]
    public function it_can_display_an_attestation()
    {
        // Création d'une attestation existante
        $user = User::factory()->create();
        $project = Project::factory()->create();
        $service = Services::factory()->create();

        /** @var \App\Models\User $user Envoi de la requête pour créer une attestation*/
        $attestation = Attestation::factory()->create([
            'codeAttest' => '2325',
            'nomSociete' => 'Societe Updated',
            'abreviation' => 'ST',
            'capital' => 5000000,
            'numeroRCCM' => 'RCCM123456',
            'NIU' => 'NIU123456',
            'numeroAvis' => 'AVIS123456',
            'date' => Carbon::now()->format('Y-m-d'),
            'codeAdherent' => 1234,
            'valeur' => '100000',
            'codeValeur' => 'VAL123',
            'quantiteTitresCollectes' => 1000,
            'quantiteTitresCollectesTotale' => 2000,
            'teneurDeComptesTitres' => 'Teneur Test',
            'status' => 'En_Cours',
            'service_id' => $service->id,
            'assigned_user_id' => $user->id,
            'created_by' => $user->id,
            'updated_by' => $user->id,
            'project_id' => $project->id,
        ]);
        // Envoi de la requête pour afficher l'attestation
        /** @var \App\Models\User $user */
        $response = $this->actingAs($user)->get("/attestation/{$attestation->id}");

        $response->assertStatus(302);
        $response->assertSee($attestation->nomSociete);
    }
}
