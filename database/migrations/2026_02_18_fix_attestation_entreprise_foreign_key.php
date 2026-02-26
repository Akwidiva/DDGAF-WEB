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
        Schema::table('attestations', function (Blueprint $table) {
            // Add the missing entreprise_id foreign key
            $table->foreignId('entreprise_id')->nullable()->constrained('entreprises')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attestations', function (Blueprint $table) {
            $table->dropForeignIdFor('entreprises');
        });
    }
};
