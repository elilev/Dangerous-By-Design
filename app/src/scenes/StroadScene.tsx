// Illustrative archetype — not a real place. A generic multi-lane
// commercial corridor: big-box retail, parking lots, driveways every
// ~50ft, no pedestrian refuge for a 20+ second crossing.

const ROAD = '#5a5c5b';
const LANE_LINE = '#ffffff';
const SIDEWALK = '#e9e6df';
const BUILDING = '#00235d';
const PARKING = '#d8d9d8';
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

export default function StroadScene({ phase }: { phase: string }) {
  const isAfter = phase === 'after';
  const roadTop = 155;
  const roadBottom = 245;

  const driveways = isAfter ? [120, 660] : [40, 130, 220, 310, 400, 490, 580, 670, 760];

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      {/* big-box buildings */}
      <rect x={40} y={20} width={200} height={50} fill={BUILDING} opacity={0.85} />
      <rect x={560} y={20} width={200} height={50} fill={BUILDING} opacity={0.85} />
      <rect x={40} y={330} width={200} height={50} fill={BUILDING} opacity={0.85} />
      <rect x={560} y={330} width={200} height={50} fill={BUILDING} opacity={0.85} />

      {/* parking lots */}
      <rect x={0} y={70} width={800} height={roadTop - 70 - 10} fill={PARKING} />
      <rect x={0} y={roadBottom + 10} width={800} height={330 - (roadBottom + 10)} fill={PARKING} />
      {Array.from({ length: 26 }).map((_, i) => (
        <line key={`p1-${i}`} x1={i * 32} y1={75} x2={i * 32} y2={roadTop - 15} stroke="#fff" strokeWidth={2} opacity={0.7} />
      ))}
      {Array.from({ length: 26 }).map((_, i) => (
        <line key={`p2-${i}`} x1={i * 32} y1={roadBottom + 15} x2={i * 32} y2={325} stroke="#fff" strokeWidth={2} opacity={0.7} />
      ))}

      {/* sidewalks */}
      <rect x={0} y={roadTop - 10} width={800} height={10} fill={SIDEWALK} />
      <rect x={0} y={roadBottom} width={800} height={10} fill={SIDEWALK} />

      {/* road */}
      <rect x={0} y={roadTop} width={800} height={roadBottom - roadTop} fill={ROAD} />

      {isAfter ? (
        <>
          <rect x={0} y={196} width={800} height={8} fill={MEDIAN} />
          {/* median refuge cut-outs at crossing points */}
          <rect x={110} y={196} width={20} height={8} fill={SIDEWALK} />
          <rect x={650} y={196} width={20} height={8} fill={SIDEWALK} />
          <line x1={0} y1={175} x2={800} y2={175} stroke={LANE_LINE} strokeDasharray="10 8" strokeWidth={2} />
          <line x1={0} y1={225} x2={800} y2={225} stroke={LANE_LINE} strokeDasharray="10 8" strokeWidth={2} />
        </>
      ) : (
        [172, 189, 211, 228].map((y) => (
          <line key={y} x1={0} y1={y} x2={800} y2={y} stroke={LANE_LINE} strokeDasharray="10 8" strokeWidth={2} />
        ))
      )}

      {/* crosswalk */}
      {Array.from({ length: 7 }).map((_, i) => (
        <rect
          key={i}
          x={(isAfter ? 100 : 380) + i * 6}
          y={roadTop + 4}
          width={3}
          height={roadBottom - roadTop - 8}
          fill="#fff"
          opacity={0.9}
        />
      ))}

      {/* driveways */}
      {driveways.map((x) => (
        <g key={x}>
          <rect x={x} y={roadTop - 10} width={isAfter ? 46 : 24} height={10} fill={ROAD} />
          <rect x={x} y={roadBottom} width={isAfter ? 46 : 24} height={10} fill={ROAD} />
        </g>
      ))}

      {isAfter ? (
        <>
          <Callout x={20} y={196} label="raised median refuge" tone="info" />
          <Callout x={340} y={roadTop - 30} label="consolidated driveway" tone="info" />
        </>
      ) : (
        <>
          <Callout x={330} y={130} label="~20+ sec crossing, no refuge" />
          <Callout x={20} y={roadTop - 30} label="driveway every ~50ft" />
        </>
      )}
    </svg>
  );
}
