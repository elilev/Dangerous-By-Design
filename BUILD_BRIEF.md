# Build brief: Dangerous by Design 2026 — Interactive Explainer

## What this is

An interactive web app that makes Smart Growth America's "Dangerous by
Design 2026" report (US pedestrian traffic fatality data) explorable
and understandable for a **fellow-designer/urbanist audience** — people
who already grasp "wide lanes = fast driving" and want to see the
reasoning and the comparative data made explicit, not a 101-level
explainer for the general public.

Two separate routes, not tabs in one view:

- **`/rankings`** — explore the data: which metros/states are most
  dangerous, and how that's changed over time
- **`/anatomy`** — understand the reasoning: what specific street
  design choices make a street dangerous, illustrated with real
  before/after redesign examples

Plus a lightweight **`/`** landing page that frames both and lets
people jump into `/rankings` pre-filtered if they search their own
city.

Data and design system are already prepared — see below. Don't
re-derive them from the source PDF; use the provided files as-is.

---

## Data (already extracted — use these files directly)

Three JSON files plus a README, all under `data/`:

- **`metros.json`** — 101 US metro areas ranked by pedestrian fatality
  rate. Each entry: `rank`, `rank_numeric`, `tied`, `name`,
  `fatality_rate_per_100k`, `deaths_2020_2024`, `deaths_2015_2019`,
  `trend` (positive = got more dangerous since 2015-19 baseline).
- **`states.json`** — same shape, 50 states.
- **`key_stats.json`** — everything that isn't a per-place ranking:
  headline national numbers, demographic breakdowns (race/ethnicity,
  age — **national only, not per-metro**, don't imply otherwise),
  the US-vs-34-peer-countries comparison, and the Memphis case study
  details (location, problems identified, interventions shown).
- **`README.md`** — field definitions and known gaps. Read this first;
  it flags real gotchas (no lat/long included, so metros/states need
  geocoding for the map; income disparity is narrative-only in the
  source, not a clean number like race is).

## Design system (already extracted — use as-is)

See `STYLEGUIDE.md`. Highlights to not lose in translation:

- **Typeface**: Lato only (Google Fonts), hierarchy via weight
  (Regular → Bold → Black/Heavy), not via a second typeface.
- **Color is semantic, not decorative**: orange-red (`#EF5133` /
  `#EF4727`) means danger/worsening, blue (`#0082C7`) means
  comparison/context data, navy (`#00235D`) is a dark grounding color,
  yellow (`#FCBA2F`) is a rare accent — not a workhorse UI color.
  Define these as CSS custom properties / theme tokens
  (`--color-danger`, `--color-info`, etc.), not hardcoded hex.
- **Giant-stat-number pattern**: any headline metric gets an
  oversized display treatment (36–56px, Black weight) next to a small
  caption (11–14px) — use this for the landing page headline stats and
  the rankings detail panel, don't bury key numbers in body text or
  small table cells.
- **Soft-tint callout cards**: pastel tint backgrounds matching the
  accent (orange tint for danger stats, blue tint for context stats),
  no heavy borders.
- **Dot/bubble map, not choropleth**: the source report plots ranked
  places as sized dots on a simplified US outline rather than filling
  states/metros solid — follow that convention for `/rankings`'s map.
- **Real photography over iconography** if imagery is used at all —
  the source leans on real, named street photos, not stock icons.

---

## `/rankings` — Rankings Explorer

**Core interaction:**
- Toggle between **metros** and **states** (default doesn't matter,
  just make the toggle obvious)
- Map view: dots sized/colored by fatality rate, positioned
  geographically (you'll need to geocode metro/state names — Census
  or OMB metro definitions, or a geocoding API/library — since no
  coordinates are in the source data)
- Table view alongside or togglable with the map: sortable by rank,
  rate, raw deaths, trend
- Click a metro/state → detail panel:
  - Giant display number for the current fatality rate
  - 2015-19 vs 2020-24 comparison (raw deaths and rate)
  - Trend direction, framed the way the report does it — "getting
    worse" is the norm here, don't imply improvement from a ranking
    change alone if the underlying rate still rose (the report
    explicitly makes this distinction: a place can move down in rank
    while still getting more dangerous, if others got worse faster)
  - National demographic context from `key_stats.json`, clearly
    labeled as **national, not local** data — don't attach race/age
    breakdowns to an individual metro/state as if they were specific
    to that place
- **VMT-vs-per-capita toggle**: this is one of the report's core
  arguments — the US measures fatalities per vehicle-mile-traveled,
  which can make a rate look better simply because people drive more.
  The source data here is already per-capita; you likely can't
  actually recompute a VMT-adjusted number without VMT data per place
  (not included), so this can be a framed **explainer toggle** — show
  the report's own explanation of why per-capita is used instead of a
  fake recalculated number. Don't fabricate VMT figures.
- International comparison should be reachable from this view as a
  reference layer or panel (US 11.7 vs. 8.73 peer-nation benchmark,
  from `key_stats.json`) — gives scale to whatever place the person is
  looking at.

## `/anatomy` — Street Anatomy

**Core content: 3 illustrative scenes**, each a before/after (or
before/opportunity/after, matching the report's 3-panel Memphis
treatment) with annotated callouts explaining *why* each design
element is dangerous and what the fix addresses:

1. **Memphis intersection** (real case from the report) — Jackson
   Avenue & Hollywood Street. Problems: wide travel lanes, frequent
   driveways, long crossing distances. Interventions: reallocated lane
   space, shorter/improved crosswalks, shorter driveways, expanded
   pedestrian space, street trees. Use the case study fields already
   in `key_stats.json`.
2. **Suburban stroad** (illustrative archetype, not a real place) —
   multi-lane commercial corridor, big-box retail, parking lots.
   Dangers: excessive lane width sized for peak car volume, driveways
   every ~50 feet breaking up predictable crossings, no pedestrian
   refuge for 20+ second crossings. Fix: raised medians as refuge,
   consolidated driveways, protected turn phases.
3. **Historic downtown main street** (illustrative archetype) — older
   grid, on-street parking, real pedestrian volume, but signals timed
   for vehicle throughput not crossing demand. Fix: crossing-demand
   signal timing, restored diagonal/marked crossings, curb extensions.

**Presentation**: illustrative, not parametric — hand-authored
before/after imagery or SVG scenes per the report's own approach
(orange/red highlight overlays marking "space that could be
reallocated," matching the source's visual treatment), not
slider-driven live geometry. Each scene should read as a small
standalone case study: existing conditions → what's wrong → the fix →
why it works.

**Connective tissue to `/rankings`**: a link/CTA from an anatomy scene
back to relevant rankings context (e.g., "Memphis ranks #1 most
dangerous metro — see the full data") ties the two modes together
without merging them into one view.

---

## Suggested stack

No hard requirement, but given this is a data-plus-illustration site
with two distinct routes: a simple React app (Vite or Next.js) with
real routes for `/`, `/rankings`, `/anatomy`; Tailwind for styling
using the token palette above; a lightweight mapping approach (e.g.
react-simple-maps or a hand-drawn US outline SVG, consistent with the
source's own simplified-map style, rather than a full Mapbox/Leaflet
integration) since the geography here is metro/state-level, not
street-level.

## Priorities if time-constrained

1. Get `/rankings` working end-to-end with the table view first (map
   can follow — it needs geocoding work the table doesn't)
2. Ship the Memphis anatomy scene (real data already provided) before
   the two illustrative archetypes
3. Landing page last — it's mostly framing/navigation once the two
   modes exist
