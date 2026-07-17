import Modal from "./Modal";
import TierBadge from "./TierBadge";

export default function QuickGuideModal({ onClose }: { onClose: () => void }) {
  const rows = [
    { tier: "direct", text: "A fixed rule applies. You get a straight answer with its source." },
    { tier: "hedge", text: "A real answer, with a condition or documentation requirement stated upfront." },
    { tier: "escalate", reason: "needs_numbers", text: "There's a rule, but it depends on your numbers. You get routed to a Taxfix expert." },
    { tier: "escalate", reason: "out_of_scope", text: "Not covered by this assistant yet. You get routed to a Taxfix expert." },
    { tier: "refuse", text: "The request itself isn't something a tax assistant should help with." },
  ];

  return (
    <Modal title="Quick guide" onClose={onClose}>
      <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, marginTop: 0 }}>
        Ask a real question, the way you'd ask a colleague. Every answer is color-coded so you
        always know how much to trust it.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, margin: "18px 0" }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <TierBadge tier={r.tier} escalateReason={r.reason} />
            <div style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.5, paddingLeft: 2 }}>
              {r.text}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: "var(--bg)",
          borderRadius: 10,
          padding: "12px 14px",
          fontSize: 13,
          color: "var(--ink-soft)",
          lineHeight: 1.6,
        }}
      >
        Two small buttons appear under direct and hedge answers: <strong>Save to my filing</strong>{" "}
        bookmarks a deduction for later, and <strong>Flag this answer</strong> reports something
        that looks wrong. Both are demo placeholders here, not live actions.
      </div>
    </Modal>
  );
}
