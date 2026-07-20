import type { PlaceRow, KeyStats } from '../data/types';
import GiantStat from './GiantStat';
import StatCard from './StatCard';

interface DetailPanelProps {
  place: PlaceRow;
  placeType: 'metro' | 'state';
  keyStats: KeyStats;
}

export default function DetailPanel({ place, placeType, keyStats }: DetailPanelProps) {
  const baselineRate = place.fatality_rate_per_100k - place.trend;
  const gotWorse = place.trend > 0;
  const total = placeType === 'metro' ? keyStats.methodology.metro_ranking_count : keyStats.methodology.state_ranking_count;

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-wide text-gray-mid">
          {placeType === 'metro' ? 'Metro area' : 'State'} · Rank {place.rank} of {total}
          {place.tied && ' (tied)'}
        </div>
        <h2 className="text-2xl font-black text-dark mt-1">{place.name}</h2>
      </div>

      <GiantStat
        value={place.fatality_rate_per_100k.toFixed(2)}
        caption="Pedestrian deaths per 100,000 people, 2020–2024"
        tone="danger"
      />

      <div className={`rounded-xl p-4 ${gotWorse ? 'bg-danger-tint' : 'bg-info-tint'}`}>
        <div className={`text-sm font-bold ${gotWorse ? 'text-danger-dark' : 'text-info'}`}>
          {gotWorse ? 'Getting more dangerous' : 'Rate declined'} since the 2015–2019 baseline
        </div>
        <div className="text-sm text-gray-dark-2 mt-1.5 leading-relaxed">
          Rate moved from <strong>{baselineRate.toFixed(2)}</strong> to{' '}
          <strong>{place.fatality_rate_per_100k.toFixed(2)}</strong> per 100k (
          {gotWorse ? '+' : ''}
          {place.trend.toFixed(2)}).{' '}
          {gotWorse &&
            "A place can still fall in the ranking even while its own rate rises, if other places got worse faster — rank alone doesn't mean things improved here."}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard value={place.deaths_2015_2019.toLocaleString()} label="Deaths, 2015–2019" tone="info" />
        <StatCard value={place.deaths_2020_2024.toLocaleString()} label="Deaths, 2020–2024" tone="danger" />
      </div>

      <div className="border-t border-gray-light-3 pt-4">
        <div className="text-xs font-bold uppercase tracking-wide text-gray-mid mb-2">
          National context — not specific to {place.name}
        </div>
        <p className="text-sm text-gray-dark-2 leading-relaxed">
          Nationally, pedestrian fatality rates are highest among American Indian and Alaska Native
          people ({keyStats.demographics.by_race_ethnicity['American Indian and Alaska Native']} per
          100k — {keyStats.demographics.race_disparity_note.split('.')[0].toLowerCase()}) and adults
          aged 50–64 ({keyStats.demographics.by_age['50-64']} per 100k). The report doesn't break
          demographics out by metro or state, so these figures describe the US as a whole, not{' '}
          {place.name} specifically.
        </p>
      </div>
    </div>
  );
}
