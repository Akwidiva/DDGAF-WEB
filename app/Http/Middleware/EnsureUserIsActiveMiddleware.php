<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsActiveMiddleware extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $isActive = $user && $user->status === 'active';

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'isActive' => $isActive,
            ],
        ];
    }


    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if (!$user || $user->status !== 'active') {

            // Supprimer les données de session
            logger()->info('EnsureUserIsActiveMiddleware: user not active or missing - logging out', ['user_id' => $user?->id]);
            Auth::logout();

            // Rediriger vers la page de connexion
            return redirect('login');
        }
        return $next($request);
    }
}
