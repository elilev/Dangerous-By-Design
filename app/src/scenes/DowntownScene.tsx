// Illustrative archetype — not a real place. An older downtown grid:
// on-street parking, real pedestrian volume, but signals and crossings
// still designed around vehicle throughput rather than crossing demand.

const ROAD = '#5a5c5b';
const LANE_LINE = '#ffffff';
const SIDEWALK = '#e9e6df';
const BUILDING = '#00235d';
const PARKING_LANE = '#4a4c4b';

function Callout({ x, y, label, tone = 'danger' }: { x: number; y: number; label: string; tone?: 'danger' | 'info' }) {
  const width = label.length * 6.2 + 20;
  const fill = tone === 'danger' ? '#EF5133' : '#0082C7';
  return (
    <g>
      <circle cx={x} cy={y} r={4} fill={fill} />
      <rect x={x + 8} y={y - 12} width={width} height={22} rx={11} fill={fill} />
      <text x={x + 8 + width / 2} y={y + 3} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
        {label}
      </text>
    </g>
  );
}

export default function DowntownScene({ phase }: { phase: string }) {
  const isAfter = phase === 'after';
  const roadTop = 190;
  const roadBottom = 290;

  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto">
      {/* corner storefront buildings, close to sidewalk */}
      <rect x={0} y={0} width={340} height={roadTop - 30} fill={BUILDING} opacity={0.85} />
      <rect x={460} y={0} width={340} height={roadTop - 30} fill={BUILDING} opacity={0.85} />
      <rect x={0} y={roadBottom + 30} width={340} height={480 - roadBottom - 30} fill={BUILDING} opacity={0.85} />
      <rect x={460} y={roadBottom + 30} width={340} height={480 - roadBottom - 30} fill={BUILDING} opacity={0.85} />
      {/* storefront awning strip */}
      {[0, 460].map((x) => (
        <rect key={x} x={x} y={roadTop - 30} width={340} height={8} fill="#EF4727" opacity={0.7} />
      ))}
      {[0, 460].map((x) => (
        <rect key={`b-${x}`} x={x} y={roadBottom + 22} width={340} height={8} fill="#EF4727" opacity={0.7} />
      ))}

      {/* sidewalks */}
      <rect x={0} y={roadTop - 22} width={800} height={22} fill={SIDEWALK} />
      <rect x={0} y={roadBottom} width={800} height={22} fill={SIDEWALK} />
      <rect x={340 - 22} y={0} width={22} height={480} fill={SIDEWALK} />
      <rect x={460} y={0} width={22} height={480} fill={SIDEWALK} />

      {/* road */}
      <rect x={0} y={roadTop} width={800} height={roadBottom - roadTop} fill={ROAD} />
      <rect x={340} y={0} width={120} height={480} fill={ROAD} />

      {/* on-street parking lanes */}
      <rect x={0} y={roadTop} width={800} height={16} fill={PARKING_LANE} />
      <rect x={0} y={roadBottom - 16} width={800} height={16} fill={PARKING_LANE} />
      {Array.from({ length: 24 }).map((_, i) => (
        <line key={`s1-${i}`} x1={i * 34} y1={roadTop} x2={i * 34} y2={roadTop + 16} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      ))}
      {Array.from({ length: 24 }).map((_, i) => (
        <line key={`s2-${i}`} x1={i * 34} y1={roadBottom - 16} x2={i * 34} y2={roadBottom} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
      ))}

      {/* travel lane markings */}
      <line x1={0} y1={(roadTop + roadBottom) / 2} x2={340} y2={(roadTop + roadBottom) / 2} stroke={LANE_LINE} strokeDasharray="10 8" strokeWidth={2} />
      <line x1={460} y1={(roadTop + roadBottom) / 2} x2={800} y2={(roadTop + roadBottom) / 2} stroke={LANE_LINE} strokeDasharray="10 8" strokeWidth={2} />
      <line x1={380} y1={0} x2={380} y2={480} stroke={LANE_LINE} strokeDasharray="10 8" strokeWidth={2} />
      <line x1={420} y1={0} x2={420} y2={480} stroke={LANE_LINE} strokeDasharray="10 8" strokeWidth={2} />

      {/* crosswalks: before has only west leg marked; after has all legs + diagonal */}
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={`w${i}`} x={300 + i * 6} y={roadTop + 6} width={3} height={roadBottom - roadTop - 12} fill="#fff" opacity={0.9} />
      ))}
      {isAfter &&
        Array.from({ length: 7 }).map((_, i) => (
          <rect key={`e${i}`} x={462 + i * 6} y={roadTop + 6} width={3} height={roadBottom - roadTop - 12} fill="#fff" opacity={0.9} />
        ))}
      {isAfter &&
        Array.from({ length: 7 }).map((_, i) => (
          <rect key={`n${i}`} x={344} y={130 + i * 6} width={roadTop - 130 + 6} height={3} fill="#fff" opacity={0.9} transform="rotate(0)" />
        ))}
      {isAfter && (
        // diagonal (Barnes Dance) crosswalk across the intersection
        <g opacity={0.85}>
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={i}
              x1={340 + i * 13}
              y1={roadTop}
              x2={460 - (9 - i) * 13}
              y2={roadBottom}
              stroke="#fff"
              strokeWidth={3}
            />
          ))}
        </g>
      )}

      {/* curb extensions, after only */}
      {isAfter && (
        <>
          <rect x={300} y={roadTop - 22} width={40} height={22} fill={SIDEWALK} rx={6} />
          <rect x={460} y={roadTop - 22} width={40} height={22} fill={SIDEWALK} rx={6} />
          <rect x={300} y={roadBottom} width={40} height={22} fill={SIDEWALK} rx={6} />
          <rect x={460} y={roadBottom} width={40} height={22} fill={SIDEWALK} rx={6} />
        </>
      )}

      {/* signal icon */}
      <g transform="translate(470,150)">
        <rect x={0} y={0} width={20} height={44} rx={4} fill="#1E1E1E" />
        <circle cx={10} cy={11} r={6} fill={isAfter ? '#3a3a3a' : '#EF5133'} />
        <circle cx={10} cy={22} r={6} fill={'#3a3a3a'} />
        <circle cx={10} cy={33} r={6} fill={isAfter ? '#0082C7' : '#3a3a3a'} />
      </g>

      {!isAfter ? (
        <>
          <Callout x={470} y={140} label="signal timed for car throughput" />
          <Callout x={460} y={100} label="only 1 leg marked" />
        </>
      ) : (
        <>
          <Callout x={330} y={roadTop - 40} label="curb extensions, all corners" tone="info" />
          <Callout x={380} y={roadBottom + 40} label="crossing-demand signal timing" tone="info" />
        </>
      )}
    </svg>
  );
}
