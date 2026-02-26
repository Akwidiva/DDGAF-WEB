<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            line-height: 1.6;
        }
        .container {
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
        }
        .header {
            border-bottom: 2px solid #10b981; /* Emerald color to match your button */
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #718096;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Attestation de Titres</h2>
        </div>

        <p>Bonjour,</p>

        <p>Veuillez trouver ci-joint l'attestation concernant la société <strong>{{ $attestation->nomSociete }}</strong>.</p>
        
        <p><strong>Détails du document :</strong><br>
           Code : {{ $attestation->codeAttest ?? 'N/A' }}<br>
           Date de création : {{ \Carbon\Carbon::parse($attestation->created_at)->locale('fr')->translatedFormat('d F Y') }}</p>

        <p>Ce document est un PDF certifié attaché à ce message.</p>

        <p>Cordialement,<br>
        L'équipe de gestion.</p>

        <div class="footer">
            Ceci est un message automatique, merci de ne pas y répondre directement.
        </div>
    </div>
</body>
</html>