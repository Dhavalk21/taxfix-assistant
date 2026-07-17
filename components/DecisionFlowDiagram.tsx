export default function DecisionFlowDiagram() {
  const ink = "var(--ink)";
  const inkSoft = "var(--ink-soft)";
  const border = "var(--border)";

  return (
    <svg width="100%" viewBox="0 0 680 651" role="img" aria-label="Flowchart of the decision path from question to answer">
      <defs>
        <marker id="df-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke={inkSoft} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Start */}
      <rect x="220" y="45" width="240" height="44" rx="8" fill="var(--bg)" stroke={border} strokeWidth="1" />
      <text x="340" y="67" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight={600} fill={ink} fontFamily="var(--font-body)">User asks a question</text>
      <line x1="340" y1="89" x2="340" y2="121" stroke={inkSoft} strokeWidth="1" markerEnd="url(#df-arrow)" />

      {/* Diamond 1 */}
      <polygon points="340,123 490,165 340,207 190,165" fill="var(--bg)" stroke={border} strokeWidth="1" />
      <text x="340" y="159" textAnchor="middle" dominantBaseline="central" fontSize="12" fill={inkSoft} fontFamily="var(--font-body)">Evasion, fraud, or</text>
      <text x="340" y="173" textAnchor="middle" dominantBaseline="central" fontSize="12" fill={inkSoft} fontFamily="var(--font-body)">a jailbreak?</text>

      <path d="M490,165 L575,165 L575,191" fill="none" stroke={inkSoft} strokeWidth="1" markerEnd="url(#df-arrow)" />
      <line x1="340" y1="207" x2="340" y2="237" stroke={inkSoft} strokeWidth="1" markerEnd="url(#df-arrow)" />

      {/* Refuse */}
      <rect x="505" y="193" width="130" height="56" rx="8" fill="var(--tier-refuse-bg)" stroke="var(--tier-refuse)" strokeWidth="1" />
      <text x="570" y="213" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight={600} fill="var(--tier-refuse)" fontFamily="var(--font-body)">Refuse</text>
      <text x="570" y="231" textAnchor="middle" dominantBaseline="central" fontSize="11.5" fill="var(--tier-refuse)" fontFamily="var(--font-body)">Explains why</text>

      {/* Process */}
      <rect x="200" y="239" width="280" height="56" rx="8" fill="var(--bg)" stroke={border} strokeWidth="1" />
      <text x="340" y="259" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight={600} fill={ink} fontFamily="var(--font-body)">Match against rules</text>
      <text x="340" y="277" textAnchor="middle" dominantBaseline="central" fontSize="11.5" fill={inkSoft} fontFamily="var(--font-body)">18 sourced tax rules</text>
      <line x1="340" y1="295" x2="340" y2="327" stroke={inkSoft} strokeWidth="1" markerEnd="url(#df-arrow)" />

      {/* Diamond 2 */}
      <polygon points="340,329 470,371 340,413 210,371" fill="var(--bg)" stroke={border} strokeWidth="1" />
      <text x="340" y="365" textAnchor="middle" dominantBaseline="central" fontSize="12" fill={inkSoft} fontFamily="var(--font-body)">Does a rule</text>
      <text x="340" y="379" textAnchor="middle" dominantBaseline="central" fontSize="12" fill={inkSoft} fontFamily="var(--font-body)">match?</text>

      <path d="M470,371 L490,371 L505,379" fill="none" stroke={inkSoft} strokeWidth="1" markerEnd="url(#df-arrow)" />
      <line x1="340" y1="413" x2="340" y2="439" stroke={inkSoft} strokeWidth="1" markerEnd="url(#df-arrow)" />

      {/* Escalate: outside scope */}
      <rect x="505" y="351" width="130" height="56" rx="8" fill="var(--tier-escalate-bg)" stroke="var(--tier-escalate)" strokeWidth="1" />
      <text x="570" y="371" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight={600} fill="var(--tier-escalate)" fontFamily="var(--font-body)">Escalate</text>
      <text x="570" y="389" textAnchor="middle" dominantBaseline="central" fontSize="11.5" fill="var(--tier-escalate)" fontFamily="var(--font-body)">Not covered yet</text>

      {/* Diamond 3 */}
      <polygon points="340,441 490,485 340,529 190,485" fill="var(--bg)" stroke={border} strokeWidth="1" />
      <text x="340" y="479" textAnchor="middle" dominantBaseline="central" fontSize="12" fill={inkSoft} fontFamily="var(--font-body)">What tier is</text>
      <text x="340" y="493" textAnchor="middle" dominantBaseline="central" fontSize="12" fill={inkSoft} fontFamily="var(--font-body)">the rule?</text>

      <path d="M190,485 L110,485 L110,519" fill="none" stroke={inkSoft} strokeWidth="1" markerEnd="url(#df-arrow)" />
      <path d="M340,529 L340,553" fill="none" stroke={inkSoft} strokeWidth="1" markerEnd="url(#df-arrow)" />
      <line x1="490" y1="485" x2="503" y2="485" stroke={inkSoft} strokeWidth="1" markerEnd="url(#df-arrow)" />

      {/* Escalate: needs numbers */}
      <rect x="505" y="457" width="130" height="56" rx="8" fill="var(--tier-escalate-bg)" stroke="var(--tier-escalate)" strokeWidth="1" />
      <text x="570" y="477" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight={600} fill="var(--tier-escalate)" fontFamily="var(--font-body)">Escalate</text>
      <text x="570" y="495" textAnchor="middle" dominantBaseline="central" fontSize="11.5" fill="var(--tier-escalate)" fontFamily="var(--font-body)">Depends on you</text>

      {/* Direct */}
      <rect x="45" y="521" width="130" height="56" rx="8" fill="var(--tier-direct-bg)" stroke="var(--tier-direct)" strokeWidth="1" />
      <text x="110" y="541" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight={600} fill="var(--tier-direct)" fontFamily="var(--font-body)">Direct answer</text>
      <text x="110" y="559" textAnchor="middle" dominantBaseline="central" fontSize="11.5" fill="var(--tier-direct)" fontFamily="var(--font-body)">With its source</text>

      {/* Hedge */}
      <rect x="275" y="555" width="130" height="56" rx="8" fill="var(--tier-hedge-bg)" stroke="var(--tier-hedge)" strokeWidth="1" />
      <text x="340" y="575" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight={600} fill="var(--tier-hedge)" fontFamily="var(--font-body)">Hedge</text>
      <text x="340" y="593" textAnchor="middle" dominantBaseline="central" fontSize="11.5" fill="var(--tier-hedge)" fontFamily="var(--font-body)">With a caveat</text>
    </svg>
  );
}
