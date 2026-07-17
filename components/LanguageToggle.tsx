"use client";

import { useState } from "react";
import Tooltip from "./Tooltip";

export default function LanguageToggle() {
  const [lang, setLang] = useState<"EN" | "DE">("EN");

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div
        style={{
          display: "inline-flex",
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: 999,
          padding: 2,
        }}
      >
        {(["EN", "DE"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              border: "none",
              padding: "5px 12px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              background: lang === l ? "var(--ink)" : "transparent",
              color: lang === l ? "#fff" : "var(--ink-soft)",
            }}
          >
            {l}
          </button>
        ))}
      </div>
      <Tooltip label="Language toggle" align="right">
        Concept only in this demo. The production version would translate responses and rule text into German.
      </Tooltip>
    </div>
  );
}
