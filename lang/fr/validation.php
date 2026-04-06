<?php

return [
    'required' => 'Ce champ est obligatoire.',
    'email' => 'Le champ :attribute doit être une adresse e-mail valide.',
    'unique' => 'La valeur du champ :attribute est déjà utilisée.',
    'numeric' => 'Le champ :attribute doit être un nombre.',
    'min' => [
        'numeric' => 'Le champ :attribute doit être au moins :min.',
        'file' => 'Le champ :attribute doit être au moins :min kilobytes.',
        'string' => 'Le champ :attribute doit avoir au moins :min caractères.',
        'array' => 'Le champ :attribute doit avoir au moins :min éléments.',
    ],
    'max' => [
        'numeric' => 'Le champ :attribute ne peut pas dépasser :max.',
        'file' => 'Le champ :attribute ne peut pas dépasser :max kilobytes.',
        'string' => 'Le champ :attribute ne peut pas dépasser :max caractères.',
        'array' => 'Le champ :attribute ne peut pas avoir plus de :max éléments.',
    ],
    'confirmed' => 'La confirmation du champ :attribute ne correspond pas.',
    'date' => 'Le champ :attribute n\'est pas une date valide.',
];
