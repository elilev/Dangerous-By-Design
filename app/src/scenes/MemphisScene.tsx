// Simplified top-down plan-view diagram of Jackson Ave & Hollywood St, Memphis.
// Not to scale — an illustrative abstraction of the report's before/opportunity/after
// treatment, matching its orange/red "space that could be reallocated" overlay convention.

const ROAD = '#5a5c5b';
const LANE_LINE = '#ffffff';
const SIDEWALK = '#e9e6df';
const BUILDING = '#00235d';
const PARKING = '#d8d9d8';
const TREE = '#4c7a3d';
const MEDIAN = '#c9d9b8';

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

export default function MemphisScene({ phase }: { phase: string }) {
  const isExisting = phase === 'existing';
  const isOpportunity = phase === 'opportunity';
  const isRedesigned = phase === 'redesigned';

  // Wide-lane geometry (existing / opportunity) vs reallocated (redesigned)
  const roadTop = isRedesigned ? 190 : 170;
  const roadBottom = isRedesigned ? 310 : 330;

  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto">
      {/* corner parcels */}
      <rect x={0} y={0} width={340} height={roadTop} fill={BUILDING} opacity={0.85} />
      <rect x={460} y={0} width={340} height={roadTop} fill={BUILDING} opacity={0.85} />
      <rect x={0} y={roadBottom} width={340} height={480 - roadBottom} fill={BUILDING} opacity={0.85} />
      <rect x={460} y={roadBottom} width={340} height={480 - roadBottom} fill={BUILDING} opacity={0.85} />

      {/* parking lots in front of corner buildings */}
      <rect x={20} y={roadTop - 55} width={300} height={45} fill={PARKING} />
      <rect x={480} y={roadTop - 55} width={300} height={45} fill={PARKING} />
      <rect x={20} y={roadBottom + 10} width={300} height={45} fill={PARKING} />
      <rect x={480} y={roadBottom + 10} width={300} height={45} fill={PARKING} />

      {/* sidewalks */}
      <rect x={0} y={roadTop - 12} width={800} height={12} fill={SIDEWALK} />
      <rect x={0} y={roadBottom} width={800} height={12} fill={SIDEWALK} />
      <rect x={340 - 12} y={0} width={12} height={480} fill={SIDEWALK} />
      <rect x={460} y={0} width={12} height={480} fill={SIDEWALK} />

      {/* horizontal road (Jackson Ave) */}
      <rect x={0} y={roadTop} width={800} height={roadBottom - roadTop} fill={ROAD} />
      {/* vertical road (Hollywood St) */}
      <rect x={340} y={0} width={120} height={480} fill={ROAD} />

      {/* lane markings, horizontal */}
      {isRedesigned ? (
        <>
          <rect x={0} y={248} width={340} height={4} fill={MEDIAN} />
          <rect x={460} y={248} width={340} height={4} fill={MEDIAN} />
          <line x1={0} y1={220} x2={340} y2={220} stroke={LANE_LINE} strokeDasharray="10 8" strokeWidth={2} />
          <line x1={0} y1={280} x2={340} y2={280} stroke={LANE_LINE} strokeDasharray="10 8" strokeWidth={2} />
          <line x1={460} y1={220} x2={800} y2={220} stroke={LANE_LINE} strokeDasharray="10 8" strokeWidth={2} />
          <line x1={460} y1={280} x2={800} y2={280} stroke={LANE_LINE} strokeDasharray="10 8" strokeWidth={2} />
        </>
      ) : (
        <>
          {[204, 232, 260, 288].map((y) => (
            <line key={y} x1={0} y1={y} x2={800} y2={y} stroke={LANE_LINE} strokeDasharray="10 8" strokeWidth={2} />
          ))}
        </>
      )}

      {/* vertical lane markings */}
      <line x1={380} y1={0} x2={380} y2={480} stroke={LANE_LINE} strokeDasharray="10 8" strokeWidth={2} />
      <line x1={420} y1={0} x2={420} y2={480} stroke={LANE_LINE} strokeDasharray="10 8" strokeWidth={2} />

      {/* crosswalks (west & east legs, crossing Jackson Ave) */}
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={`w${i}`} x={300 + i * 6} y={roadTop + 6} width={3} height={roadBottom - roadTop - 12} fill="#fff" opacity={0.9} />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={`e${i}`} x={462 + i * 6} y={roadTop + 6} width={3} height={roadBottom - roadTop - 12} fill="#fff" opacity={0.9} />
      ))}

      {/* curb extensions (redesigned only) */}
      {isRedesigned && (
        <>
          <path d={`M 340 ${roadTop} Q 300 ${roadTop} 300 ${roadTop + 40} L 300 ${roadTop} Z`} fill={SIDEWALK} />
          <circle cx={296} cy={roadTop + 12} r={5} fill={SIDEWALK} />
          <rect x={280} y={roadTop - 6} width={20} height={18} fill={SIDEWALK} />
          <rect x={480} y={roadTop - 6} width={20} height={18} fill={SIDEWALK} />
          <rect x={280} y={roadBottom - 12} width={20} height={18} fill={SIDEWALK} />
          <rect x={480} y={roadBottom - 12} width={20} height={18} fill={SIDEWALK} />
        </>
      )}

      {/* driveways cut into top sidewalk */}
      {isExisting || isOpportunity ? (
        <>
          {[40, 110, 180, 250].map((x) => (
            <rect key={x} x={x} y={roadTop - 12} width={30} height={12} fill={ROAD} />
          ))}
          {[520, 590, 660, 730].map((x) => (
            <rect key={x} x={x} y={roadTop - 12} width={30} height={12} fill={ROAD} />
          ))}
        </>
      ) : (
        <>
          <rect x={140} y={roadTop - 12} width={30} height={12} fill={ROAD} />
          <rect x={630} y={roadTop - 12} width={30} height={12} fill={ROAD} />
        </>
      )}

      {/* trees, redesigned only */}
      {isRedesigned &&
        [30, 90, 150, 210, 270, 530, 590, 650, 710, 770].map((x) => (
          <circle key={x} cx={x} cy={roadTop - 20} r={7} fill={TREE} />
        ))}
      {isRedesigned &&
        [30, 90, 150, 210, 270, 530, 590, 650, 710, 770].map((x) => (
          <circle key={`b-${x}`} cx={x} cy={roadBottom + 20} r={7} fill={TREE} />
        ))}

      {/* opportunity overlay: highlight excess lane width + driveway clutter */}
      {isOpportunity && (
        <>
          <rect x={0} y={170} width={800} height={20} fill="#EF5133" opacity={0.35} />
          <rect x={0} y={310} width={800} height={20} fill="#EF5133" opacity={0.35} />
          {[40, 110, 180, 250, 520, 590, 660, 730].map((x) => (
            <rect key={x} x={x - 4} y={roadTop - 20} width={38} height={20} fill="#EF5133" opacity={0.45} />
          ))}
        </>
      )}

      {/* callouts */}
      {isExisting && (
        <>
          <Callout x={40} y={250} label="6 wide travel lanes" />
          <Callout x={480} y={125} label="driveway every ~35ft" />
          <Callout x={370} y={30} label="160ft crossing, no refuge" />
        </>
      )}
      {isOpportunity && (
        <>
          <Callout x={20} y={165} label="lane width to reallocate" />
          <Callout x={520} y={100} label="driveways to consolidate" />
        </>
      )}
      {isRedesigned && (
        <>
          <Callout x={370} y={244} label="median pedestrian refuge" tone="info" />
          <Callout x={40} y={roadTop - 40} label="street trees" tone="info" />
          <Callout x={300} y={roadTop - 20} label="curb extension" tone="info" />
        </>
      )}
    </svg>
  );
}
