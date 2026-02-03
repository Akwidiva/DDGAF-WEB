<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DDGAF_GENERATION_DE_PDF</title>
    <a href="telecharger-PDF/{{ $attestation['id'] }}"
        style="position: fixed; bottom: 20px; right: 20px; background-color: #3490dc; color: #ffffff; padding: 10px 20px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); text-decoration: none;">
        Télécharger PDF
    </a>
    <style>
        /* Ajout de styles CSS personnalisés */
        .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 80px;
            color: rgba(0, 0, 0, 0.1);
            /* Couleur du texte semi-transparent */
            z-index: -1;
            /* Pour placer le filigrane sous le contenu */
        }
    </style>
</head>

<body>


    <!-- Filigrane avec CSS personnalisé -->
    {{-- <div class="watermark"> N°{{ $attestation['id'] }}</div>
    <style>
        .justified-text {
            text-align: justify;
        }
    </style> --}}
    <div name="pdf">
        <div
            style="width: 400px; margin: auto; margin-bottom: 0; line-height: 1.5; text-align: center; font-size: 15px;">
            <b>
                <u>Attestation de Dématérialisation <br> des valeurs mobilières
                    {{ $attestation['project']['name'] }}</u>
                N°__________{{ $attestation['codeAttest'] }}/CAA/DG/DDGAF/SDD/{{ $attestation['service']['Abreviation'] }}/{{ $attestation['name'] }}
            </b>
        </div>
        <div
            style="width: 33%; font-size: 11px; margin: auto; padding: 10px 50px 0 50px; line-height: 1.5; text-align: justify;">
            <span style="margin-bottom: -15px; display: flex;">
                La Caisse Autonome d'Amortissement,
                Conservateur des Valeurs Mobilières non cotées, agissant
                en
                vertu de l'article trentième de la Loi de finances 2019,
            </span>
            <br>
            <span class="justified-text">
                Atteste que la <strong
                    style="text-transform: uppercase;">{{ $attestation['nomSociete'] }}</strong>,
                en abrégé <strong>{{ $attestation['abreviation'] }}</strong>
                au capital de <strong style="text-transform: uppercase;">
                    {{ $formattedCapital }} FCFA
                </strong>
                <strong style="text-transform: uppercase;">N°RCCM :
                    {{ $attestation['numeroRCCM'] }}</strong>,
                <strong style="text-transform: uppercase;">NIU : {{ $attestation['NIU'] }}</strong>,
                a rempli les conditions fixées par l'avis <strong style="text-transform: uppercase;">
                    N°{{ $attestation['numeroAvis'] }}</strong>, du
                <em style="text-transform: none;">
                    {{ \Carbon\Carbon::parse($attestation['date'])->locale('fr')->translatedFormat('d F Y') }}
                </em>, à savoir :
                <ol>
                    <li>la codification et l'inscription en compte des valeurs mobilières qu'elle a émises suivant les
                        caractéristiques ci-après :
                        <ul>
                            <li>
                                Code adhérent : <b>{{ $attestation['codeAdherent'] }}</b>;
                            </li>
                            <li>
                                Valeur : <b>{{ $attestation['valeur'] }}</b>;
                            </li>
                            <li>
                                Code Valeur (ISIN) : <b>{{ $attestation['codeValeur'] }}</b>;
                            </li>
                            <li>
                                Quantité de titres collectés : <b>{{ $attestation['quantiteTitresCollectes'] }} /
                                    {{ $attestation['quantiteTitresCollectesTotale'] }}</b>;
                            </li>

                            <li>
                                Teneur de comptes-titres : <b>{{ $attestation['teneurDeComptesTitres'] }}</b>;
                            </li>
                        </ul>
                    </li>
                    {{-- <li>Le dépôt des certificats physiques d'actions collectés auprès de ses actionnaires
                        accompagnés des autorisations de destruction ;
                    </li> --}}
                    <li>la transmission des modalités de tenue des comptes-titres par
                        la société <b>{{ $attestation['teneurDeComptesTitres'] }}</b>
                        (copie de la convention de mandat signée avec ladite société) ;
                    </li>
                    <li>la transmission des extraits de compte générés au <b>31 décembre {{ date('Y') - 1 }}</b>
                        (Attestation de propriété, compte global d'émission, journal général des opérations, historique
                        du
                        compte de chaque actionnaire, tableau de suivi des actions en déshérence) ;
                    </li>
                    <li>la transmission du registre des titres nominatifs à date ;
                    </li>
                    <li>le règlement des commissions dues à la CAA (codification et inscription en compte,
                        Opération sur titres, Droit de garde annuel {{ date('Y') }}).
                    </li>
                </ol>
            </span>
            <span class="bg-white p-4" class="justified-text">
                En foi de quoi, la présente attestation de
                dématérialisation, valable pour l'année <b>{{ date('Y') }}</b> et à annexer à la Déclaration
                Statique
                et Fiscale (DSF) de <b>{{ date('Y') - 1 }}</b>, lui est délivrée pour servir ce que de droit.
            </span>

            <div class="row mt-5" style="display: flex; justify-content: space-between; margin-top: 10px;">
                <div>
                    {{-- Code QR pour la visualisation --}}
                    {!! $qrCodes['changeBgColor'] ?? '' !!}
                </div>
                <div
                    style="width: 400px; margin: auto; text-align: right;">
                    Fait à Yaoundé, le __________________
                </div>
                {{-- <div class="col"
                    style="margin: 15px; margin-left: 40px; margin-bottom: 40px; display: flex; justify-content: flex-start;">
                </div>
                <div class="col"
                    style="margin: 15px; margin-left: 40px; margin-bottom: 40px; display: flex; justify-content: flex-start;">
                </div> --}}
            </div>

        </div>
    </div>
</body>

</html>
