"use client";

import { useState } from "react";
import knowledgeBase from "@/lib/knowledge-base.json";

const SCHEMA_FIELDS: { field: string; desc: string }[] = [
  { field: "id", desc: "Unique rule number" },
  { field: "category", desc: "Topic grouping" },
  { field: "question", desc: "The plain-language question this rule answers" },
  { field: "legal_basis", desc: "The German tax law section behind it" },
  { field: "risk_if_wrong", desc: "Low, medium, or high" },
  { field: "financial_consequence", desc: "What actually happens if this is misapplied" },
  { field: "depends_on_personal_data", desc: "Whether a general answer is safe, or the user's numbers matter" },
  { field: "tier", desc: "direct, hedge, escalate, or refuse" },
  { field: "answer / escalation_reason", desc: "The response text, or why it can't be answered directly" },
  { field: "sources", desc: "The citation shown to the user" },
];

const TIER_COLOR: Record<string, string> = {
  direct: "var(--tier-direct)",
  hedge: "var(--tier-hedge)",
  escalate: "var(--tier-escalate)",
  refuse_to_resolve_directly: "var(--tier-refuse)",
};
const TIER_BG: Record<string, string> = {
  direct: "var(--tier-direct-bg)",
  hedge: "var(--tier-hedge-bg)",
  escalate: "var(--tier-escalate-bg)",
  refuse_to_resolve_directly: "var(--tier-refuse-bg)",
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 12px",
  fontSize: 11.5,
  fontWeight: 600,
  color: "var(--ink-soft)",
  textTransform: "uppercase",
  letterSpacing: 0.4,
  borderBottom: "1px solid var(--border)",
  whiteSpace: "nowrap",
  position: "sticky",
  top: 0,
  background: "var(--bg-panel)",
};
const tdStyle: React.CSSProperties = {
  padding: "10px 12px",
  fontSize: 12.5,
  color: "var(--ink)",
  borderBottom: "1px solid var(--border)",
  verticalAlign: "top",
};

export default function KnowledgeBaseExplorer() {
  const [tab, setTab] = useState<"table" | "json">("table");
  const rules = (knowledgeBase as any).rules as any[];

  return (
    <div>
      {/* Schema template */}
      <div
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "20px 22px",
          marginBottom: 24,
        }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
          The template every rule follows
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 14, lineHeight: 1.5 }}>
          Ten fields, filled in the same order for all 18 rules. This structure is what lets the
          system grade its own confidence instead of guessing at it.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
          {SCHEMA_FIELDS.map((f) => (
            <div key={f.field} style={{ display: "flex", gap: 8, fontSize: 12.5 }}>
              <code
                style={{
                  fontFamily: "monospace",
                  background: "var(--bg-panel)",
                  border: "1px solid var(--border)",
                  borderRadius: 5,
                  padding: "1px 6px",
                  color: "var(--tier-direct)",
                  fontSize: 11.5,
                  whiteSpace: "nowrap",
                  height: "fit-content",
                }}
              >
                {f.field}
              </code>
              <span style={{ color: "var(--ink-soft)" }}>{f.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {(["table", "json"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: tab === t ? "var(--ink)" : "var(--bg-panel)",
              color: tab === t ? "#fff" : "var(--ink)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {t === "table" ? "Table view" : "Raw JSON"}
          </button>
        ))}
      </div>

      {tab === "table" ? (
        <>
          <div
            style={{
              overflowX: "auto",
              border: "1px solid var(--border)",
              borderRadius: 10,
              maxHeight: 520,
              overflowY: "auto",
            }}
          >
            <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 1400 }}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Category</th>
                  <th style={{ ...thStyle, minWidth: 220 }}>Question</th>
                  <th style={thStyle}>Legal basis</th>
                  <th style={thStyle}>Risk</th>
                  <th style={thStyle}>Depends on data?</th>
                  <th style={thStyle}>Tier</th>
                  <th style={{ ...thStyle, minWidth: 260 }}>Financial consequence</th>
                  <th style={{ ...thStyle, minWidth: 280 }}>Answer / escalation reason</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((r) => (
                  <tr key={r.id}>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{r.id}</td>
                    <td style={tdStyle}>{r.category}</td>
                    <td style={tdStyle}>{r.question}</td>
                    <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>{r.legal_basis}</td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: 999,
                          background:
                            r.risk_if_wrong === "high"
                              ? "var(--tier-refuse-bg)"
                              : r.risk_if_wrong === "medium"
                              ? "var(--tier-hedge-bg)"
                              : "var(--tier-direct-bg)",
                          color:
                            r.risk_if_wrong === "high"
                              ? "var(--tier-refuse)"
                              : r.risk_if_wrong === "medium"
                              ? "var(--tier-hedge)"
                              : "var(--tier-direct)",
                        }}
                      >
                        {r.risk_if_wrong}
                      </span>
                    </td>
                    <td style={tdStyle}>{r.depends_on_personal_data ? "Yes" : "No"}</td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: 999,
                          background: TIER_BG[r.tier] ?? "var(--bg)",
                          color: TIER_COLOR[r.tier] ?? "var(--ink-soft)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.tier === "refuse_to_resolve_directly" ? "escalate (refuse)" : r.tier}
                      </span>
                    </td>
                    <td style={tdStyle}>{r.financial_consequence}</td>
                    <td style={tdStyle}>{r.answer ?? r.escalation_reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 10, lineHeight: 1.5, fontStyle: "italic" }}>
            This table is for walkthroughs. The assistant itself never sees a table, it reads the
            JSON below.
          </div>
        </>
      ) : (
        <div>
          <pre
            style={{
              background: "var(--ink)",
              color: "#dce7de",
              borderRadius: 10,
              padding: "18px 20px",
              fontSize: 12,
              lineHeight: 1.6,
              overflowX: "auto",
              maxHeight: 520,
              overflowY: "auto",
              fontFamily: "monospace",
            }}
          >
            {JSON.stringify(knowledgeBase, null, 2)}
          </pre>
          <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 10, lineHeight: 1.5, fontStyle: "italic" }}>
            This is the exact file the API route loads and passes to the model. Nothing is
            simplified or reformatted for this view.
          </div>
        </div>
      )}
    </div>
  );
}
