# Hallingdal Ved & Kubbestolmakarlag AS

Skreddersydd, interaktiv og redaksjonelt gjennomført flersidig nettside i stilretningen **Nordic Timber & Heritage Craft**.

## Sider og ruter
- `/` – **Gårdstunet (Forside)**: Magasin-hero med hurtigvalg-kort, asymmetrisk Bento-grid og delt 50/50 utstillingsvindu.
- `/vedlager` – **Vedlager & Kalkulator**: Interaktiv ved- og leveringskalkulator, teknisk sammenligningstabell og utvidbar FAQ.
- `/makarlaget` – **Kubbestolar & Verkstad**: Kubbestolens anatomi og interaktiv skreddersøm-konfigurator.
- `/bestilling` – **Om laget & Bestilling**: Redaksjonell historie og todelt bestillingsmodul med forhåndsutfylling fra kalkulator og konfigurator.

## Utvikling og bygg
```bash
npm install
npm run dev
npm run build
```

## Firebase Hosting
Konfigurert for prosjektet `pot-kunder-439a4` og hosting-siten `halling-ved` (`firebase.json` og `.firebaserc`).
