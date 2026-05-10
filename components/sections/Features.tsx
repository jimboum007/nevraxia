"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const FEATURE_ICONS = [
  // AI Reports
  <svg key="ai" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="rgba(29,111,235,0.15)" />
    <path d="M8 14h2l2-4 2 8 2-4 2 2h2" stroke="#1D6FEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Protocols
  <svg key="proto" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="rgba(63,185,80,0.15)" />
    <rect x="8" y="7" width="12" height="14" rx="2" stroke="#3FB950" strokeWidth="1.5" />
    <path d="M11 12h6M11 15h4" stroke="#3FB950" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="20" cy="20" r="3" fill="rgba(63,185,80,0.3)" stroke="#3FB950" strokeWidth="1.2" />
    <path d="M19 20l1 1 1.5-1.5" stroke="#3FB950" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // ENMG
  <svg key="enmg" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="rgba(57,208,216,0.15)" />
    <path d="M6 14h3l2-5 2 10 2-5 2 3h3" stroke="#39D0D8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="21" cy="10" r="2" fill="rgba(57,208,216,0.3)" stroke="#39D0D8" strokeWidth="1.2" />
  </svg>,
  // QR Code
  <svg key="qr" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="rgba(227,179,65,0.15)" />
    <rect x="7" y="7" width="6" height="6" rx="1" stroke="#E3B341" strokeWidth="1.3" />
    <rect x="15" y="7" width="6" height="6" rx="1" stroke="#E3B341" strokeWidth="1.3" />
    <rect x="7" y="15" width="6" height="6" rx="1" stroke="#E3B341" strokeWidth="1.3" />
    <path d="M15 15h2v2h-2zM19 15v2M15 19h4v2M19 19h2" stroke="#E3B341" strokeWidth="1.3" strokeLinecap="round" />
  </svg>,
  // Economics
  <svg key="eco" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="rgba(247,129,102,0.15)" />
    <path d="M7 20l4-4 3 3 4-6 4 4" stroke="#F78166" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="21" cy="9" r="2.5" stroke="#F78166" strokeWidth="1.3" />
    <path d="M21 7.5v3M19.5 9h3" stroke="#F78166" strokeWidth="1" strokeLinecap="round" />
  </svg>,
  // Stats
  <svg key="stats" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="rgba(136,99,237,0.15)" />
    <rect x="7" y="15" width="3" height="6" rx="1" fill="#8863ED" />
    <rect x="12" y="11" width="3" height="10" rx="1" fill="#8863ED" />
    <rect x="17" y="7" width="3" height="14" rx="1" fill="#8863ED" />
  </svg>,
];

const FEATURE_COLORS = ["#1D6FEB", "#3FB950", "#39D0D8", "#E3B341", "#F78166", "#8863ED"];

const B = ({ children }: { children: React.ReactNode }) => (
  <span style={{ filter: "blur(3.5px)", userSelect: "none", display: "inline-block" }}>{children}</span>
);

