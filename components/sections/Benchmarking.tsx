"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

// ── Gaussian math (module-level, no browser APIs) ─────────────────
const GB = 168; // baseline y
const GX0 = 14, GX1 = 386, GSTEPS = 80;

function gauss(x: number, m: number, s: number) {
  return Math.exp(-((x - m) ** 2) / (2 * s * s));
}
function gArea(m: number, s: number, a: number): string {
  let d = `M${GX0},${GB}`;
  for (let i = 0; i <= GSTEPS; i++) {
    const x = GX0 + (i / GSTEPS) * (GX1 - GX0);
    d += ` L${x.toFixed(1)},${(GB - a * gauss(x, m, s)).toFixed(1)}`;
  }
  return d + ` L${GX1},${GB} Z`;
}
function gLine(m: number, s: number, a: number): string {
  return Array.from({ length: GSTEPS + 1 }, (_, i) => {
    const x = GX0 + (i / GSTEPS) * (GX1 - GX0);
    return `${x.toFixed(1)},${(GB - a * gauss(x, m, s)).toFixed(1)}`;
  }).join(" ");
}

const GCURVES = [
  { m: 180, s: 70, a: 108, fill: "rgba(29,111,235,0.07)",  stroke: "rgba(56,139,253,0.3)",  sw: 1 },
  { m: 125, s: 28, a: 70,  fill: "rgba(63,185,80,0.11)",   stroke: "#3FB950",                sw: 1.2 },
  { m: 165, s: 35, a: 98,  fill: "rgba(29,111,235,0.14)",  stroke: "#1D6FEB",                sw: 1.3 },
  { m: 200, s: 26, a: 80,  fill: "rgba(57,208,216,0.11)",  stroke: "#39D0D8",                sw: 1.2 },
  { m: 240, s: 42, a: 92,  fill: "rgba(136,99,237,0.12)",  stroke: "#8863ED",                sw: 1.3 },
] as const;

const MARKER_X = 265;

// Precompute intersection y-values
const INTERSECTIONS = GCURVES.map((c) => {
  const yVal = GB - c.a * gauss(MARKER_X, c.m, c.s);
  return { y: yVal, stroke: c.stroke, visible: GB - yVal > 6 };
});

