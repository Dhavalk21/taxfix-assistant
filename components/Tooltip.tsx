"use client";

import { useState } from "react";

export default function Tooltip({
  label,
  align = "center",
  children,
}: {
  label: string;
  align?: "center" | "left" | "right";
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // "center" balances over the icon, default for most in-flow tooltips.
  // "right" anchors the tooltip's left edge to the icon so it opens
  // rightward, used near the left screen edge to avoid clipping.
  // "left" anchors the tooltip's right edge to the icon so it opens
  // leftward, used near the right screen edge.
  const positionStyle: React.CSSProperties =
    align === "right"
      ? { bottom: "calc(100% + 8px)", left: 0, transform: "none" }
      : align === "left"
      ? { bottom: "calc(100% + 8px)", right: 0, left: "auto", transform: "none" }
      : { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" };

  const arrowStyle: React.CSSProperties =
    align === "right"
      ? { left: 10, transform: "none" }
      : align === "left"
      ? { right: 10, left: "auto", transform: "none" }
      : { left: "50%", transform: "translateX(-50%)" };

  return (
    <span
      style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={`More info: ${label}`}
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 16,
          height: 16,
          marginLeft: 5,
          borderRadius: "50%",
          border: "1px solid var(--ink-soft)",
          background: "transparent",
          color: "var(--ink-soft)",
          fontSize: 10,
          fontWeight: 600,
          cursor: "pointer",
          lineHeight: 1,
          padding: 0,
        }}
      >
        i
      </button>
      {open && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            ...positionStyle,
            background: "var(--ink)",
            color: "#fff",
            fontSize: 12.5,
            lineHeight: 1.45,
            padding: "8px 10px",
            borderRadius: 8,
            width: 220,
            zIndex: 20,
            boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
            fontWeight: 400,
          }}
        >
          {children}
          <span
            style={{
              position: "absolute",
              top: "100%",
              ...arrowStyle,
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid var(--ink)",
            }}
          />
        </span>
      )}
    </span>
  );
}
