# Dangerous by Design 2026

An interactive companion to Smart Growth America's *Dangerous by Design
2026* report on US pedestrian traffic fatalities — built for readers who
already get "wide lanes = fast driving" and want the data and the
street-design reasoning made explicit, not a 101-level explainer.

**Live site:** https://elilev.github.io/Dangerous-By-Design/

## What's here

- **`/rankings`** — explore the data. Toggle between metros (101) and
  states (50), switch between a sortable table and a dot map sized/colored
  by fatality rate, and click into a place for its rate, 2015–19 vs.
  2020–24 trend, and national context.
- **`/anatomy`** — understand the reasoning. Three before/after street
  scenes (a real Memphis intersection from the report, plus two
  illustrative archetypes) showing which design choices make a street
  dangerous and what fixes address them.

See [BUILD_BRIEF.md](BUILD_BRIEF.md) for the full design brief and
[files/STYLEGUIDE.md](files/STYLEGUIDE.md) for the visual system.

## Development

The app lives in [`app/`](app):

```bash
cd app
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Data

Source data is under [`files/`](files) as extracted JSON (`metros.json`,
`states.json`, `key_stats.json`) — see [`files/README.md`](files/README.md)
for field definitions and known gaps (e.g. no lat/long in the source, so
the app's map geocodes place names itself; `app/src/data` holds the
processed copies the app actually reads).

## Deployment

Pushes to `main` trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
to build the Vite app and publish `app/dist` to GitHub Pages.