export default function Benchmarking() {
  const t = useTranslations("benchmarking");
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const points = [
    { key: "db", icon: "🗄️" },
    { key: "ai", icon: "🤖" },
    { key: "compare", icon: "📊" },
    { key: "privacy", icon: "🔒" },
  ] as const;

  return (
    <section
      id="benchmarking"
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #0D1117 0%, #0A0F16 50%, #0D1117 100%)",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Topography — concentric contour lines + glowing focal points */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="tg1" cx="35%" cy="55%" r="45%">
            <stop offset="0%" stopColor="#1D6FEB" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#1D6FEB" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="tg2" cx="75%" cy="30%" r="35%">
            <stop offset="0%" stopColor="#39D0D8" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#39D0D8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="420" cy="330" rx="60" ry="42" fill="none" stroke="#1D6FEB" strokeOpacity="0.7" strokeWidth="1"/>
        <ellipse cx="420" cy="330" rx="120" ry="84" fill="none" stroke="#1D6FEB" strokeOpacity="0.5" strokeWidth="0.9"/>
        <ellipse cx="420" cy="330" rx="190" ry="133" fill="none" stroke="#1D6FEB" strokeOpacity="0.36" strokeWidth="0.9"/>
        <ellipse cx="420" cy="330" rx="268" ry="188" fill="none" stroke="#1D6FEB" strokeOpacity="0.24" strokeWidth="0.8"/>
        <ellipse cx="420" cy="330" rx="350" ry="245" fill="none" stroke="#39D0D8" strokeOpacity="0.16" strokeWidth="0.8"/>
        <ellipse cx="420" cy="330" rx="440" ry="308" fill="none" stroke="#39D0D8" strokeOpacity="0.10" strokeWidth="0.7"/>
        <ellipse cx="900" cy="170" rx="42" ry="30" fill="none" stroke="#39D0D8" strokeOpacity="0.55" strokeWidth="0.9"/>
        <ellipse cx="900" cy="170" rx="90" ry="64" fill="none" stroke="#39D0D8" strokeOpacity="0.34" strokeWidth="0.8"/>
        <ellipse cx="900" cy="170" rx="148" ry="106" fill="none" stroke="#39D0D8" strokeOpacity="0.20" strokeWidth="0.7"/>
        <ellipse cx="900" cy="170" rx="210" ry="150" fill="none" stroke="#1D6FEB" strokeOpacity="0.12" strokeWidth="0.6"/>
        <ellipse cx="420" cy="330" rx="480" ry="300" fill="url(#tg1)" />
        <ellipse cx="900" cy="170" rx="300" ry="240" fill="url(#tg2)" />
        <circle cx="420" cy="330" r="6" fill="#1D6FEB" opacity="0.9" />
        <circle cx="420" cy="330" r="14" fill="#1D6FEB" opacity="0.18" />
        <circle cx="900" cy="170" r="4.5" fill="#39D0D8" opacity="0.85" />
        <circle cx="900" cy="170" r="10" fill="#39D0D8" opacity="0.15" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(29,111,235,0.1)", border: "1px solid rgba(29,111,235,0.3)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#1D6FEB">
                <path d="M7 1l1.5 4h4.5L9.5 7.5l1.5 4L7 9.5 3 11.5l1.5-4L1 5h4.5z" />
              </svg>
              <span className="text-xs font-medium" style={{ color: "#388BFD" }}>{t("badge")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: "#F0F6FC" }}>
              {t("title")}
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: "#8B949E" }}>
              {t("subtitle")}
            </p>

            <ul className="space-y-4">
              {points.map(({ key, icon }, i) => (
                <li
                  key={key}
                  className="flex items-start gap-3"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.5s ease ${0.2 + i * 0.1}s, transform 0.5s ease ${0.2 + i * 0.1}s`,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-base"
                    style={{ background: "rgba(29,111,235,0.1)", border: "1px solid rgba(29,111,235,0.2)" }}
                  >
                    {icon}
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: "#8B949E" }}>
                    {t(`points.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Gaussian distribution visualization */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <div
              className="rounded-3xl p-6"
              style={{ background: "rgba(22,27,34,0.85)", border: "1px solid #30363D", backdropFilter: "blur(4px)" }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 12L4.5 5l3 4 3-7L14 9.5" stroke="#388BFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold" style={{ color: "#F0F6FC" }}>Neuraxia</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#3FB950" }} />
                  <span className="text-xs" style={{ color: "#3FB950" }}>Live</span>
                </div>
              </div>

              {/* Gaussian SVG */}
              <svg
                viewBox="0 0 400 185"
                width="100%"
                style={{ display: "block", overflow: "visible" }}
              >
                <defs>
                  <filter id="mrkglow">
                    <feGaussianBlur stdDeviation="2.5" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <filter id="dotglow">
                    <feGaussianBlur stdDeviation="1.8" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <linearGradient id="markerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E3B341" stopOpacity="1"/>
                    <stop offset="100%" stopColor="#E3B341" stopOpacity="0.2"/>
                  </linearGradient>
                </defs>

                {/* Horizontal grid lines */}
                {[50, 90, 130].map((y) => (
                  <line key={y} x1={GX0} y1={y} x2={GX1} y2={y}
                    stroke="#1C2333" strokeWidth="0.7" />
                ))}

                {/* X-axis */}
                <line x1={GX0} y1={GB} x2={GX1} y2={GB} stroke="#30363D" strokeWidth="0.8" />
                <polygon points={`${GX1+2},${GB} ${GX1-5},${GB-3} ${GX1-5},${GB+3}`} fill="#30363D" />

                {/* Curve fills */}
                {GCURVES.map((c, i) => (
                  <path key={`f${i}`} d={gArea(c.m, c.s, c.a)} fill={c.fill} />
                ))}

                {/* Curve strokes */}
                {GCURVES.map((c, i) => (
                  <polyline key={`l${i}`} points={gLine(c.m, c.s, c.a)}
                    fill="none" stroke={c.stroke} strokeWidth={c.sw} strokeLinejoin="round" />
                ))}

                {/* Peak dots (small, colored) */}
                {GCURVES.slice(1).map((c, i) => (
                  <circle key={`pk${i}`}
                    cx={c.m} cy={GB - c.a} r="2.5"
                    fill={c.stroke} opacity="0.85" />
                ))}

                {/* Marker line */}
                <line
                  x1={MARKER_X} y1="10" x2={MARKER_X} y2={GB}
                  stroke="url(#markerGrad)" strokeWidth="1.4"
                  strokeDasharray="4 3"
                  filter="url(#mrkglow)"
                />

                {/* Marker top dot + ring */}
                <circle cx={MARKER_X} cy="10" r="6" fill="#E3B341" fillOpacity="0.18" />
                <circle cx={MARKER_X} cy="10" r="3" fill="#E3B341" filter="url(#mrkglow)" />

                {/* Intersection dots on each curve the marker crosses */}
                {INTERSECTIONS.map((pt, i) =>
                  pt.visible ? (
                    <g key={`int${i}`}>
                      <circle cx={MARKER_X} cy={pt.y.toFixed(1)} r="5"
                        fill={pt.stroke} fillOpacity="0.22" />
                      <circle cx={MARKER_X} cy={pt.y.toFixed(1)} r="2.5"
                        fill={pt.stroke} filter="url(#dotglow)" />
                    </g>
                  ) : null
                )}
              </svg>

              {/* Stats row — icons only, no text labels */}
              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  {
                    value: "27",
                    icon: (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="2" y="6" width="10" height="7" rx="1" stroke="#388BFD" strokeWidth="1.1"/>
                        <path d="M5 6V4a2 2 0 014 0v2" stroke="#388BFD" strokeWidth="1.1"/>
                        <rect x="5.5" y="8.5" width="3" height="2" rx="0.5" fill="#388BFD" opacity="0.6"/>
                      </svg>
                    ),
                  },
                  {
                    value: "4.2k",
                    icon: (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="2" y="1.5" width="8" height="10" rx="1.2" stroke="#388BFD" strokeWidth="1.1"/>
                        <path d="M4 5h4M4 7.5h3" stroke="#388BFD" strokeWidth="1" strokeLinecap="round"/>
                        <circle cx="10.5" cy="10.5" r="2.5" fill="rgba(29,111,235,0.25)" stroke="#3FB950" strokeWidth="1"/>
                        <path d="M9.8 10.5l.5.6 1.2-1" stroke="#3FB950" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                  },
                  {
                    value: "12k+",
                    icon: (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 10L5 6l2.5 2.5L10 4l2 3" stroke="#388BFD" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="10" cy="4" r="1.5" fill="#388BFD" opacity="0.7"/>
                      </svg>
                    ),
                  },
                ].map((s) => (
                  <div
                    key={s.value}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl"
                    style={{ background: "rgba(29,111,235,0.08)" }}
                  >
                    {s.icon}
                    <div className="text-base font-bold" style={{ color: "#388BFD" }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
