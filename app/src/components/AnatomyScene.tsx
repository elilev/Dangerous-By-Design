import { useState } from 'react';
import type { ReactNode } from 'react';

interface AnatomySceneProps {
  eyebrow: string;
  title: string;
  location?: string;
  phases: { key: string; label: string }[];
  renderScene: (phase: string) => ReactNode;
  problems: string[];
  interventions: string[];
  whyItWorks: string;
  rankingsCta?: ReactNode;
}

export default function AnatomyScene({
  eyebrow,
  title,
  location,
  phases,
  renderScene,
  problems,
  interventions,
  whyItWorks,
  rankingsCta,
}: AnatomySceneProps) {
  const [phase, setPhase] = useState(phases[0].key);

  return (
    <section className="border-t border-gray-light-3 py-14">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-xs font-bold uppercase tracking-widest text-danger">{eyebrow}</div>
        <h2 className="mt-2 text-3xl font-black text-dark">{title}</h2>
        {location && <div className="mt-1 text-sm font-bold text-gray-mid">{location}</div>}

        <div className="mt-6 inline-flex rounded-full border border-gray-light-3 p-1">
          {phases.map((p) => (
            <button
              key={p.key}
              onClick={() => setPhase(p.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                phase === p.key ? 'bg-dark text-white' : 'text-gray-mid hover:text-ink'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-gray-light-3 bg-offwhite p-4 md:p-6">
          {renderScene(phase)}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-xl bg-danger-tint p-5">
            <div className="text-xs font-bold uppercase tracking-wide text-danger-dark mb-2">
              What's wrong
            </div>
            <ul className="space-y-1.5">
              {problems.map((p) => (
                <li key={p} className="text-sm text-gray-dark-2 flex gap-2">
                  <span className="text-danger-dark">•</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-info-tint p-5">
            <div className="text-xs font-bold uppercase tracking-wide text-info mb-2">The fix</div>
            <ul className="space-y-1.5">
              {interventions.map((p) => (
                <li key={p} className="text-sm text-gray-dark-2 flex gap-2">
                  <span className="text-info">•</span> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-dark-2 leading-relaxed max-w-3xl">{whyItWorks}</p>

        {rankingsCta && <div className="mt-6">{rankingsCta}</div>}
      </div>
    </section>
  );
}
