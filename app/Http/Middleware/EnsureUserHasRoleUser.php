<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class EnsureUserHasRoleUser extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();
        $isUser = $user && $user->role === 'user';

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'isUser' => $isUser,
            ],
        ];
    }

    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if (!$user || $user->role !== 'user') {
                        logger()->info('EnsureUserHasRoleUser: user lacks role user, redirecting', ['user_id' => $user?->id, 'role' => $user?->role]);
                        return redirect('dashboard');
            // return redirect('dashboard')->with('error', 'You do not have access to this section.');
          //  abort(401);
        }

        return $next($request);
    }
}
