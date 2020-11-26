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
    "item_id": "ID der Office 365 Excel Arbeitsmappe",
    "table_id": "id der Tabelle in der Arbeitsmappe",
}
```

## Start des Servers
Sind die Daten in der Datei *secrets.json* eingetragen kann der Server gestartet werden:
```
node dist/app.js
```

Anschließend kann der Server über folgende URL aufgerufen werden *http://localhost:3001/web/?sheet=206&row=5&col=2* und es sollte folgende Seite erscheinen.

Die Parameter haben folgende Funktion:
- sheet: Bezeichnung der Registerkarte in der Excel Tabelle
- row: Zeile in der Tabelle
- col: Spalte in der Tabelle

Aus diesen Daten kann ein QR Code erzeugt werden.

![QRCode](qrcode.png)

## Docker Container
Die Anwendung existiert auch als Docker Container, um diesen zu starten folgenden Befehl ausführen:
```
docker run --rm -v c:/config:/usr/src/app/config -it -p 3001:3001 service.joerg-tuttas.de:5555/root/sitzplan
```

Dabei muss im geteilten Verzeichnis *config* sich die Datei *secrets.json* befinden (im oberen Beispiel also unter d:/Temp2020/config).