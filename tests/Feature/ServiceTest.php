<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Services;
use App\Models\User;
use PHPUnit\Framework\Attributes\Test;

class ServiceTest extends TestCase
{
    // use RefreshDatabase;

    #[Test]
    public function it_can_create_a_service()
    {
        $user = User::factory()->create();
        /** @var \App\Models\User $user */
        $response = $this->actingAs($user)->post('/service', [
            'Nom' => 'Service Informatique',
            'Abreviation' => 'SI',
            'Description' => 'Service responsable de la gestion des systèmes d\'information',
            'statut' => 'actif',
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);
        $response->assertStatus(302);
    }

    #[Test]
    public function it_can_update_a_service()
    {
        $user = User::factory()->create();
        $service = Services::factory()->create([
            'Nom' => 'Service Initial',
            'Abreviation' => 'SI',
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);

        /** @var \App\Models\User $user */
        $response = $this->actingAs($user)->put('/service/' . $service->id, [
            'Nom' => 'Service Informatique',
            'Abreviation' => 'SI',
            'Description' => 'Service responsable des systèmes d\'information mis à jour',
            'statut' => 'inactif',
            'updated_by' => $user->id,
        ]);

        $response->assertStatus(302);
    }

    #[Test]
    public function it_can_delete_a_service()
    {
        $user = User::factory()->create();
        $service = Services::factory()->create([
            'Nom' => 'Service à supprimer',
            'Abreviation' => 'SI',
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);

        /** @var \App\Models\User $user */
        $response = $this->actingAs($user)->delete('/service/' . $service->id);

        $response->assertStatus(302);
    }

    #[Test]
    public function it_can_display_a_service()
    {
        $user = User::factory()->create();
        $service = Services::factory()->create([
            'Nom' => 'Service Informatique',
            'Abreviation' => 'SI',
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);

        /** @var \App\Models\User $user */
        $response = $this->actingAs($user)->get('/service/' . $service->id);

        $response->assertStatus(302);
    }
}
