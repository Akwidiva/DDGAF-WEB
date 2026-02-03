<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class EnsureUserAuthenticated extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
        ];
    }

    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            logger()->info('EnsureUserAuthenticated: unauthenticated, redirecting to login', ['ip' => $request->ip()]);
            return redirect('login');
        }
        return $next($request);
    }
}
