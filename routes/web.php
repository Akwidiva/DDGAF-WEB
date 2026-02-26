<?php

use App\Http\Controllers\AttestationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Admin\EmailStatsController;
use Illuminate\Support\Facades\Route;
// Retrieve the currently authenticated user...

Route::redirect('/', '/dashboard');

Route::middleware(['auth.user', 'auth.isActive'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    //controlle d'acces pour les routes des admins
    Route::middleware(['role.admin'])->group(
        function () {
            Route::resource('project', ProjectController::class);
            Route::resource('user', UserController::class);
            Route::resource('service', ServiceController::class);
            Route::get('admin/email-stats', [EmailStatsController::class, 'index'])->name('admin.email.stats');
        }
    );

    //controlle d'acces pour les routes des users
    Route::middleware(['role.user'])->group(
        function () {
            Route::get('attestation/mes-attestations', [AttestationController::class, 'myAttestations'])->name('attestation.myAttestations');
            Route::get('attestation/mes-attestations-archivees', [AttestationController::class, 'myAttestationsArchivees'])->name('attestation.myAttestationsArchivees');
            Route::get('attestation/telecharger-PDF/{attestation}', [AttestationController::class, 'telechargerModel'])->name('attestation.telechargerModel');
            Route::get('telecharger-PDF/{attestation}', [AttestationController::class, 'telechargerModel'])->name('attestation.telechargerModel');
            Route::post('attestation/{attestation}/send-email', [AttestationController::class, 'sendEmail'])
                ->name('attestation.sendEmail');
            Route::get('attestation/visualiser-PDF/{attestation}', [AttestationController::class, 'visualiserModel'])->name('attestation.visualiserModel');
            Route::resource('attestation', AttestationController::class);
            Route::resource('entreprise', EntrepriseController::class);
        }
    );

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