const FEATURE_VISUALS = [
  /* 0 — AI Reports */
  <div key="v0" className="space-y-3">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#1D6FEB" }} />
      <span className="text-xs font-medium" style={{ color: "#388BFD" }}><B>Génération en cours…</B></span>
    </div>
    {[0, 1, 2, 3].map((i) => (
      <div key={i} className="space-y-1">
        <div className="h-2.5 rounded" style={{ background: "#1C2333", width: `${[55, 65, 48, 58][i]}%` }} />
        <div className="h-2 rounded-full" style={{ background: "rgba(29,111,235,0.25)", width: `${[88, 72, 60, 80][i]}%` }} />
      </div>
    ))}
    <div className="mt-4 flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(63,185,80,0.1)", border: "1px solid rgba(63,185,80,0.3)" }}>
      <div className="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="#3FB950" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span className="text-xs font-medium" style={{ color: "#3FB950" }}><B>Rapport validé</B></span>
      </div>
      <span className="text-xs" style={{ color: "#8B949E" }}>3 sec</span>
    </div>
  </div>,

  /* 1 — Protocols */
  <div key="v1" className="space-y-2">
    <div className="h-3 rounded mb-3" style={{ background: "#1C2333", width: "60%" }} />
    {[true, true, true, false, false].map((done, i) => (
      <div key={i} className="flex items-center gap-3 p-2 rounded-lg" style={{ background: done ? "rgba(63,185,80,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${done ? "rgba(63,185,80,0.2)" : "rgba(255,255,255,0.06)"}` }}>
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: done ? "rgba(63,185,80,0.2)" : "rgba(255,255,255,0.06)" }}>
          {done
            ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#3FB950" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            : <div className="w-2 h-2 rounded-full" style={{ background: "#30363D" }} />}
        </div>
        <div className="h-2.5 rounded flex-1" style={{ background: done ? "rgba(63,185,80,0.2)" : "#1C2333", width: `${[70, 60, 80, 65, 50][i]}%` }} />
        {i === 3 && <div className="ml-auto h-4 w-14 rounded-full" style={{ background: "rgba(227,179,65,0.25)" }} />}
      </div>
    ))}
  </div>,

  /* 2 — Process Automation — n8n-style workflow */
  <div key="v2" style={{ fontFamily: "monospace" }}>
    <svg viewBox="0 0 320 200" width="100%" style={{ display: "block" }}>
      {/* Background grid */}
      <defs>
        <pattern id="wf-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#1C2333" strokeWidth="0.5"/>
        </pattern>
        <filter id="wf-glow">
          <feGaussianBlur stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="320" height="200" fill="url(#wf-grid)" rx="12"/>

      {/* ── Node 1: Trigger ── */}
      <rect x="12" y="80" width="60" height="40" rx="8" fill="#1a1f2e" stroke="#E3B341" strokeWidth="1.5"/>
      <rect x="12" y="80" width="14" height="40" rx="8" fill="#E3B341" opacity=".9"/>
      <rect x="22" y="80" width="4" height="40" fill="#E3B341" opacity=".9"/>
      <circle cx="53" cy="95" r="4" fill="none" stroke="#E3B341" strokeWidth="1.2"/>
      <path d="M50 95l3 3 5-5" stroke="#E3B341" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <text x="42" y="108" textAnchor="middle" fill="#8B949E" fontSize="6">Trigger</text>

      {/* Arrow 1→2 */}
      <path d="M72 100h18" stroke="#39D0D8" strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#arr)"/>

      {/* ── Node 2: AI ── */}
      <rect x="90" y="78" width="60" height="44" rx="8" fill="#1a1f2e" stroke="#8863ED" strokeWidth="1.5" filter="url(#wf-glow)"/>
      <rect x="90" y="78" width="14" height="44" rx="8" fill="#8863ED" opacity=".9"/>
      <rect x="100" y="78" width="4" height="44" fill="#8863ED" opacity=".9"/>
      <circle cx="131" cy="93" r="5" fill="rgba(136,99,237,0.3)" stroke="#8863ED" strokeWidth="1"/>
      <path d="M128 93h6M131 90v6" stroke="#8863ED" strokeWidth="1" strokeLinecap="round"/>
      <text x="120" y="108" textAnchor="middle" fill="#8B949E" fontSize="6">IA / LLM</text>
      <rect x="96" y="111" width="48" height="7" rx="3" fill="rgba(136,99,237,0.15)"/>
      <rect x="96" y="111" width="34" height="7" rx="3" fill="rgba(136,99,237,0.4)"/>

      {/* Arrow 2→3 */}
      <path d="M150 100h18" stroke="#39D0D8" strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#arr)"/>

      {/* ── Node 3: Filter/Router ── */}
      <rect x="168" y="80" width="50" height="40" rx="8" fill="#1a1f2e" stroke="#39D0D8" strokeWidth="1.5"/>
      <rect x="168" y="80" width="12" height="40" rx="8" fill="#39D0D8" opacity=".9"/>
      <rect x="177" y="80" width="3" height="40" fill="#39D0D8" opacity=".9"/>
      <path d="M193 93h14M193 100h10M193 107h14" stroke="#39D0D8" strokeWidth="1" strokeLinecap="round" opacity=".7"/>
      <text x="193" y="115" textAnchor="middle" fill="#8B949E" fontSize="6">Router</text>

      {/* Arrow 3→4a (top) */}
      <path d="M218 90l14-18" stroke="#3FB950" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arr2)"/>
      {/* Arrow 3→4b (bottom) */}
      <path d="M218 110l14 18" stroke="#F78166" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arr3)"/>

      {/* ── Node 4a: Send doc ── */}
      <rect x="234" y="56" width="72" height="30" rx="7" fill="#1a1f2e" stroke="#3FB950" strokeWidth="1.2"/>
      <rect x="234" y="56" width="11" height="30" rx="7" fill="#3FB950" opacity=".8"/>
      <rect x="242" y="56" width="3" height="30" fill="#3FB950" opacity=".8"/>
      <path d="M256 68h30M256 74h22" stroke="#3FB950" strokeWidth=".8" strokeLinecap="round" opacity=".6"/>
      <text x="271" y="82" textAnchor="middle" fill="#8B949E" fontSize="5.5">Envoi auto</text>

      {/* ── Node 4b: Alert ── */}
      <rect x="234" y="114" width="72" height="30" rx="7" fill="#1a1f2e" stroke="#F78166" strokeWidth="1.2"/>
      <rect x="234" y="114" width="11" height="30" rx="7" fill="#F78166" opacity=".8"/>
      <rect x="242" y="114" width="3" height="30" fill="#F78166" opacity=".8"/>
      <path d="M261 125l4 8 4-8" stroke="#F78166" strokeWidth=".9" strokeLinecap="round" fill="none"/>
      <line x1="265" y1="127" x2="265" y2="130" stroke="#F78166" strokeWidth=".9" strokeLinecap="round"/>
      <text x="271" y="140" textAnchor="middle" fill="#8B949E" fontSize="5.5">Alerte</text>

      {/* Arrowhead markers */}
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0L6 3L0 6" fill="none" stroke="#39D0D8" strokeWidth="1"/>
        </marker>
        <marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0L6 3L0 6" fill="none" stroke="#3FB950" strokeWidth="1"/>
        </marker>
        <marker id="arr3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0L6 3L0 6" fill="none" stroke="#F78166" strokeWidth="1"/>
        </marker>
      </defs>

      {/* Status badge */}
      <rect x="12" y="10" width="60" height="16" rx="8" fill="rgba(57,208,216,0.12)" stroke="rgba(57,208,216,0.3)" strokeWidth=".8"/>
      <circle cx="24" cy="18" r="3" fill="#3FB950"/>
      <text x="30" y="21" fill="#39D0D8" fontSize="6.5" fontWeight="600">workflow actif</text>
    </svg>
  </div>,

  /* 3 — PROMs / QR */
  <div key="v3" className="space-y-3">
    <div className="flex items-start gap-4">
      <div className="rounded-xl p-2 flex-shrink-0" style={{ background: "white" }}>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="#0D1117" strokeWidth="2"/>
          <rect x="6" y="6" width="12" height="12" rx="1" fill="#0D1117"/>
          <rect x="30" y="2" width="20" height="20" rx="2" fill="none" stroke="#0D1117" strokeWidth="2"/>
          <rect x="34" y="6" width="12" height="12" rx="1" fill="#0D1117"/>
          <rect x="2" y="30" width="20" height="20" rx="2" fill="none" stroke="#0D1117" strokeWidth="2"/>
          <rect x="6" y="34" width="12" height="12" rx="1" fill="#0D1117"/>
          <rect x="30" y="30" width="4" height="4" fill="#0D1117"/>
          <rect x="36" y="30" width="4" height="4" fill="#0D1117"/>
          <rect x="42" y="30" width="8" height="4" fill="#0D1117"/>
          <rect x="30" y="36" width="8" height="4" fill="#0D1117"/>
          <rect x="40" y="36" width="4" height="4" fill="#0D1117"/>
          <rect x="30" y="42" width="4" height="8" fill="#0D1117"/>
          <rect x="36" y="44" width="14" height="4" fill="#0D1117"/>
        </svg>
      </div>
      <div className="flex-1 space-y-2">
        <div className="text-xs font-semibold" style={{ color: "#8B949E" }}>VAS Score</div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-10 rounded" style={{ background: "#1C2333" }} />
          <div className="flex-1 h-2 rounded-full" style={{ background: "#1C2333" }}>
            <div className="h-full rounded-full" style={{ background: "#F78166", width: "78%" }} />
          </div>
          <span className="text-xs font-bold" style={{ color: "#F78166" }}>7.8</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-10 rounded" style={{ background: "#1C2333" }} />
          <div className="flex-1 h-2 rounded-full" style={{ background: "#1C2333" }}>
            <div className="h-full rounded-full" style={{ background: "#3FB950", width: "22%" }} />
          </div>
          <span className="text-xs font-bold" style={{ color: "#3FB950" }}>2.2</span>
        </div>
        <div className="text-xs font-bold mt-1" style={{ color: "#E3B341" }}>↓ 72%</div>
      </div>
    </div>
    <div className="text-xs p-2 rounded-lg" style={{ background: "rgba(227,179,65,0.08)", border: "1px solid rgba(227,179,65,0.2)", color: "#8B949E" }}>
      ODI · SF-12 · VAS · EQ-5D
    </div>
  </div>,

  /* 4 — Economics */
  <div key="v4" className="space-y-3">
    <div className="grid grid-cols-2 gap-2">
      {[
        { value: "926k", color: "#F78166", trend: "+12%" },
        { value: "508k", color: "#3FB950", trend: "+8%" },
        { value: "345k", color: "#E3B341", trend: "" },
        { value: "73k",  color: "#8B949E", trend: "" },
      ].map((s, i) => (
        <div key={i} className="p-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="h-2.5 rounded mb-1.5" style={{ background: "#1C2333", width: "65%" }} />
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold" style={{ color: s.color }}>{s.value}</span>
            {s.trend && <span className="text-xs" style={{ color: "#3FB950" }}>{s.trend}</span>}
          </div>
        </div>
      ))}
    </div>
    <div className="flex items-end gap-1 h-14 px-1">
      {[55, 70, 62, 85, 68, 90, 78, 95, 82, 100, 88, 96].map((h, i) => (
        <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 11 ? "linear-gradient(180deg,#F78166,#E3B341)" : "rgba(247,129,102,0.2)" }} />
      ))}
    </div>
    <div className="h-2.5 rounded" style={{ background: "#1C2333", width: "45%" }} />
  </div>,

  /* 5 — Surgical Stats */
  <div key="v5" className="space-y-3">
    <div className="h-3 rounded mb-1" style={{ background: "#1C2333", width: "58%" }} />
    {[
      { value: 94, color: "#3FB950" },
      { value: 88, color: "#8863ED" },
      { value: 91, color: "#1D6FEB" },
    ].map(({ value, color: c }, i) => (
      <div key={i}>
        <div className="flex justify-between mb-1">
          <div className="h-2.5 rounded" style={{ background: "#1C2333", width: `${[52, 64, 58][i]}%` }} />
          <span className="text-xs font-bold" style={{ color: c }}>{value}%</span>
        </div>
        <div className="h-2 rounded-full" style={{ background: "#1C2333" }}>
          <div className="h-full rounded-full" style={{ background: c, width: `${value}%` }} />
        </div>
      </div>
    ))}
    <div className="flex items-center gap-2 mt-2 p-2 rounded-lg" style={{ background: "rgba(136,99,237,0.08)", border: "1px solid rgba(136,99,237,0.2)" }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#8863ED" strokeWidth="1"/><path d="M7 4v4l2.5 2" stroke="#8863ED" strokeWidth="1" strokeLinecap="round"/></svg>
      <span className="text-xs font-bold" style={{ color: "#8863ED" }}>EU — Top 15%</span>
    </div>
  </div>,
];

