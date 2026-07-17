const CARD_W = 185;
const CARD_H = 128;

function Card({
  x,
  y,
  color,
  bg,
  title,
  subtitle,
  lines,
}: {
  x: number;
  y: number;
  color: string;
  bg: string;
  title: string;
  subtitle: string;
  lines: string[];
}) {
  const cx = x + CARD_W / 2;
  return (
    <g>
      <rect x={x} y={y} width={CARD_W} height={CARD_H} rx="10" fill={bg} stroke={color} strokeWidth="1" />
      <text x={cx} y={y + 18} textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight={600} fill={color} fontFamily="var(--font-body)">
        {title}
      </text>
      <text x={cx} y={y + 36} textAnchor="middle" dominantBaseline="central" fontSize="11.5" fill={color} fontFamily="var(--font-body)">
        {subtitle}
      </text>
      {lines.map((line, i) => (
        <text
          key={i}
          x={cx}
          y={y + 58 + i * 20}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="11"
          fill={color}
          fontFamily="var(--font-body)"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export default function OutcomeUIDiagram() {
  return (
    <svg width="100%" viewBox="0 0 680 446" role="img" aria-label="What the interface shows for each of the five outcomes">
      <Card x={48} y={50} color="var(--tier-direct)" bg="var(--tier-direct-bg)" title="Direct answer" subtitle="With its source"
        lines={["✓ Save to filing button", "✓ Flag answer button", "No expert hand-off"]} />
      <Card x={248} y={50} color="var(--tier-hedge)" bg="var(--tier-hedge-bg)" title="Hedge" subtitle="With a caveat"
        lines={["✓ Save to filing button", "✓ Flag answer button", "No expert hand-off"]} />
      <Card x={448} y={50} color="var(--tier-escalate)" bg="var(--tier-escalate-bg)" title="Escalate" subtitle="Depends on you"
        lines={["✓ Expert Service button", "✓ Flag answer button", "No save button"]} />
      <Card x={148} y={208} color="var(--tier-escalate)" bg="var(--tier-escalate-bg)" title="Escalate" subtitle="Not covered yet"
        lines={["✓ Expert Service button", "✓ Flag answer button", "No save button"]} />
      <Card x={348} y={208} color="var(--tier-refuse)" bg="var(--tier-refuse-bg)" title="Refuse" subtitle="Explains why"
        lines={["✓ Expert Service button", "✓ Flag answer button", "No save button"]} />

      <rect x="40" y="356" width="600" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
      <text x="340" y="381" textAnchor="middle" dominantBaseline="central" fontSize="12.5" fill="var(--ink-soft)" fontFamily="var(--font-body)">
        Every answer also shows response time and rule count checked
      </text>
    </svg>
  );
}
