import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import keyStats from '../data/key_stats.json';
import type { KeyStats } from '../data/types';
import GiantStat from '../components/GiantStat';

const KEY_STATS = keyStats as KeyStats;

export default function Landing() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function goToRankings(e: React.FormEvent) {
    e.preventDefault();
    const params = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : '';
    navigate(`/rankings${params}`);
  }

  const h = KEY_STATS.headline;

  return (
    <div>
      <section className="border-b border-gray-light-3 bg-offwhite">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-danger">
            {KEY_STATS.publisher}
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-black text-dark leading-[1.05]">
            Dangerous by Design 2026
          </h1>
          <p className="mt-5 text-lg text-gray-dark-2 max-w-2xl mx-auto leading-relaxed">
            US pedestrian deaths keep climbing — not because people are less careful, but because
            streets are engineered for speed over safety. This is the data, and the design choices
            behind it.
          </p>

          <form onSubmit={goToRankings} className="mt-8 flex justify-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search your city or state..."
              className="w-full max-w-sm rounded-full border border-gray-light-3 bg-white px-5 py-3 text-sm outline-none focus:border-info"
            />
            <button
              type="submit"
              className="rounded-full bg-danger px-6 py-3 text-sm font-bold text-white hover:bg-danger-dark transition-colors"
            >
              See the data
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <GiantStat value={h.pedestrian_deaths_2024.toLocaleString()} caption="Pedestrian deaths, 2024" size="md" />
          <GiantStat
            value={`+${h.pedestrian_fatality_increase_2009_2024_pct}%`}
            caption="Rise since 2009"
            size="md"
          />
          <GiantStat
            value={`${h.pct_fatalities_on_state_owned_roads_2024}%`}
            caption="Deaths on state-owned roads, 2024"
            tone="info"
            size="md"
          />
          <GiantStat
            value={h.years_to_return_to_2009_levels_at_current_decline_rate.toString()}
            caption="Year we'd return to 2009 levels, at current pace"
            tone="dark"
            size="md"
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 grid md:grid-cols-2 gap-6">
        <Link
          to="/rankings"
          className="group rounded-2xl bg-danger-tint p-8 hover:shadow-lg transition-shadow"
        >
          <div className="text-xs font-bold uppercase tracking-wide text-danger-dark">Explore the data</div>
          <h2 className="mt-2 text-2xl font-black text-dark">Rankings</h2>
          <p className="mt-3 text-sm text-gray-dark-2 leading-relaxed">
            Which metros and states are most dangerous for people walking, and how that's changed
            since 2015–2019. Map and table views, sortable, with national and international context.
          </p>
          <div className="mt-4 text-sm font-bold text-danger-dark group-hover:underline">
            View rankings →
          </div>
        </Link>

        <Link
          to="/anatomy"
          className="group rounded-2xl bg-info-tint p-8 hover:shadow-lg transition-shadow"
        >
          <div className="text-xs font-bold uppercase tracking-wide text-info">Understand the reasoning</div>
          <h2 className="mt-2 text-2xl font-black text-dark">Street anatomy</h2>
          <p className="mt-3 text-sm text-gray-dark-2 leading-relaxed">
            What specific street design choices make a street dangerous — illustrated with a real
            Memphis intersection redesign and two archetypal before/after scenes.
          </p>
          <div className="mt-4 text-sm font-bold text-info group-hover:underline">
            See the anatomy →
          </div>
        </Link>
      </section>
    </div>
  );
}
