<?php

return [
    'driver' => env('QR_CODE_DRIVER', 'gd'),
    'cache' => [
        'enabled' => true,
        'store' => 'file',
        'prefix' => 'qrcodes',
    ],
];
