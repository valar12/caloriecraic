# Calorie Craic

A progressive web app implementation of the exported **Built With Science Pocket Coach 2026** workbook. The app replaces the Google Sheet runtime with a hosted Azure application, API-backed calculations, offline daily check-ins, and a deployable Azure Static Web Apps structure.

## What this repository contains

- **React + Vite PWA** for onboarding, daily check-ins, and progress dashboard.
- **Azure Functions API** for authoritative calorie, macro, TDEE, body-fat, and goal calculations.
- **Azure SQL schema** for profile, goal, daily check-in, measurement, and weekly summary persistence.
- **Offline-first IndexedDB queue** so daily logs can be captured without Google Sheets or network access.
- **Azure infrastructure starter** using Bicep.
- **Workbook mapping notes** documenting how the spreadsheet is translated into app fields and services.

## Local development

```bash
npm install
npm run dev
```

Run the API locally from a second terminal:

```bash
cd api
npm install
npm start
```

The frontend expects API calls under `/api`. During local Vite development, requests are proxied to `http://localhost:7071`.

## Build

```bash
npm run build
```

The production frontend builds to `dist/`.

## Azure deployment shape

Recommended Azure Static Web Apps configuration:

| Setting | Value |
| --- | --- |
| App location | `/` |
| API location | `api` |
| Output location | `dist` |
| Build command | `npm run build` |

Required production settings:

```text
SQL_CONNECTION_STRING=<Azure SQL connection string>
```

The app has an in-memory fallback for local API development, but production should use Azure SQL.

## Spreadsheet migration principle

The Google Sheet should be treated as the **source model only**. Runtime data, calculations, auth, and device interaction are handled by this app and Azure services.
