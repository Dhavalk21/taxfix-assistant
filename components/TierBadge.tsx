import Tooltip from "./Tooltip";

const TIER_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; explainer: string }
> = {
  direct: {
    label: "Direct answer",
    color: "var(--tier-direct)",
    bg: "var(--tier-direct-bg)",
    explainer:
      "This is a fixed rule that doesn't depend on your personal numbers, safe to answer plainly.",
  },
  hedge: {
    label: "Answer with caveat",
    color: "var(--tier-hedge)",
    bg: "var(--tier-hedge-bg)",
    explainer:
      "There's a real answer here, but it comes with a condition or documentation requirement you need to know.",
  },
  escalate_needs_numbers: {
    label: "Needs your numbers",
    color: "var(--tier-escalate)",
    bg: "var(--tier-escalate-bg)",
    explainer:
      "There's a rule for this, but the right answer depends on your specific revenue or situation. A Taxfix expert can apply it to you.",
  },
  escalate_out_of_scope: {
    label: "Outside what I know",
    color: "var(--tier-escalate)",
    bg: "var(--tier-escalate-bg)",
    explainer:
      "This isn't covered by my rules yet, so I won't guess. A Taxfix expert can help directly.",
  },
  refuse: {
    label: "Can't help with this",
    color: "var(--tier-refuse)",
    bg: "var(--tier-refuse-bg)",
    explainer:
      "This request falls outside what a tax assistant should help with, for example hiding income or misrepresenting an expense.",
  },
};

export default function TierBadge({
  tier,
  escalateReason,
}: {
  tier: string;
  escalateReason?: string | null;
}) {
  const key =
    tier === "escalate"
      ? escalateReason === "out_of_scope"
        ? "escalate_out_of_scope"
        : "escalate_needs_numbers"
      : tier;
  const config = TIER_CONFIG[key] ?? TIER_CONFIG.escalate_needs_numbers;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 10px 3px 8px",
        borderRadius: 999,
        background: config.bg,
        color: config.color,
        fontSize: 12.5,
        fontWeight: 600,
        fontFamily: "var(--font-display)",
        letterSpacing: 0.2,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: config.color,
          flexShrink: 0,
        }}
      />
      {config.label}
      <Tooltip label={config.label}>{config.explainer}</Tooltip>
    </span>
  );
}
