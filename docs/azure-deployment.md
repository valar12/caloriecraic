# Azure deployment guide

## 1. Create resources

Use `infra/main.bicep` or create these resources manually:

- Azure Static Web Apps.
- Azure SQL Database.
- Azure Storage account if progress photos or exports are added later.

## 2. Create database tables

Run `database/schema.sql` against the Azure SQL database.

## 3. Configure Static Web Apps

| Field | Value |
| --- | --- |
| App location | `/` |
| API location | `api` |
| Output location | `dist` |

## 4. Configure app settings

Add this Static Web Apps application setting:

```text
SQL_CONNECTION_STRING=<Azure SQL connection string>
```

## 5. Configure auth

The current API accepts anonymous calls for local-first development. Before production launch:

1. Enable Static Web Apps authentication.
2. Require authenticated users for profile and check-in endpoints.
3. Validate Static Web Apps user headers and store a stable user identifier.
4. Add role checks for coach/admin features.

## 6. Production hardening checklist

- Replace the in-memory API persistence adapter with Azure SQL queries.
- Add Application Insights alerts.
- Add database migration automation.
- Add test fixtures from the source workbook.
- Add conflict handling for offline check-ins that share the same date.
- Add data export/delete flows for privacy compliance.
