import type { KeyStats } from '../data/types';
import GiantStat from './GiantStat';

export default function IntlComparisonPanel({ keyStats, onClose }: { keyStats: KeyStats; onClose: () => void }) {
  const intl = keyStats.international_comparison;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl max-h-[85vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-black text-dark">How the US compares internationally</h3>
          <button
            onClick={onClose}
            className="text-gray-mid hover:text-ink text-xl leading-none shrink-0"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <GiantStat value={intl.us_traffic_fatality_rate_per_100k.toFixed(2)} caption="US traffic fatality rate /100k" tone="danger" size="md" />
          <GiantStat value={intl.peer_benchmark_rate_per_100k.toFixed(2)} caption="Rate if US matched 34 peer nations" tone="info" size="md" />
        </div>
        <p className="mt-3 text-sm text-gray-dark-2 leading-relaxed">{intl.peer_benchmark_note}</p>

        <div className="mt-6 rounded-xl bg-danger-tint p-4">
          <div className="text-sm text-gray-dark-2 leading-relaxed">
            US pedestrian deaths rose <strong className="text-danger-dark">{intl.us_pedestrian_fatality_change_2014_2024_pct}%</strong> from{' '}
            {intl.us_pedestrian_deaths_2014.toLocaleString()} (2014) to {intl.us_pedestrian_deaths_2024.toLocaleString()} (2024). Over the
            same decade, an estimated <strong className="text-danger-dark">{intl.lives_that_could_have_been_saved_if_us_matched_peers_over_10yr.toLocaleString()}</strong> lives
            could have been saved had the US matched its peers.
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs font-bold uppercase tracking-wide text-gray-mid mb-3">Peer countries, change 2015–2024</div>
          <div className="space-y-2">
            {Object.entries(intl.peer_examples).map(([country, data]) => (
              <div key={country} className="flex items-center justify-between border-b border-gray-light-3 pb-2">
                <div>
                  <div className="font-bold text-ink">{country}</div>
                  {data.note && <div className="text-xs text-gray-mid">{data.note}</div>}
                </div>
                <div className="font-black text-info text-lg">
                  {data.change_pct != null ? `${data.change_pct}%` : `${data.traffic_fatality_rate_per_100k}/100k`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
