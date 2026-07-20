import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import metros from '../data/metros.json';
import states from '../data/states.json';
import keyStats from '../data/key_stats.json';
import { METRO_COORDS, STATE_COORDS } from '../data/coordinates';
import type { PlaceRow, KeyStats } from '../data/types';
import UsDotMap from '../components/UsDotMap';
import RankTable from '../components/RankTable';
import DetailPanel from '../components/DetailPanel';
import VmtExplainer from '../components/VmtExplainer';
import IntlComparisonPanel from '../components/IntlComparisonPanel';

const METROS = metros as PlaceRow[];
const STATES = states as PlaceRow[];
const KEY_STATS = keyStats as KeyStats;

type Mode = 'metro' | 'state';
type View = 'map' | 'table';

function findByName(list: PlaceRow[], query: string): PlaceRow | undefined {
  const q = query.trim().toLowerCase();
  if (!q) return undefined;
  return list.find((p) => p.name.toLowerCase().includes(q));
}

export default function Rankings() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<Mode>('metro');
  const [view, setView] = useState<View>('table');
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showVmt, setShowVmt] = useState(false);
  const [showIntl, setShowIntl] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (!q) return;
    const metroHit = findByName(METROS, q);
    if (metroHit) {
      setMode('metro');
      setSelected(metroHit.name);
      setSearch(q);
      return;
    }
    const stateHit = findByName(STATES, q);
    if (stateHit) {
      setMode('state');
      setSelected(stateHit.name);
      setSearch(q);
    }
  }, [searchParams]);

  const data = mode === 'metro' ? METROS : STATES;
  const coords = mode === 'metro' ? METRO_COORDS : STATE_COORDS;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter((p) => p.name.toLowerCase().includes(q));
  }, [data, search]);

  const selectedPlace = useMemo(
    () => data.find((p) => p.name === selected) ?? null,
    [data, selected],
  );

  function switchMode(next: Mode) {
    setMode(next);
    setSelected(null);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-dark">Rankings explorer</h1>
          <p className="mt-2 text-gray-mid max-w-xl">
            Pedestrian fatality rate per 100,000 people, 2020–2024, ranked most to least dangerous.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => setShowIntl(true)}
            className="text-sm font-bold text-info hover:underline"
          >
            How does the US compare internationally? →
          </button>
          <button
            onClick={() => setShowVmt(true)}
            className="text-sm font-bold text-gray-mid hover:underline"
          >
            Why per-capita, not per-mile-driven?
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="inline-flex rounded-full border border-gray-light-3 p-1">
          {(['metro', 'state'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                mode === m ? 'bg-dark text-white' : 'text-gray-mid hover:text-ink'
              }`}
            >
              {m === 'metro' ? 'Metros (101)' : 'States (50)'}
            </button>
          ))}
        </div>

        <div className="inline-flex rounded-full border border-gray-light-3 p-1">
          {(['table', 'map'] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize transition-colors ${
                view === v ? 'bg-danger text-white' : 'text-gray-mid hover:text-ink'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${mode === 'metro' ? 'metros' : 'states'}...`}
          className="flex-1 min-w-[180px] rounded-full border border-gray-light-3 px-4 py-1.5 text-sm outline-none focus:border-info"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div>
          {view === 'table' ? (
            <RankTable places={filtered} selected={selected} onSelect={setSelected} />
          ) : (
            <div className="rounded-lg border border-gray-light-3 p-4 bg-offwhite">
              <UsDotMap places={filtered} coords={coords} selected={selected} onSelect={setSelected} />
              <p className="mt-3 text-xs text-gray-mid text-center">
                Dot size and color intensity scale with fatality rate. Positions are approximate
                centroids for the primary named place, not precise metro boundaries.
              </p>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          {selectedPlace ? (
            <DetailPanel place={selectedPlace} placeType={mode} keyStats={KEY_STATS} />
          ) : (
            <div className="rounded-xl border border-dashed border-gray-light-3 p-6 text-sm text-gray-mid">
              Select a {mode === 'metro' ? 'metro area' : 'state'} from the {view} to see its detail —
              fatality rate, trend since 2015–2019, and national context.
            </div>
          )}
        </div>
      </div>

      {showVmt && <VmtExplainer keyStats={KEY_STATS} onClose={() => setShowVmt(false)} />}
      {showIntl && <IntlComparisonPanel keyStats={KEY_STATS} onClose={() => setShowIntl(false)} />}
    </div>
  );
}
