<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Entreprise>
 */
class EntrepriseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nomSociete = $this->faker->company();

        return [
            'nomSociete' => $nomSociete,
            'abreviation' => strtoupper(implode('', array_map(function ($word) {
                return $word[0]; // Prend la première lettre de chaque mot
            }, explode(' ', $nomSociete)))),
            'status' => $this->faker->randomElement(['En_Attente', 'En_Cours', 'Archivee']),

            'capital' => $this->faker->numberBetween(100000, 10000000000),
            'numeroRCCM' => $this->faker->bothify('??####'),
            'NIU' => $this->faker->bothify('??####'),

            'codeAdherent' => $this->faker->numberBetween(1000, 1000000),
            'valeur' => $this->faker->word(),
            'codeValeur' => $this->faker->word(),
            'quantiteTitresCollectes' => $this->faker->numberBetween(1000, 1000000),

            'teneurDeComptesTitres' => $this->faker->name(),
            'assigned_user_id' => $this->faker->randomElement([1]),
            'created_by' => $this->faker->randomElement([1]),
            'updated_by' => $this->faker->randomElement([1]),

            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
