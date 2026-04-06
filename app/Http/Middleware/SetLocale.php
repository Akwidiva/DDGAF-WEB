<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Try to get language from cookie first, then header, then default
        $locale = $request->cookie('language') 
            ?? $request->header('Accept-Language', config('app.locale'));
        
        // Extract just the language code (en or fr) if it's a full locale string
        $locale = explode('-', $locale)[0];
        
        // Validate that the locale is in the allowed list
        if (in_array($locale, ['en', 'fr'])) {
            app()->setLocale($locale);
        } else {
            app()->setLocale(config('app.locale'));
        }

        return $next($request);
    }
}
