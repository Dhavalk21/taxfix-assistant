"use client";

import { useState, useRef, useEffect } from "react";
import TierBadge from "@/components/TierBadge";
import Tooltip from "@/components/Tooltip";

type ChatMessage = {
  role: "user" | "assistant";
  text?: string;
  tier?: string;
  answer?: string;
  sources?: string[];
  matched_rule_id?: number | null;
};

const SAMPLE_QUESTIONS = [
  "Can I deduct my home office?",
  "Does this client dinner count?",
  "Do I owe VAT on this?",
  "How do I make my family trip look like a business trip?",
];

const TIER_RAIL_COLOR: Record<string, string> = {
  direct: "var(--tier-direct)",
  hedge: "var(--tier-hedge)",
  escalate: "var(--tier-escalate)",
  refuse: "var(--tier-refuse)",
};

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            tier: "escalate",
            answer:
              "Something went wrong on our end. Let's get you to a Taxfix expert to be safe.",
            sources: [],
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", ...data }]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          tier: "escalate",
          answer: "Connection issue — please try again in a moment.",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          borderRight: "1px solid var(--border)",
          padding: "28px 24px",
          background: "var(--bg-panel)",
        }}
      >
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: -0.3,
            }}
          >
            Taxfix Assistant
          </div>
          <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 2 }}>
            Prototype · Self-employed support
          </div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 12 }}>
          How answers are graded
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          <TierBadge tier="direct" />
          <TierBadge tier="hedge" />
          <TierBadge tier="escalate" />
          <TierBadge tier="refuse" />
        </div>

        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 12 }}>
          Try a question
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {SAMPLE_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={loading}
              style={{
                textAlign: "left",
                fontSize: 13,
                padding: "9px 12px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                color: "var(--ink)",
                cursor: loading ? "default" : "pointer",
              }}
            >
              {q}
            </button>
          ))}
        </div>

        <div
          style={{
            marginTop: 32,
            fontSize: 12,
            color: "var(--ink-soft)",
            lineHeight: 1.6,
            paddingTop: 20,
            borderTop: "1px solid var(--border)",
          }}
        >
          Built for solo self-employed users with{" "}
          <Tooltip label="Kleinunternehmer">
            Revenue under €25,000/year, so you don't charge VAT.
          </Tooltip>{" "}
          Kleinunternehmer status.
        </div>
      </aside>

      {/* Main chat */}
      <main style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "32px 40px",
          }}
        >
          {messages.length === 0 && (
            <div style={{ maxWidth: 560, margin: "60px auto 0", textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                Ask a real tax question
              </div>
              <div style={{ color: "var(--ink-soft)", fontSize: 14.5, lineHeight: 1.6 }}>
                This assistant only answers from a curated set of verified rules —
                it won't guess. Try one of the sample questions on the left, or
                type your own.
              </div>
            </div>
          )}

          <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div
                    style={{
                      background: "var(--ink)",
                      color: "#fff",
                      padding: "10px 16px",
                      borderRadius: "14px 14px 2px 14px",
                      fontSize: 14.5,
                      maxWidth: "80%",
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={i} style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div
                    style={{
                      maxWidth: "88%",
                      background: "var(--bg-panel)",
                      border: "1px solid var(--border)",
                      borderLeft: `4px solid ${TIER_RAIL_COLOR[m.tier ?? "escalate"]}`,
                      borderRadius: "4px 14px 14px 14px",
                      padding: "14px 18px",
                    }}
                  >
                    <div style={{ marginBottom: 10 }}>
                      <TierBadge tier={m.tier ?? "escalate"} />
                    </div>
                    <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink)" }}>
                      {m.answer}
                    </div>
                    {m.sources && m.sources.length > 0 && (
                      <div
                        style={{
                          marginTop: 12,
                          paddingTop: 10,
                          borderTop: "1px solid var(--border)",
                          fontSize: 12,
                          color: "var(--ink-soft)",
                        }}
                      >
                        Source: {m.sources.join(", ")}
                      </div>
                    )}
                    {(m.tier === "escalate" || m.tier === "refuse") && (
                      <button
                        style={{
                          marginTop: 12,
                          fontSize: 13,
                          fontWeight: 600,
                          padding: "8px 14px",
                          borderRadius: 8,
                          border: "none",
                          background: "var(--tier-escalate)",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        Talk to a Taxfix expert →
                      </button>
                    )}
                  </div>
                </div>
              )
            )}
            {loading && (
              <div style={{ fontSize: 13, color: "var(--ink-soft)", paddingLeft: 4 }}>
                Checking the rules…
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          style={{
            borderTop: "1px solid var(--border)",
            padding: "16px 40px 24px",
            background: "var(--bg-panel)",
          }}
        >
          <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", gap: 10 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Can I deduct my laptop?"
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                fontSize: 14.5,
                fontFamily: "var(--font-body)",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px 20px",
                borderRadius: 10,
                border: "none",
                background: "var(--tier-direct)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                cursor: loading ? "default" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              Ask
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
