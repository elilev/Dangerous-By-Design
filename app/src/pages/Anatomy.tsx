import { Link } from 'react-router-dom';
import keyStats from '../data/key_stats.json';
import type { KeyStats } from '../data/types';
import AnatomyScene from '../components/AnatomyScene';
import MemphisScene from '../scenes/MemphisScene';
import StroadScene from '../scenes/StroadScene';
import DowntownScene from '../scenes/DowntownScene';

const KEY_STATS = keyStats as KeyStats;
const cs = KEY_STATS.case_study;

export default function Anatomy() {
  return (
    <div>
      <div className="border-b border-gray-light-3 bg-offwhite">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="text-xs font-bold uppercase tracking-widest text-danger">
            Street Anatomy
          </div>
          <h1 className="mt-2 text-3xl md:text-4xl font-black text-dark">
            What makes a street dangerous — and how it gets fixed
          </h1>
          <p className="mt-4 text-gray-dark-2 max-w-2xl leading-relaxed">
            Three scenes: one real intersection, and two common archetypes. Each moves through
            existing conditions, what's wrong, and the redesign — with the orange highlight marking
            space that could be reallocated to people instead of vehicle throughput, the same visual
            language the report itself uses.
          </p>
        </div>
      </div>

      <AnatomyScene
        eyebrow="Real case study"
        title="Jackson Avenue & Hollywood Street"
        location={cs.location}
        phases={[
          { key: 'existing', label: 'Existing' },
          { key: 'opportunity', label: 'Opportunity' },
          { key: 'redesigned', label: 'Redesigned' },
        ]}
        renderScene={(phase) => <MemphisScene phase={phase} />}
        problems={cs.problems_identified}
        interventions={cs.interventions_shown}
        whyItWorks="Narrowing travel lanes to what traffic volume actually needs frees up space for a median refuge and wider sidewalks, without adding pavement. Shorter, refuge-protected crossings mean less time exposed to traffic; consolidated driveways mean fewer conflict points where a driver isn't watching for people on foot."
        rankingsCta={
          <Link to="/rankings?q=Memphis" className="text-sm font-bold text-danger-dark hover:underline">
            Memphis ranks #1 most dangerous metro — see the full data →
          </Link>
        }
      />

      <AnatomyScene
        eyebrow="Illustrative archetype — not a real place"
        title="The suburban stroad"
        phases={[
          { key: 'before', label: 'Before' },
          { key: 'after', label: 'After' },
        ]}
        renderScene={(phase) => <StroadScene phase={phase} />}
        problems={[
          'Excessive lane width, sized for peak car volume rather than typical demand',
          'Driveways every ~50 feet, breaking up any predictable place to cross',
          'No pedestrian refuge for a 20+ second crossing',
        ]}
        interventions={[
          'Raised medians as a mid-crossing refuge',
          'Consolidated driveways, fewer conflict points',
          'Protected turn phases at signals',
        ]}
        whyItWorks="A refuge island splits one long, high-stress crossing into two shorter, more manageable ones — a person only has to judge one direction of traffic at a time. Consolidating driveways removes the unpredictable turning movements that make big-box corridors so dangerous for anyone not in a car."
      />

      <AnatomyScene
        eyebrow="Illustrative archetype — not a real place"
        title="The historic downtown main street"
        phases={[
          { key: 'before', label: 'Before' },
          { key: 'after', label: 'After' },
        ]}
        renderScene={(phase) => <DowntownScene phase={phase} />}
        problems={[
          'Real pedestrian volume, but signals timed for vehicle throughput, not crossing demand',
          'Only one leg of the intersection has a marked crossing',
          'No curb extensions — full-width crossings even where on-street parking already narrows the effective road',
        ]}
        interventions={[
          'Crossing-demand signal timing',
          'Restored marked crossings on every leg, including a diagonal crossing',
          'Curb extensions at every corner',
        ]}
        whyItWorks="These streets already have the bones of a safe main street — parked cars slow traffic, buildings sit close to the sidewalk. The fix isn't new pavement, it's re-timing signals around how people actually move and shortening crossings with curb extensions that were designed away in favor of car throughput."
      />

      <div className="mx-auto max-w-5xl px-6 py-14 text-center">
        <Link
          to="/rankings"
          className="inline-block rounded-full bg-dark px-8 py-3 text-sm font-bold text-white hover:bg-info transition-colors"
        >
          See which places rank worst →
        </Link>
      </div>
    </div>
  );
}
