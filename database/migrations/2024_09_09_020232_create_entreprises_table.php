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
        Schema::create('entreprises', function (Blueprint $table) {
            $table->id();
            $table->string('Nom');
            $table->string('Abreviation');
            $table->integer('Capital');
           
            $table->string('NumeroRCCM');
            $table->string('NIU');

            $table->integer('codeAdherent');
            $table->string('valeur');
            $table->string('codeValeur');

            $table->integer('QuantiteTitresCollectes');
            $table->integer('QuantiteTitresCollectesTotale');
            $table->string('TeneurDeComptesTitres');

            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entreprises');
    }
};
