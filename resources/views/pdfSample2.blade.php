<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DDGAF_GENERATION_DE_PDF</title>
    <a href="telecharger-PDF/{{ $attestation['id'] }}"
        style="position: fixed; bottom: 20px; right: 20px; background-color: #2FAC86; color: #ffffff; padding: 12px 24px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); text-decoration: none; font-weight: 600; border: none; cursor: pointer; font-size: 14px; transition: all 0.3s ease;">
        ⬇ Télécharger PDF
    </a>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            color: #333;
        }

        .pdf-container {
            background: white;
            margin: 40px auto;
            padding: 50px;
            max-width: 900px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            line-height: 1.8;
        }

        /* Header Section */
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #2FAC86;
        }

        .header-title {
            font-size: 18px;
            font-weight: 700;
            color: #1a6b50;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
        }

        .header-subtitle {
            font-size: 14px;
            color: #666;
            margin-bottom: 12px;
        }

        .attestation-code {
            font-size: 12px;
            color: #2FAC86;
            font-weight: 600;
            word-break: break-word;
            background-color: #f0fdf7;
            padding: 8px 12px;
            border-radius: 4px;
            margin: 10px 0;
        }

        /* Content Section */
        .content {
            font-size: 12px;
            line-height: 1.8;
            text-align: justify;
            margin: 30px 0;
        }

        .intro {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f9fafb;
            border-left: 4px solid #2FAC86;
            font-style: italic;
            color: #555;
        }

        .company-info {
            background-color: #f0fdf7;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            font-size: 12px;
            line-height: 1.7;
        }

        .company-info strong {
            color: #1a6b50;
        }

        /* List Styling */
        ol {
            margin-left: 20px;
            margin-top: 15px;
        }

        ol li {
            margin-bottom: 12px;
            line-height: 1.6;
        }

        ul {
            list-style: none;
            margin-left: 20px;
            margin-top: 8px;
        }

        ul li {
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
        }

        ul li:before {
            content: "•";
            position: absolute;
            left: 0;
            color: #2FAC86;
            font-weight: bold;
        }

        /* Closing Section */
        .closing {
            background-color: #f0fdf7;
            padding: 15px;
            border-radius: 6px;
            margin: 25px 0;
            font-size: 12px;
            line-height: 1.7;
            text-align: justify;
        }

        .closing strong {
            color: #1a6b50;
        }

        /* Footer Section */
        .footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-top: 40px;
            padding-top: 30px;
            border-top: 2px solid #e5e7eb;
        }

        .qr-section {
            flex: 1;
            text-align: left;
        }

        .qr-label {
            font-size: 11px;
            color: #666;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .signature-section {
            flex: 1;
            text-align: right;
        }

        .signature-text {
            font-size: 12px;
            margin-bottom: 50px;
            color: #333;
            font-weight: 500;
        }

        .signature-line {
            border-top: 1px solid #333;
            width: 200px;
            margin-left: auto;
            margin-top: 5px;
        }

        /* Print Optimization */
        @media print {
            body {
                background-color: white;
                margin: 0;
                padding: 0;
            }
            .pdf-container {
                box-shadow: none;
                margin: 0;
                border-radius: 0;
            }
            a[href*="telecharger"] {
                display: none;
            }
        }
    </style>
</head>

<body>
    <div name="pdf" class="pdf-container">
        <!-- Header -->
        <div class="header">
            <div class="header-title">Attestation de Dématérialisation</div>
            <div class="header-subtitle">des Valeurs Mobilières {{ $attestation['project']['name'] }}</div>
            <div class="attestation-code">
                N° {{ $attestation['codeAttest'] }}/CAA/DG/DDGAF/SDD/{{ $attestation['service']['Abreviation'] }}/{{ $attestation['name'] }}
            </div>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Introduction -->
            <div class="intro">
                La Caisse Autonome d'Amortissement, Conservateur des Valeurs Mobilières non cotées, agissant en vertu de l'article trentième de la Loi de finances 2019,
            </div>

            <!-- Company Information -->
            <div class="company-info">
                <strong>Atteste que :</strong><br><br>
                La société <strong style="text-transform: uppercase;">{{ $attestation['nomSociete'] }}</strong>, 
                en abrégé <strong>{{ $attestation['abreviation'] }}</strong>, 
                au capital de <strong>{{ $formattedCapital }} FCFA</strong>, 
                N°RCCM : <strong>{{ $attestation['numeroRCCM'] }}</strong>, 
                NIU : <strong>{{ $attestation['NIU'] }}</strong>, 
                a rempli les conditions fixées par l'avis N°<strong>{{ $attestation['numeroAvis'] }}</strong> du 
                <strong>{{ \Carbon\Carbon::parse($attestation['created_at'])->locale('fr')->translatedFormat('d F Y') }}</strong>, à savoir :
            </div>

            <!-- Conditions List -->
            <ol>
                <li>
                    <strong>Codification et inscription en compte</strong> des valeurs mobilières émises selon les caractéristiques suivantes :
                    <ul>
                        <li>Code adhérent : <strong>{{ $attestation['codeAdherent'] }}</strong></li>
                        <li>Valeur : <strong>{{ $attestation['valeur'] }}</strong></li>
                        <li>Code Valeur (ISIN) : <strong>{{ $attestation['codeValeur'] }}</strong></li>
                        <li>Quantité de titres collectés : <strong>{{ $attestation['quantiteTitresCollectes'] }} / {{ $attestation['quantiteTitresCollectesTotale'] }}</strong></li>
                        <li>Teneur de comptes-titres : <strong>{{ $attestation['teneurDeComptesTitres'] }}</strong></li>
                    </ul>
                </li>
                <li>
                    <strong>Transmission des modalités</strong> de tenue des comptes-titres par la société <strong>{{ $attestation['teneurDeComptesTitres'] }}</strong> (copie de la convention de mandat signée avec ladite société)
                </li>
                <li>
                    <strong>Transmission des extraits de compte</strong> générés au <strong>31 décembre {{ date('Y') - 1 }}</strong>
                    (Attestation de propriété, compte global d'émission, journal général des opérations, historique du compte de chaque actionnaire, tableau de suivi des actions en déshérence)
                </li>
                <li>
                    <strong>Transmission du registre</strong> des titres nominatifs à date
                </li>
                <li>
                    <strong>Règlement des commissions</strong> dues à la CAA (codification et inscription en compte, Opération sur titres, Droit de garde annuel {{ date('Y') }})
                </li>
            </ol>

            <!-- Closing Statement -->
            <div class="closing">
                <strong>En foi de quoi,</strong> la présente attestation de dématérialisation, valable pour l'année <strong>{{ date('Y') }}</strong> et à annexer à la Déclaration Statique et Fiscale (DSF) de <strong>{{ date('Y') - 1 }}</strong>, lui est délivrée pour servir ce que de droit.
            </div>
        </div>

        <!-- Footer with QR and Signature -->
        <div class="footer">
            <div class="qr-section">
                <div class="qr-label">Authentification – QR Code</div>
                {!! $qrCodes['changeBgColor'] ?? '<div style="width:100px; height:100px; background:#f0f0f0; border-radius:4px;"></div>' !!}
            </div>
            <div class="signature-section">
                <div class="signature-text">Fait à Yaoundé, le</div>
                <div class="signature-line"></div>
            </div>
        </div>
    </div>
</body>

</html>
