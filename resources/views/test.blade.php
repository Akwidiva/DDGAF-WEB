<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Code</title>
</head>
<body>
    <h1>Voici votre code QR :</h1>
    @php
        printf('<img src="%s" alt="QR Code" style="width: 100px;"/>', $qrcode);
    @endphp
</body>
</html>
