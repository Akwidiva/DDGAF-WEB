<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EmailLog;
use App\Models\User;
use Illuminate\Http\Request;

class EmailStatsController extends Controller
{
    public function index(Request $request)
    {
        // Build simple stats: number of emails sent per user
        $users = User::orderBy('name')->get();

        $stats = $users->map(function ($user) {
            $count = EmailLog::where('user_id', $user->id)->count();
            $success = EmailLog::where('user_id', $user->id)->where('status', 'success')->count();
            $failure = EmailLog::where('user_id', $user->id)->where('status', 'failure')->count();

            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'total' => $count,
                'success' => $success,
                'failure' => $failure,
            ];
        });

        return inertia('Admin/EmailStats', [
            'stats' => $stats,
        ]);
    }
}