function FeatureBlock({
  icon, title, desc, color, index, inView, contactHref, visual,
}: {
  icon: React.ReactNode; title: string; desc: string; color: string; index: number; inView: boolean; contactHref: string; visual: React.ReactNode;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className="flex flex-col md:flex-row items-center gap-12 py-16"
      style={{
        flexDirection: isEven ? undefined : "row-reverse",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        borderBottom: "1px solid #1C2333",
      }}
    >
      {/* Text side */}
      <div className="flex-1 max-w-lg">
        <div className="mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-4" style={{ color: "#F0F6FC" }}>{title}</h3>
        <p className="text-base leading-relaxed mb-6" style={{ color: "#8B949E" }}>{desc}</p>
        <Link href={contactHref} className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70">
          <div className="w-2 h-2 rounded-full" style={{ background: color }} />
          <span style={{ color }}>En savoir plus →</span>
        </Link>
      </div>

      {/* Visual side */}
      <div className="flex-1 w-full max-w-md">
        <div
          className="relative rounded-2xl overflow-hidden p-6"
          style={{ background: "#161B22", border: "1px solid #30363D" }}
        >
          {visual}

          {/* Gradient overlay */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${color}15, transparent)`,
              transform: "translate(30%, -30%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const t = useTranslations("features");
  const locale = useLocale();
  const contactHref = `/${locale}#contact`;
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const featureKeys = ["ai_reports", "protocols", "enmg", "qr", "economics", "stats"] as const;

  return (
    <section id="features" style={{ background: "#0D1117", padding: "80px 0", position: "relative", overflow: "hidden" }} ref={ref}>
      {/* Aurora blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div style={{
          position: "absolute", width: "900px", height: "650px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(29,111,235,0.32) 0%, rgba(29,111,235,0.08) 45%, transparent 70%)",
          left: "-220px", top: "-120px",
          animation: "aurora-drift-1 14s ease-in-out infinite alternate",
          filter: "blur(8px)",
        }} />
        <div style={{
          position: "absolute", width: "750px", height: "550px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(57,208,216,0.22) 0%, rgba(57,208,216,0.06) 45%, transparent 70%)",
          right: "-160px", bottom: "0%",
          animation: "aurora-drift-2 18s ease-in-out infinite alternate",
          filter: "blur(8px)",
        }} />
        <div style={{
          position: "absolute", width: "600px", height: "450px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(136,99,237,0.20) 0%, rgba(136,99,237,0.05) 45%, transparent 70%)",
          left: "30%", top: "25%",
          animation: "aurora-drift-3 22s ease-in-out infinite alternate",
          filter: "blur(8px)",
        }} />
        {/* Mesh grid */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="aurora-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0V48" fill="none" stroke="#1D6FEB" strokeWidth="0.6" strokeOpacity="0.25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#aurora-grid)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: "relative", zIndex: 10 }}>
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#F0F6FC" }}>
            {t("title")}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8B949E" }}>
            {t("subtitle")}
          </p>
        </div>

        {/* Feature blocks */}
        <div>
          {featureKeys.map((key, i) => (
            <FeatureBlock
              key={key}
              icon={FEATURE_ICONS[i]}
              title={t(`items.${key}.title`)}
              desc={t(`items.${key}.desc`)}
              color={FEATURE_COLORS[i]}
              index={i}
              inView={inView}
              contactHref={contactHref}
              visual={FEATURE_VISUALS[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
