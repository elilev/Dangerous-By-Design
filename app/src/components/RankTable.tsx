import { useState } from 'react';
import type { PlaceRow } from '../data/types';

type SortKey = 'rank_numeric' | 'fatality_rate_per_100k' | 'deaths_2020_2024' | 'trend';

interface RankTableProps {
  places: PlaceRow[];
  selected: string | null;
  onSelect: (name: string) => void;
}

const HEADERS: { key: SortKey; label: string }[] = [
  { key: 'rank_numeric', label: 'Rank' },
  { key: 'fatality_rate_per_100k', label: 'Rate /100k' },
  { key: 'deaths_2020_2024', label: 'Deaths 20-24' },
  { key: 'trend', label: 'Trend' },
];

export default function RankTable({ places, selected, onSelect }: RankTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('rank_numeric');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'rank_numeric' ? 'asc' : 'desc');
    }
  }

  const sorted = [...places].sort((a, b) => {
    const diff = a[sortKey] - b[sortKey];
    return sortDir === 'asc' ? diff : -diff;
  });

  return (
    <div className="overflow-auto max-h-[560px] rounded-lg border border-gray-light-3">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-offwhite z-10">
          <tr>
            <th
              onClick={() => toggleSort('rank_numeric')}
              className="text-left px-3 py-2 font-bold uppercase text-xs tracking-wide text-gray-mid cursor-pointer select-none whitespace-nowrap"
            >
              Rank{sortKey === 'rank_numeric' ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ''}
            </th>
            <th className="text-left px-3 py-2 font-bold uppercase text-xs tracking-wide text-gray-mid">
              Place
            </th>
            {HEADERS.slice(1).map((h) => (
              <th
                key={h.key}
                onClick={() => toggleSort(h.key)}
                className="text-left px-3 py-2 font-bold uppercase text-xs tracking-wide text-gray-mid cursor-pointer select-none whitespace-nowrap"
              >
                {h.label}
                {sortKey === h.key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr
              key={p.name}
              onClick={() => onSelect(p.name)}
              className={`cursor-pointer border-t border-gray-light-3 hover:bg-danger-tint/60 ${
                selected === p.name ? 'bg-danger-tint' : ''
              }`}
            >
              <td className="px-3 py-2 font-bold whitespace-nowrap">{p.rank}</td>
              <td className="px-3 py-2">{p.name}</td>
              <td className="px-3 py-2 font-black text-danger-dark whitespace-nowrap">
                {p.fatality_rate_per_100k.toFixed(2)}
              </td>
              <td className="px-3 py-2 whitespace-nowrap">{p.deaths_2020_2024.toLocaleString()}</td>
              <td
                className={`px-3 py-2 font-bold whitespace-nowrap ${
                  p.trend > 0 ? 'text-danger' : 'text-info'
                }`}
              >
                {p.trend > 0 ? '+' : ''}
                {p.trend.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
