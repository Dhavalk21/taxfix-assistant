"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import TierBadge from "@/components/TierBadge";
import Tooltip from "@/components/Tooltip";
import ActionRow from "@/components/ActionRow";
import LanguageToggle from "@/components/LanguageToggle";
import QuickGuideModal from "@/components/QuickGuideModal";
import HowItWorksModal from "@/components/HowItWorksModal";

type ChatMessage = {
  role: "user" | "assistant";
  text?: string;
  tier?: string;
  answer?: string;
  sources?: string[];
  matched_rule_id?: number | null;
  rule_title?: string | null;
  escalate_reason?: string | null;
  rule_count?: number;
  latency_ms?: number;
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
  const [showGuide, setShowGuide] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
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
            escalate_reason: "out_of_scope",
            answer: "Something went wrong on our end. Let's get you to a Taxfix expert to be safe.",
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
          escalate_reason: "out_of_scope",
          answer: "Connection issue, please try again in a moment.",
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
        gridTemplateColumns: "300px 1fr",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          borderRight: "1px solid var(--border)",
          padding: "28px 22px",
          background: "var(--bg-panel)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: 20 }}>
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

        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <button
            onClick={() => setShowGuide(true)}
            style={{
              flex: "1 1 auto",
              fontSize: 12.5,
              fontWeight: 600,
              padding: "9px 10px",
              borderRadius: 8,
              border: "1px solid var(--tier-direct)",
              background: "var(--tier-direct-bg)",
              color: "var(--tier-direct)",
              cursor: "pointer",
            }}
          >
            Quick guide
          </button>
          <button
            onClick={() => setShowHowItWorks(true)}
            style={{
              flex: "1 1 auto",
              fontSize: 12.5,
              fontWeight: 600,
              padding: "9px 10px",
              borderRadius: 8,
              border: "1px solid var(--tier-escalate)",
              background: "var(--tier-escalate-bg)",
              color: "var(--tier-escalate)",
              cursor: "pointer",
            }}
          >
            Under the hood
          </button>
        </div>
        <Link
          href="/architecture"
          style={{
            display: "block",
            textAlign: "center",
            fontSize: 12.5,
            fontWeight: 600,
            padding: "9px 10px",
            borderRadius: 8,
            border: "1px solid var(--tier-hedge)",
            background: "var(--tier-hedge-bg)",
            color: "var(--tier-hedge)",
            textDecoration: "none",
            marginBottom: 24,
          }}
        >
          System design →
        </Link>

        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--ink-soft)",
            textTransform: "uppercase",
            letterSpacing: 0.6,
            marginBottom: 12,
          }}
        >
          How answers are graded
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          <TierBadge tier="direct" />
          <TierBadge tier="hedge" />
          <TierBadge tier="escalate" escalateReason="needs_numbers" />
          <TierBadge tier="escalate" escalateReason="out_of_scope" />
          <TierBadge tier="refuse" />
        </div>

        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--ink-soft)",
            textTransform: "uppercase",
            letterSpacing: 0.6,
            marginBottom: 12,
          }}
        >
          Try a question
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
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
            fontSize: 12,
            fontWeight: 600,
            color: "var(--ink-soft)",
            textTransform: "uppercase",
            letterSpacing: 0.6,
            marginBottom: 10,
          }}
        >
          Response language
        </div>
        <div style={{ marginBottom: 24 }}>
          <LanguageToggle />
        </div>

        <div
          style={{
            fontSize: 12,
            color: "var(--ink-soft)",
            lineHeight: 1.6,
            paddingTop: 18,
            borderTop: "1px solid var(--border)",
          }}
        >
          Built for solo self-employed users with{" "}
          <Tooltip label="Kleinunternehmer" align="right">
            Revenue under €25,000/year, so you don't charge VAT.
          </Tooltip>{" "}
          Kleinunternehmer status.
        </div>

        <div style={{ flex: 1 }} />

        <div
          style={{
            fontSize: 11.5,
            color: "var(--ink-soft)",
            paddingTop: 16,
            marginTop: 16,
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
        <div
          style={{
            background: "var(--tier-hedge-bg)",
            border: "1px solid var(--tier-hedge)",
            borderRadius: 8,
            padding: "10px 12px",
            fontSize: 11.5,
            color: "var(--tier-hedge)",
            lineHeight: 1.5,
            marginBottom: 24,
          }}
        >
          Note: the demo runs on a paid, credit-limited key. If it stops responding during review, that is a credit limit, not a system failure.
        </div>
          
          <span>Designed and built by Dhaval Kareliya</span>
          <a
            href="https://github.com/Dhavalk21"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            style={{ color: "var(--ink)", display: "inline-flex" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
      </aside>

      {/* Main chat */}
      <main style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
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
                This assistant only answers from a curated set of verified rules, it won't
                guess. Try one of the sample questions on the left, or type your own.
              </div>
            </div>
          )}

          <div
            style={{
              maxWidth: 640,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
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
                      width: "100%",
                    }}
                  >
                    <div style={{ marginBottom: 10 }}>
                      <TierBadge tier={m.tier ?? "escalate"} escalateReason={m.escalate_reason} />
                    </div>
                    <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink)" }}>
                      {m.answer}
                    </div>

                    {m.rule_title && (
                      <div
                        style={{
                          marginTop: 12,
                          paddingTop: 10,
                          borderTop: "1px solid var(--border)",
                          fontSize: 12,
                          color: "var(--ink-soft)",
                        }}
                      >
                        Matched rule #{m.matched_rule_id}: {m.rule_title}
                        {m.sources && m.sources.length > 0 && <> · {m.sources.join(", ")}</>}
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

                    <ActionRow showSave={m.tier === "direct" || m.tier === "hedge"} />

                    {(m.latency_ms !== undefined || m.rule_count !== undefined) && (
                      <div
                        style={{
                          marginTop: 10,
                          fontSize: 10.5,
                          color: "var(--ink-soft)",
                          opacity: 0.75,
                        }}
                      >
                        {m.latency_ms !== undefined && <>Answered in {(m.latency_ms / 1000).toFixed(1)}s</>}
                        {m.latency_ms !== undefined && m.rule_count !== undefined && <> · </>}
                        {m.rule_count !== undefined && <>checked against {m.rule_count} rules</>}
                      </div>
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

      {showGuide && <QuickGuideModal onClose={() => setShowGuide(false)} />}
      {showHowItWorks && <HowItWorksModal onClose={() => setShowHowItWorks(false)} />}
    </div>
  );
}
