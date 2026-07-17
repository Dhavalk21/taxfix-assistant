import Link from "next/link";
import DecisionFlowDiagram from "@/components/DecisionFlowDiagram";
import OutcomeUIDiagram from "@/components/OutcomeUIDiagram";
import KnowledgeBaseExplorer from "@/components/KnowledgeBaseExplorer";

export const metadata = {
  title: "How it's built — Taxfix Assistant",
};

export default function ArchitecturePage() {
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "40px 24px 80px" }}>
      <Link
        href="/"
        style={{
          fontSize: 13,
          color: "var(--ink-soft)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          marginBottom: 24,
        }}
      >
        ← Back to assistant
      </Link>

      <div style={{ marginBottom: 40 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--tier-direct)",
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          System design
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 700,
            margin: "0 0 8px",
            letterSpacing: -0.5,
          }}
        >
          How this assistant is built
        </h1>
        <div style={{ fontSize: 14.5, color: "var(--ink-soft)" }}>
          Concept, trust architecture, and knowledge base designed by Dhaval Kareliya.
        </div>
      </div>

      {/* Section 1: Decision flow */}
      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>
          The decision path
        </h2>
        <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 680, margin: "0 0 20px" }}>
          Every question passes a misuse check first, then gets matched against the knowledge
          base. The tier isn't guessed, it's read directly off whichever rule matched, or the
          absence of one.
        </p>
        <div
          style={{
            background: "var(--bg-panel)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "24px 16px",
          }}
        >
          <DecisionFlowDiagram />
        </div>
      </section>

      {/* Section 2: Outcome UI */}
      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>
          What you see, by outcome
        </h2>
        <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 680, margin: "0 0 20px" }}>
          Five outcomes, five different cards. The two blue ones look almost identical on
          purpose, same buttons and behavior, only the reason underneath differs.
        </p>
        <div
          style={{
            background: "var(--bg-panel)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "24px 16px",
          }}
        >
          <OutcomeUIDiagram />
        </div>
      </section>

      {/* Section 3: Knowledge base */}
      <section>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>
          Inside the knowledge base
        </h2>
        <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 680, margin: "0 0 20px" }}>
          The assistant can only answer from what's written here, 18 rules, each one sourced and
          tagged with how risky it is to get wrong. Nothing outside this file gets treated as
          fact.
        </p>
        <KnowledgeBaseExplorer />
      </section>
    </div>
  );
}
