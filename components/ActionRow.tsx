"use client";

import { useState } from "react";
import Tooltip from "./Tooltip";

export default function ActionRow({ showSave }: { showSave: boolean }) {
  const [saved, setSaved] = useState(false);
  const [flagged, setFlagged] = useState(false);

  const btnBase: React.CSSProperties = {
    fontSize: 12.5,
    fontWeight: 600,
    padding: "7px 12px",
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--bg)",
    color: "var(--ink)",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
      {showSave && (
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          <button
            onClick={() => setSaved((s) => !s)}
            style={{
              ...btnBase,
              background: saved ? "var(--tier-direct-bg)" : "var(--bg)",
              color: saved ? "var(--tier-direct)" : "var(--ink)",
              borderColor: saved ? "var(--tier-direct)" : "var(--border)",
            }}
          >
            {saved ? "✓ Saved to filing" : "Save to my filing"}
          </button>
          <Tooltip label="Save to filing">
            Demo only. In the full product, this would flag the deduction in your tax return draft for review at filing time.
          </Tooltip>
        </span>
      )}
      <span style={{ display: "inline-flex", alignItems: "center" }}>
        <button
          onClick={() => setFlagged((f) => !f)}
          style={{
            ...btnBase,
            background: flagged ? "var(--tier-refuse-bg)" : "var(--bg)",
            color: flagged ? "var(--tier-refuse)" : "var(--ink)",
            borderColor: flagged ? "var(--tier-refuse)" : "var(--border)",
          }}
        >
          {flagged ? "✓ Flagged" : "Flag this answer"}
        </button>
        <Tooltip label="Flag this answer">
          Demo only. In production, flagged answers get reviewed by a tax expert and feed back into fixing the knowledge base.
        </Tooltip>
      </span>
    </div>
  );
}
