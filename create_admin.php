<?php
require 'vendor/autoload.php';

// Create bcrypt hash for password '123.321A'
$password = 'admin123';
$hashed = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

echo "Creating admin account...\n";
echo "Email: admin@test.com\n";
echo "Password: admin123\n";
echo "Hash: " . $hashed . "\n";

// Connect to database
$mysqli = new mysqli('127.0.0.1', 'root', 'Akwisaqueen1', 'demat_db');

if ($mysqli->connect_error) {
    die('Connection failed: ' . $mysqli->connect_error);
}

// Insert admin user
$sql = "INSERT INTO users (name, email, password, role, status, email_verified_at, created_at, updated_at) 
        VALUES ('Test Admin', 'admin@test.com', '$hashed', 'admin', 'active', NOW(), NOW(), NOW())
        ON DUPLICATE KEY UPDATE password = '$hashed'";

if ($mysqli->query($sql) === TRUE) {
    echo "\n✅ Admin account created/updated successfully!\n";
    echo "\n=== LOGIN CREDENTIALS ===\n";
    echo "Email: admin@test.com\n";
    echo "Password: admin123\n";
    echo "================================\n";
} else {
    echo "Error: " . $mysqli->error;
}

$mysqli->close();
?>
