<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([2024, 2025, 2023]),
            'description' => $this->faker->sentence(),
            'due_date' => Carbon::now()->endOfYear(),  // Dernier jour de l'année en cours
            // 'due_date' => Carbon::now(),
            'numeroAvis' => $this->faker->bothify('??####'),
            'dateAvis' => Carbon::parse($this->faker->dateTimeBetween('now', '+1 year')),
            'status' => $this->faker->randomElement(['En_Cours', 'Archivee']),
            'created_by' => $this->faker->randomElement([1]),
            'updated_by' => $this->faker->randomElement([1]),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
