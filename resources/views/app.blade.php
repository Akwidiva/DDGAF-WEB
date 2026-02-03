<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'CAA') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet">
    <link rel = "shortcut icon" href="{{ asset('logo CAA-small.jpg') }}"
     <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead

    <style>
        .dark-mode-toggle {
            position: fixed;
            top: 15px;
            right: 10px;
            z-index: 9999;
            padding: 5px;
            background-color: #8b8888;

            border-radius: 20px;
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        .dark-mode-toggle-icon {
            color: #fff;
            margin-right: 5px;
        }

        .dark-mode-toggle-label {
            color: #333;
            font-weight: bold;
        }

        .dark-mode-toggle.light {
            background-color: #333;
        }

        .dark-mode-toggle.light .dark-mode-toggle-label {
            color: #fff;
            font-weight: bold;
            z
        }
    </style>
</head>

<body class="font-sans antialiased">
    @inertia

    <div class="dark-mode-toggle" title="Cliquer ici pour changer le thème de l'application" onclick="toggleDarkMode()">
        <i class="dark-mode-toggle-icon fas fa-moon"></i>
        <span class="dark-mode-toggle-label">Mode Sombre</span>
    </div>

    <script>
        function toggleDarkMode() {
            const htmlElement = document.querySelector('html');
            const darkModeToggle = document.querySelector('.dark-mode-toggle');

            htmlElement.classList.toggle('dark');
            darkModeToggle.classList.toggle('light');
            darkModeToggle.querySelector('.dark-mode-toggle-icon').classList.toggle('fa-sun');
            darkModeToggle.querySelector('.dark-mode-toggle-icon').classList.toggle('fa-moon');
            darkModeToggle.querySelector('.dark-mode-toggle-label').textContent = htmlElement.classList.contains('dark') ?
                'Mode Clair' : 'Mode Sombre';
        }
    </script>
</body>

</html>
