# Dangerous by Design 2026 — Extracted Dataset

Source: Smart Growth America / National Complete Streets Coalition,
*Dangerous by Design 2026* (analyzes 2020-2024 pedestrian fatality data,
compared to a 2015-2019 baseline).

## Files

### `metros.json` (101 entries)
Full metro-area ranking, most-dangerous first.

```json
{
  "rank": "1",                  // as printed in report, may be "T-9" for ties
  "rank_numeric": 1,            // integer, ties share the base number
  "tied": false,                // true if this rank is tied with another metro
  "name": "Memphis, TN-MS-AR",
  "fatality_rate_per_100k": 5.5,        // avg annual pedestrian deaths per 100k, 2020-2024
  "deaths_2020_2024": 369,              // total pedestrian deaths, 2020-2024
  "deaths_2015_2019": 221,              // total pedestrian deaths, 2015-2019 (baseline)
  "trend": 2.2                          // change in per-100k rate, baseline -> current; positive = worse
}
```

### `states.json` (50 entries)
Same shape as `metros.json`, one row per state.

### `key_stats.json`
Everything else from the report that isn't a per-place ranking:
headline national numbers, demographic breakdowns (race/ethnicity, age),
the US-vs-34-peer-countries comparison, and the Memphis street
redesign case study (used as the basis for the "street anatomy" mode).

**Important caveat baked into `key_stats.json`**: the demographic
breakdowns (race, age, income) are *national* figures only — the
report does not cross-tabulate them by metro or state. Don't join
them onto individual metro/state rows as if they were local stats.

## Known gaps / things to double check in Claude Code
- Metro/state names are transcribed as printed (e.g. multi-state metro
  names like "Memphis, TN-MS-AR" kept as one string) — you'll likely
  want to parse out the primary state for map pins.
- No lat/long included — you'll need to geocode metro/state names
  yourself (Census/OMB metro definitions, or a geocoding pass) for the
  map view.
- The report doesn't give per-metro demographic splits, so the
  "anatomy" and "rankings" modes can share the national demographic
  context but shouldn't imply it's city-specific.
- Income disparity is described narratively in the report but not
  given as a clean numeric multiplier the way race is — flagged as a
  note rather than a number in `key_stats.json`.
