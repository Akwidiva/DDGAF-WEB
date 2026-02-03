<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        echo "Admin";
        die();

        /*return inertia(
            'AdminDashboard',
        );*/
    }
}
