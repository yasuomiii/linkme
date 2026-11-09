# Yasuomi – Link-Seite

Statische Link-in-Bio-Seite, erstellt mit dem Link Studio. Kein Backend, kein Build-Schritt. Die Seite besteht nur aus diesen Dateien (8 Dateien, 100 KB).

## Veröffentlichen auf GitHub Pages

1. Auf GitHub ein neues Repository anlegen. Der Name wird Teil der Adresse. Für `https://DEINNAME.github.io/` heißt das Repo `DEINNAME.github.io`. Jeder andere Name ergibt `https://DEINNAME.github.io/REPO/`.
2. Den **Inhalt** dieser ZIP-Datei (nicht den Ordner selbst) in das Repository hochladen. `index.html` muss im Hauptverzeichnis liegen.
3. Im Repository **Settings → Pages**: Source = *Deploy from a branch*, Branch = `main`, Ordner = `/ (root)`. Speichern.
4. Nach ein bis zwei Minuten ist die Seite unter der angezeigten Adresse erreichbar.

Alle Pfade sind relativ. Die Seite funktioniert deshalb auch unter `/REPO/`.

## Eigene Domain

Im Studio unter *Einstellungen* eine Domain eintragen und neu exportieren. Die Datei `CNAME` wird dann erzeugt. Anschließend DNS bei deinem Domain-Anbieter auf GitHub Pages zeigen lassen (siehe GitHub-Dokumentation).

## Dateien

- `index.html` – die Seite
- `assets/css/style.css` – alle Styles
- `assets/js/main.js` – Animationen, Partikel, Theme-Wechsel
- `assets/img`, `assets/video`, `assets/fonts` – deine Medien
- `404.html`, `robots.txt`, `.nojekyll` – Hilfsdateien für GitHub Pages

Schriftarten aus Google Fonts werden beim Aufruf von fonts.googleapis.com geladen. Wer das vermeiden will, lädt im Studio eine eigene Schriftdatei hoch.
