# Workbook-to-app mapping

Source workbook: `Built With Science Pocket Coach 2026.xlsx`.

The workbook is treated as a source model, not as a runtime dependency. The app captures the same conceptual inputs and moves formulas into API-backed calculation services.

## Main sheet mapping

| Workbook area | App component | API/database target |
| --- | --- | --- |
| `CALCULATIONS!G5` units | Profile setup | `profile.units` |
| `CALCULATIONS!G6` starting date | Profile setup | `profile.startDate` |
| `CALCULATIONS!G7` current weight | Profile setup / check-in | `profile.startingWeight`, `DailyCheckIns.weight` |
| `CALCULATIONS!G8` estimated body fat | Profile setup | `profile.startingBodyFat` |
| `CALCULATIONS!G9` gender | Profile setup | `profile.gender` |
| `CALCULATIONS!G13:G19` optional body-fat calculator | Future body-fat panel | `profile.bodyFatInputs` |
| `CALCULATIONS!P5` training experience | Goal setup | `profile.experienceLevel` |
| `CALCULATIONS!P8` main goal | Goal setup | `profile.mainGoal` |
| `CALCULATIONS!P15:P16` manual goal override | Goal setup | `profile.manualGoalEnabled`, `profile.manualWeeklyWeightChange` |
| `CALCULATIONS!E:K` daily entries | Daily check-in | `DailyCheckIns` |
| `SUMMARY` sheet | Dashboard | `/api/dashboard` plus chart components |

## Formula migration

Current implementation includes server-side equivalents for:

- Goal phase recommendation.
- Default weekly weight-change goal.
- Maintenance calorie estimate from lean mass.
- Daily target calorie range.
- Protein, fat, and carbohydrate targets.

The original workbook should be used to validate edge cases and exact constants. Any formulas that exported from Google Sheets as `__xludf.DUMMYFUNCTION(...)` should be manually translated into tested application code instead of evaluated from XLSX.

## Next mapping pass

Create fixtures from known workbook inputs and expected outputs, then add them to the frontend and API calculation tests. This preserves sheet behavior while removing the spreadsheet dependency.
