<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attestation>
 */
class AttestationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'codeAttest' => $this->faker->unique()->numberBetween(1000, 9999),
            'nomSociete' => $this->faker->company(),
            'abreviation' => $this->faker->bothify('???'),
            'capital' => $this->faker->numberBetween(100000, 500000000),
            'status' => $this->faker->randomElement(['En_Cours', 'Archivee']),
            'numeroRCCM' => $this->faker->bothify('??####'),
            'NIU' => $this->faker->bothify('??####'),
            
            'numeroAvis' => $this->faker->bothify('??####'),
            'date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'codeAdherent' => $this->faker->numberBetween(1000, 1000000),
            'valeur' => $this->faker->word(),
            'codeValeur' => $this->faker->word(),

            'quantiteTitresCollectes' => $this->faker->numberBetween(1000, 1000000),
            'quantiteTitresCollectesTotale' => $this->faker->numberBetween(1000, 1000000),
            'teneurDeComptesTitres' => $this->faker->name(),

            'service_id' => $this->faker->randomElement([1]),
            'project_id' => $this->faker->randomElement([1]),
            'assigned_user_id' => $this->faker->randomElement([1]),
            'created_by' => $this->faker->randomElement([1]),
            'updated_by' => $this->faker->randomElement([1]),

            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}