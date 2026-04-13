<?php
require 'vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;

$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => 'localhost',
    'database'  => 'demat_db',
    'username'  => 'root',
    'password'  => 'Akwisaqueen1',
    'charset'   => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
]);

$capsule->setAsGlobal();
$capsule->bootEloquent();

// Create new admin account
$adminEmail = 'admin@ddgaf.test';
$adminPassword = 'Admin@123456';
$hashedPassword = password_hash($adminPassword, PASSWORD_BCRYPT);

$query = "INSERT INTO users (name, email, password, role, status, created_at, updated_at) 
VALUES ('DDGAF Admin Test', '$adminEmail', '$hashedPassword', 'admin', 'active', NOW(), NOW())";

try {
    Capsule::connection()->statement($query);
    echo "✅ New admin account created successfully!\n";
    echo "📧 Email: $adminEmail\n";
    echo "🔑 Password: $adminPassword\n";
} catch (Exception $e) {
    echo "❌ Error creating admin account: " . $e->getMessage() . "\n";
}
?>
