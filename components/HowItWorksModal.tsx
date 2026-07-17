import Modal from "./Modal";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 8,
          color: "var(--ink)",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

export default function HowItWorksModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Under the hood" onClose={onClose}>
      <Section title="Grounded, not guessed">
        The assistant can only answer from 18 curated, sourced tax rules. If a question
        doesn't match a rule, it escalates rather than answering from general model
        knowledge. Every citation shown is looked up server-side from the actual rule,
        never taken from the model's own claim.
      </Section>

      <Section title="Two kinds of escalation, decided deterministically">
        "Needs your numbers" and "Outside what I know" look similar but come from different
        places. If a matched rule is tagged escalate, the system knows the rule and just
        needs your specifics. If no rule matches at all, that split is computed by the
        server from whether a rule id came back, not asked of the model, so it can't be
        talked out of it.
      </Section>

      <Section title="Misuse check runs first">
        Before matching any rule, the system checks whether the request itself is
        legitimate. Evasion, fraud-adjacent requests, and prompt injection attempts are
        refused before the knowledge base is even consulted.
      </Section>

      <Section title="Considered, not built into this demo">
        <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
          <li style={{ marginBottom: 6 }}>
            <strong>Personalization from login and filing history</strong> would improve
            answers, but pushes closer to individualized advice, which the tier system is
            deliberately designed to route to a human instead.
          </li>
          <li style={{ marginBottom: 6 }}>
            <strong>Retrieval-based knowledge base</strong> for scale beyond roughly 50
            rules, at 18 rules the full set fits in one prompt, that stops working at
            hundreds of rules.
          </li>
          <li style={{ marginBottom: 6 }}>
            <strong>Legal disclaimer and liability language</strong>, needed before any
            real user sees this, not designed here.
          </li>
          <li>
            <strong>Full audit logging</strong> for dispute resolution, every question,
            answer, and matched rule version, needed for production, not built for a demo.
          </li>
        </ul>
      </Section>

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
        Full source, knowledge base, and evaluation results:{" "}
        <a
          href="https://github.com/Dhavalk21/taxfix-assistant"
          target="_blank"
          rel="noreferrer"
          style={{ color: "var(--tier-direct)", fontWeight: 600 }}
        >
          github.com/Dhavalk21/taxfix-assistant
        </a>
      </div>
    </Modal>
  );
}
