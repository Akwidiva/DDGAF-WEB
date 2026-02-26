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
    <div class="watermark"> N°{{ $attestation['id'] }}</div>
    <style>
        .justified-text {
            text-align: justify;
        }
    </style>
    <div name="pdf">
        <div
            style="width: 400px; margin: auto; margin-bottom: 0; line-height: 1.5; text-align: center; font-size: 15px;">
            <b>
                <u>Attestation de Dématérialisation <br> des valeurs mobilières
                    {{ $attestation['project']['name'] }}</u>
                N°__________{{ $attestation['codeAttest'] }}/CAA/DG/DDGAF/SDD/{{ $attestation['service']['Abreviation'] }}/{{ $attestation['assignedUser']['name'] }}
            </b>
        </div>
        <div
            style="width: 33%; font-size: 12px; margin: auto; padding: 10px 50px; line-height: 1.5; text-align: justify;">
            <span style="margin: 0; display: flex; justify-content: flex-end;">La Caisse Autonome d'Amortissement,
                Conservateur des Valeurs Mobilières non cotées, agissant
                en
                vertu de l'article trentième de la Loi de finances 2019,
            </span>
            <br>
            <span class="justified-text">Atteste que la <strong
                    style="text-transform: uppercase;">{{ $attestation['nomSociete'] }}</strong>,
                en abrégé <strong>{{ $attestation['abreviation'] }}</strong>
                au capital de <strong style="text-transform: uppercase;">
                    {{ $formattedCapital }} FCFA
                </strong>
                <strong style="text-transform: uppercase;">N°RCCM :
                    {{ $attestation['numeroRCCM'] }}</strong>,
                <strong style="text-transform: uppercase;">NIU : {{ $attestation['NIU'] }}</strong>,
                a rempli les conditions fixées par l'avis <strong style="text-transform: uppercase;">
                    N°{{ $attestation['numeroAvis'] }}</strong>,
                <em style="text-transform: none;">
                    {{ \Carbon\Carbon::parse($attestation['created_at'])->locale('fr')->translatedFormat('d F Y') }}
                </em>, à savoir :
                <ol>
                    <li>La codification et l'inscription en compte des valeurs mobilières qu'elle a émises ;
                    </li>
                    <li>Le dépôt des certificats physiques d'actions collectés auprès de ses actionnaires
                        accompagnés des autorisations de destruction ;
                    </li>
                    <li>La transmission des modalités de tenue des comptes-titres (copie de la convention de
                        mandat
                        signée avec une société de bourse agréée ou descriptif du logiciel de gestion titres
                        acquis) ;
                    </li>
                    <li>La transmission des extraits de compte générés au <b>31 décembre {{ date('Y') - 1 }}</b>
                        (Attestation
                        de
                        propriété, compte global d'émission, journal général des opérations, historique du
                        compte de
                        chaque actionnaire, tableau de suivi des actions en déshérence, etc...) ;
                    </li>
                    <li>La transmission du registre des titres nominatifs à date ;
                    </li>
                    <li>Le règlement des commissions dues à la CAA (codification et inscription en compte,
                        opération sur titre, droit de garde annuel <b>{{ date('Y') }}</b>) ;
                    </li>
                </ol>
            </span>
            <span class="bg-white p-4 sm:rounded-lg flex w1-100 flex-col max-w-2xl" class="justified-text">Suivant les
                caractéristiques ci-après :
            </span>
            <ul>
                <li>
                    Code adhérent : <b>{{ $attestation['codeAdherent'] }}</b>
                </li>
                <li>
                    Valeur : <b>{{ $attestation['valeur'] }}</b>
                </li>
                <li>
                    Code Valeur (ISIN) : <b>{{ $attestation['codeValeur'] }}</b>
                </li>
                <li>
                    Quantité de titres collectés : <b>{{ $attestation['quantiteTitresCollectes'] }} / {{ $attestation['quantiteTitresCollectesTotale'] }}</b>
                </li>

                <li>
                    Teneur de comptes-titres : <b>{{ $attestation['teneurDeComptesTitres'] }}</b>
                </li>
            </ul>
            <span class="bg-white p-4" class="justified-text">En foi de quoi la présente attestation de
                dématérialisation, valable pour l'année
                <b>{{ date('Y') }}</b>, à
                annexer à la Déclaration Statique et Fiscale (DSF) de <b>{{ date('Y') - 1 }}</b>, lui est délivrée pour
                servir
                ce que de droit.
            </span>

            <div class="row mt-5">
                <div class="col"
                    style="margin: 15px; margin-left: 40px; margin-bottom: 40px; display: flex; justify-content: flex-start;">
                    {{-- Code QR pour la visualisation --}}
                    {!! $qrCodes['changeBgColor'] ?? '' !!}
                </div>
            </div>

        </div>
    </div>
</body>

</html>
