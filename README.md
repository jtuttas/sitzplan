# Auto Sitzplan
## Voraussetzungen
Folgende Dinge müssen installiert sein:
- Node.js
- npm
## Installation
Zunächst müssen die notwendigen Module installiert werden und zwar über
```
npm install
```

## Konfiguration 
Die Konfiguration findet über die Datei *secrets.json* statt. Diese Datei muss im /config Verzeichnis zu finden sein und hat folgendes aussehen.
```json
{
    "accessToken":"access Token f. Office 365 (kann leer bleiben)",
    "refresh_token": "refresh Token f. Office 365 (wird benötigt um ein neues accessToken anzufordern",
    "client_id": "ID der Office 365 Client Anwendung",
    "client_secret": "Kennwort der Anwendung",
    "item_id": "ID der Office 365 Excel Arbeitsmappe"
}
```
Das notwendig Schüssel kann wir folgt erzeugt werden und muss sich ebenfalls im /config Verzeichnis befinden!
```
openssl genrsa -out rsa.private 1024
```

## Start des Servers
Sind die Daten in der Datei *secrets.json* eingetragen kann der Server gestartet werden:
```
node dist/app.js
```

Anschließend kann der Server über folgende URL aufgerufen werden *http://localhost:3001/web/?id=YPT3zVIFK0C2ta0Bz1qjY5Sb%2BcsWjWEcywkr9BJivNnxAzXBLuoXMiJlLVWI5%2Flo9kk%2B7Kle7MtGcg8QbRGZ0AT%2FkO5WRRObua4yVSw3ANV8CyDrZLQlzBFFmwc099KLTF7TYswKYpCOaFAIgYBaGDCeZp%2B11jErnV7yH%2FT7FN8%3D* und es sollte folgende Seite erscheinen.

![screenshot](Screenshot.png)

Im Parameter id ist ein URL codierter RSA Schlüssel enthalten, der ein JSON beinhaltet mit folgender Struktur.
```json
{
    "room":"206",
    "row":5,
    "col":1
}
```

## Erzeugen der QR Codes
Die QR Codes können automatisch erzeugt werden mittels des Powershell Skriptes *genqrCodes.ps1*. Das Skript fragt nach einem Reiter in der EXCEL Tabelle und nach dem Pfad zu der Excel Tabelle. 

Die Exceltabelle muss dabei entsprechend vorbereitet werden. So muss in den Zellen für die der QR Code erzeugt wird ein Zeichen stehen.

![Excel](excel1.png)

Anschließend werden die QR Codes erzeugt und zwar in folgendem Format **{Name des Reiters}_{Zeichen in der Zelle}.jpg**. Bezogen auf das obige Beispiel würden also 3 Dateien erzeugt mit den Namen 206_a.jpg, 206_b.jpg und 206_c.jpg.

Abgebildet ist hier der QR Code **206_a.jpg**.

![QRCode](206_a.jpg)

## Docker Container
Die Anwendung existiert auch als Docker Container, um diesen zu starten folgenden Befehl ausführen:
```
docker run --rm -v c:/config:/usr/src/app/config -it -p 3001:3001 service.joerg-tuttas.de:5555/root/sitzplan
```

Dabei muss im geteilten Verzeichnis *config* sich die Datei *secrets.json* befinden (im oberen Beispiel also unter c:/config).