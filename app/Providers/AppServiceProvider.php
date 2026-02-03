<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Fix for older MySQL/MariaDB versions where default utf8mb4 index length can exceed limit
        // Ensure default string length is 191 to avoid "key too long" errors on unique/indexed columns.
        Schema::defaultStringLength(191);
    }
}
