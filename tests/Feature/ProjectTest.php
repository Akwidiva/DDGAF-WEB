<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Project;
use App\Models\User;
use PHPUnit\Framework\Attributes\Test;

class ProjectTest extends TestCase
{
    // use RefreshDatabase;

    #[Test]
    public function it_can_create_a_project()
    {
        $user = User::factory()->create();

        /** @var \App\Models\User $user */
        $response = $this->actingAs($user)->post('/project', [
            'name' => '2024',
            'description' => 'Gestion des projets de l\'année 2024',
            'due_date' => now()->addYear(),
            'status' => 'En_Cours',
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);

        $response->assertStatus(302);
    }

    #[Test]
    public function it_can_update_a_project()
    {
        $user = User::factory()->create();
        $project = Project::factory()->create([
            'name' => '2024',
            'description' => 'Gestion des projets de l\'année 2024',
            'due_date' => now()->addYear(),
            'status' => 'En_Cours',
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);

        /** @var \App\Models\User $user */
        $response = $this->actingAs($user)->put('/project/' . $project->id, [
            'name' => '2025',
            'description' => 'Mise à jour pour l\'année 2025',
            'due_date' => now()->addYear(2),
            'status' => 'Archivee',
            'updated_by' => $user->id,
        ]);

        $response->assertStatus(302);
    }

    #[Test]
    public function it_can_delete_a_project()
    {
        $user = User::factory()->create();
        $project = Project::factory()->create([
            'name' => 'Exercice à supprimer',
            'description' => 'Projet à supprimer',
            'due_date' => now()->addYear(),
            'status' => 'Archivee',
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);

        /** @var \App\Models\User $user */
        $response = $this->actingAs($user)->delete('/project/' . $project->id);

        $response->assertStatus(302);
    }

    #[Test]
    public function it_can_display_a_project()
    {
        $user = User::factory()->create();
        $project = Project::factory()->create([
            'name' => '2024',
            'description' => 'Gestion des projets de l\'année 2024',
            'due_date' => now()->addYear(),
            'status' => 'En_Cours',
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);

        /** @var \App\Models\User $user */
        $response = $this->actingAs($user)->get('/project/' . $project->id);

        $response->assertStatus(302);
    }
}
