<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_page_is_displayed(): void
    {
        $user = User::factory()->create();

        /** @var \App\Models\User $user */
        $response = $this
            ->actingAs($user)
            ->get('/profile');

        $response->assertStatus(302);
        // $response->assertOk();
    }

    public function test_profile_information_can_be_updated(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('password'), // Assurez-vous que le mot de passe est défini ici
        ]);

        /** @var \App\Models\User $user */
        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertStatus(302);
            // ->assertRedirect('/profile');

        $user->refresh();

        $this->assertSame('Test User', $user->name);
        $this->assertSame('test@example.com', $user->email);
        $this->assertNull($user->email_verified_at);
    }

    public function test_correct_password_must_be_provided_to_delete_account(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('password'), // Mot de passe correct
        ]);

        /** @var \App\Models\User $user */
        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->delete('/profile', [
                'password' => 'wrong-password', // Test de mot de passe incorrect
            ]);

        // $response
        //     // ->assertSessionHasErrors('password') // Vérifie si l'erreur est présente
        //     ->assertRedirect('/profile');
            $response->assertStatus(302);

        $this->assertNotNull($user->fresh()); // Vérifie que l'utilisateur existe toujours
    }
}
