<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Services;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'id' => 1,
            'name' => 'user',
            'email' => 'user@gmail.com',
            'password' => bcrypt('123.321A'),
            'email_verified_at' => time(),
            'role' => 'user',
            'status' => 'active',
        ]);

        User::factory()->create([
            'id' => 2,
            'name' => 'Super-Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('123.321A'),
            'email_verified_at' => time(),
            'role' => 'admin',
            'status' => 'active',
        ]);

        User::factory()->create([
            'id' => 3,
            'name' => 'DSI',
            'email' => 'dsi@gmail.com',
            'password' => bcrypt('*****'),
            'email_verified_at' => time(),
            'role' => 'admin',
            'status' => 'active',
        ]);

        Services::factory()->create([
            'id'=> 1,
            'Nom'=> 'Service de Prise en Charge et du Suivi du Processus de Dematerialisation',
            'Abreviation' => 'SPCSPD',
            'Description' => '',

            'created_by' =>'2',
            'updated_by' =>'2',
        ]);

        Services::factory()->create([
            'id'=> 2,
            'Nom'=> 'Service PostDématérialisation et Organisation du Marché des Titres Non Côtés',
            'Abreviation' => 'SPDOMTNC',
            'Description' => '',

            'created_by' =>'2',
            'updated_by' =>'2',
        ]);

        // /* User::factory(10)->create();
    }
}
