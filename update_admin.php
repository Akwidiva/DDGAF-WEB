<?php
require 'bootstrap/app.php';

$app = app();
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

\App\Models\User::where('email', 'fonguhjoyakwi@caa.cn')->update(['role' => 'admin']);
echo "User updated to admin\n";
