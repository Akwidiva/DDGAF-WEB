<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //suppression de la table si elle existe
        Schema::dropIfExists('attestations');

        //creation de la table
        Schema::create('attestations', function (Blueprint $table) {
            $table->id();
            // Limit unique code length to avoid index size issues
            $table->string('codeAttest', 191)->unique();
            $table->string('nomSociete');
            $table->string('abreviation');
            $table->integer('capital');
            $table->string('status');
            $table->string('numeroRCCM');
            $table->string('NIU', 191);

            $table->string('numeroAvis');
            $table->date('date')->nullable();
            $table->integer('codeAdherent');
            $table->string('valeur');
            $table->string('codeValeur');

            $table->integer('quantiteTitresCollectes');
            $table->integer('quantiteTitresCollectesTotale');
            $table->string('teneurDeComptesTitres', 191);


            $table->foreignId('service_id')->constrained('services');
            $table->foreignId('assigned_user_id')->constrained('users');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->foreignId('project_id')->constrained('projects');
            $table->foreignId('entreprise_id')->nullable()->constrained('entreprises')->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attestations');
    }
};
