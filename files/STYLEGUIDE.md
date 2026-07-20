# Design System — extracted from "Dangerous by Design 2026"

This is a visual analysis of the source report's own design (Smart
Growth America / National Complete Streets Coalition), meant to be
handed to Claude Code as styling instructions so the dashboard feels
like a natural extension of the report rather than a generic data app.

Colors and type sizes below are pulled directly from the PDF's vector
fill data and font metrics, not eyeballed — treat them as ground
truth, not inspiration.

## Color palette

**Primary accent — danger/alert (use for headline stats, worst-ranked
items, "getting worse" trend indicators):**
- `#EF5133` — primary orange-red (most-used accent color across the whole report)
- `#EF4727` — secondary/darker red variant (headline numbers, emphasis)

**Secondary accent — data/info (use for charts, comparisons, "neutral"
data emphasis, secondary CTAs):**
- `#0082C7` — primary blue (line charts, informational highlights)

**Dark accent (use for dark section backgrounds, strong headers):**
- `#00235D` — deep navy

**Tertiary accent — sparing use only (small highlight moments, not a
workhorse color):**
- `#FCBA2F` — gold/yellow

**Neutrals (body text, backgrounds, borders, dividers):**
- `#111111` / `#1E1E1E` — near-black, primary body text
- `#2A2C2B` / `#4E4E4A` — dark gray, secondary text
- `#666666` / `#909090` — mid gray, tertiary text / muted labels
- `#D8D9D8` / `#DADADA` / `#E1E1E1` — light gray, borders/dividers
- `#F8F8F8` — off-white, section backgrounds
- `#FFFFFF` — white

**Tint backgrounds (soft pastel fills for stat cards/callout boxes —
each is a ~10% tint of its matching accent):**
- `#FDEDEA` — orange tint (pairs with `#EF5133`)
- `#E4F1F9` / `#DFF4FC` / `#E8F7FD` — blue tints (pairs with `#0082C7`)
- `#FEF8EA` / `#FFF5DF` — yellow tints (pairs with `#FCBA2F`)

**How the report actually uses these:** orange-red is the dominant
voice — it marks anything "dangerous," worsening, or a headline
number. Blue is reserved for comparison/context data (the "everyone
else" line in charts, secondary stats). Navy shows up as a dark
grounding color, not a UI-chrome color. Yellow is a rare accent, almost
never a primary UI color. Don't reach for a generic "govt dashboard"
blue-and-white palette — the report's point of view is visually
argumentative (red = bad, happening now) more than neutral.

## Typography

**Typeface: Lato**, weights used — Regular, Bold, Black, Heavy. This
is the entire type system; no serif or secondary display face
anywhere in the report. Use `Lato` (Google Fonts) as the single
typeface across the whole app, differentiating hierarchy purely
through weight and size, not by switching families.

**Type scale** (derived from measured ratios in the source file,
translated to a standard 16px web body size):

| Role | Report ratio | Suggested web size | Weight |
|---|---|---|---|
| Hero headline ("Welcome to Dangerous by Design") | 1.0 | ~48–56px | Black/Heavy |
| Giant display stat ("39K+", "7,080") | 0.80 | ~36–40px | Black |
| Body / intro paragraph | 0.32 (baseline) | 16–18px | Regular |
| Stat caption (small label under a big number) | 0.24–0.25 | 13–14px | Bold, often uppercase |
| Footer / fine print | 0.19 | 11–12px | Regular |

The report leans hard on the contrast between **huge, bold display
numbers** and **small, restrained caption text** right next to them —
that contrast is doing most of the visual work, more than color does
in some layouts. Don't undersize the hero stats; they're meant to
dominate the frame.

## Layout patterns to carry over

- **Stat-first hero framing**: any page-level or section-level metric
  (total deaths, fatality rate, % change) gets its own oversized
  number treatment, not just inline text — e.g. a `rankings` metro
  detail panel should lead with the fatality rate as a giant number,
  not bury it in a table row.
- **Soft-tint callout cards**: small supporting stats sit in cards
  with a pastel tint background matching their accent color (orange
  tint for danger stats, blue tint for context/comparison stats),
  generous internal padding, no heavy borders — the tint alone
  separates the card from the page background.
- **Generous whitespace, editorial margins**: this reads as a
  magazine/report layout, not a dense dashboard. Resist the urge to
  pack multiple data points edge-to-edge; let individual stats breathe.
- **Dot/bubble maps over choropleth**: the ranking pages use sized
  dots plotted against a simplified map outline rather than a filled
  choropleth — worth considering for the metro/state rankings map
  view, since it's the report's own visual language for "these are
  the worst places."
- **Before/after paired imagery with color-coded overlays**: the
  street-redesign case study shows existing conditions, an
  "opportunity" overlay (orange/red highlighting the specific space
  that could change), and the redesigned result, side by side — good
  precedent for the `/anatomy` mode's illustrative scenes.
- **Line charts**: US line rendered in the orange-red accent for
  emphasis, comparison/peer countries in blue or neutral gray — the
  "us vs. everyone else" framing is a color choice, not just a legend.
- **Real photography, not stock-illustration**: the report uses actual
  street photos (named by city) as texture and grounding, not generic
  icons. If the dashboard uses imagery, real or realistic street
  photography fits the tone better than iconography or illustration.

## Practical instructions for Claude Code

- Load `Lato` from Google Fonts; set it as the only font-family in the
  design tokens.
- Define the palette above as CSS custom properties / Tailwind theme
  extensions rather than hardcoding hex values inline, so "danger red"
  and "info blue" stay semantic (e.g. `--color-danger`,
  `--color-info`, `--color-dark`, `--color-accent`) rather than
  literal color names — this keeps the metro/state rank coloring
  (worst = danger, improving = a calmer tone) consistent everywhere.
- Reserve `#FCBA2F` (yellow) for rare emphasis only — don't let it
  become a default UI color; it isn't one in the source.
- Keep hierarchy weight-driven (Black/Heavy for display, Regular for
  body) rather than introducing a second typeface for headers.
