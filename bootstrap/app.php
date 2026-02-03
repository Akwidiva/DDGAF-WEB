<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            // Ajout des middlewares personnalisés
            'auth.isActive' => \App\Http\Middleware\EnsureUserIsActiveMiddleware::class,
            'auth.user' => \App\Http\Middleware\EnsureUserAuthenticated::class,
            'role.user' => \App\Http\Middleware\EnsureUserHasRoleUser::class,
            'role.admin' => \App\Http\Middleware\EnsureUserHasRoleAdmin::class,
        ]);

        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
