<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Services>
 */
class ServicesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'Nom' => 'Service Informatique',
            'Abreviation' => 'SI',
            'Description' => 'Service responsable de la gestion des systèmes d\'information',
            'statut' => 'actif',
            'created_by' => $this->faker->randomElement([1]),
            'updated_by' => $this->faker->randomElement([1]),
        ];
    }
}