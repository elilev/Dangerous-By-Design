import type { KeyStats } from '../data/types';

export default function VmtExplainer({ keyStats, onClose }: { keyStats: KeyStats; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-black text-dark">Why per-capita, not per-mile-driven?</h3>
          <button
            onClick={onClose}
            className="text-gray-mid hover:text-ink text-xl leading-none shrink-0"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-dark-2 leading-relaxed">{keyStats.measurement_note}</p>
        <div className="mt-5 rounded-xl bg-accent-tint p-4 text-sm text-gray-dark-2 leading-relaxed">
          The rankings on this page use the report's per-capita figures throughout. A VMT-adjusted
          number isn't included here — the source report doesn't publish per-mile-driven rates
          broken out by metro or state, so recomputing one would mean fabricating data rather than
          reporting it.
        </div>
      </div>
    </div>
  );
}
