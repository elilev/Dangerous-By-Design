import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import type { PlaceRow } from '../data/types';

const GEO_URL = `${import.meta.env.BASE_URL}data/us-states-10m.json`;

interface UsDotMapProps {
  places: PlaceRow[];
  coords: Record<string, [number, number]>;
  selected: string | null;
  onSelect: (name: string) => void;
}

export default function UsDotMap({ places, coords, selected, onSelect }: UsDotMapProps) {
  const rates = places.map((p) => p.fatality_rate_per_100k);
  const max = Math.max(...rates);
  const min = Math.min(...rates);

  const radius = (rate: number) => {
    const t = max === min ? 0.5 : (rate - min) / (max - min);
    return 2.5 + t * 10;
  };

  return (
    <ComposableMap projection="geoAlbersUsa" className="w-full h-auto">
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#F8F8F8"
              stroke="#DADADA"
              strokeWidth={0.75}
              style={{
                default: { outline: 'none' },
                hover: { outline: 'none', fill: '#F1F1F1' },
                pressed: { outline: 'none' },
              }}
            />
          ))
        }
      </Geographies>
      {places.map((p) => {
        const c = coords[p.name];
        if (!c) return null;
        const isSelected = selected === p.name;
        return (
          <Marker key={p.name} coordinates={c} onClick={() => onSelect(p.name)}>
            <circle
              r={radius(p.fatality_rate_per_100k)}
              fill={isSelected ? '#00235D' : '#EF5133'}
              fillOpacity={isSelected ? 1 : 0.6}
              stroke={isSelected ? '#EF4727' : '#ffffff'}
              strokeWidth={isSelected ? 2 : 0.5}
              className="cursor-pointer"
            />
          </Marker>
        );
      })}
    </ComposableMap>
  );
}
