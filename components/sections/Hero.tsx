"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function drawHex(cx: number, cy: number, r: number) {
      if (!ctx) return;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    }

    function drawGrid() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const r = 38;
      const colStep = r * Math.sqrt(3);
      const rowStep = r * 1.5;
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.44;
      const maxDist = Math.sqrt(canvas.width ** 2 + canvas.height ** 2) * 0.55;

      const cols = Math.ceil(canvas.width / colStep) + 3;
      const rows = Math.ceil(canvas.height / rowStep) + 3;

      for (let row = -2; row <= rows; row++) {
        for (let col = -2; col <= cols; col++) {
          const x = col * colStep + (row % 2 !== 0 ? colStep / 2 : 0);
          const y = row * rowStep;
          const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          const fade = Math.max(0, 1 - dist / maxDist);
          if (fade < 0.03) continue;

          const strokeOpacity = 0.06 + fade * 0.20;
          ctx.lineWidth = 0.85;
          ctx.strokeStyle = `rgba(29, 111, 235, ${strokeOpacity})`;
          drawHex(x, y, r - 1);
          ctx.stroke();

          // Deterministic accent fills
          const hash = ((row * 31 + col * 17) % 100 + 100) % 100;
          if (hash < 4 && fade > 0.35) {
            ctx.fillStyle = `rgba(29, 111, 235, ${0.08 * fade})`;
            drawHex(x, y, r - 1);
            ctx.fill();
          } else if (hash < 7 && fade > 0.55) {
            ctx.fillStyle = `rgba(57, 208, 216, ${0.06 * fade})`;
            drawHex(x, y, r - 1);
            ctx.fill();
          }
        }
      }

      // Central radial glow
      const grd = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width * 0.45);
      grd.addColorStop(0, "rgba(29, 111, 235, 0.11)");
      grd.addColorStop(1, "rgba(29, 111, 235, 0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawGrid();
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ background: "linear-gradient(180deg, #0D1117 0%, #0D1117 60%, #0D1117 100%)" }}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(29,111,235,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(57,208,216,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{ background: "rgba(29,111,235,0.1)", border: "1px solid rgba(29,111,235,0.3)" }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#1D6FEB" }} />
          <span className="text-sm font-medium" style={{ color: "#388BFD" }}>{t("badge")}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
          <span style={{ color: "#F0F6FC" }}>{t("headline").split(" ").slice(0, 2).join(" ")}</span>
          <br />
          <span className="gradient-text">{t("headline").split(" ").slice(2).join(" ")}</span>
        </h1>

        {/* Subline */}
        <p
          className="text-lg sm:text-xl max-w-3xl mx-auto mb-5 leading-relaxed"
          style={{ color: "#8B949E" }}
        >
          {t("subline")}
        </p>

        {/* Subline 2 — economic angle */}
        <p
          className="text-base sm:text-lg max-w-3xl mx-auto mb-6 leading-relaxed"
          style={{ color: "#8B949E" }}
        >
          {t("subline2")}
        </p>

        {/* Target audience badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 text-sm font-medium"
          style={{ background: "rgba(29,111,235,0.12)", border: "1px solid rgba(29,111,235,0.3)", color: "#388BFD" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          {t("target")}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}#contact`}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-[1.02] hover:opacity-90 animate-pulse-glow"
            style={{
              background: "linear-gradient(135deg, #1D6FEB, #388BFD)",
              color: "#fff",
              boxShadow: "0 0 24px rgba(29,111,235,0.3)",
            }}
          >
            {t("cta_primary")}
            <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2l6 6-6 6M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </Link>
          <Link
            href={`/${locale}#features`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: "#F0F6FC",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {t("cta_secondary")}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* App preview mockup */}
        <div className="mt-10 md:mt-20 relative max-w-5xl mx-auto">
          {/* Glow behind mockup */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(29,111,235,0.13) 0%, transparent 70%)", filter: "blur(24px)" }} />

          <div
            className="relative rounded-2xl overflow-hidden animate-float"
            style={{
              background: "#161B22",
              border: "1px solid #30363D",
              boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(29,111,235,0.08)",
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#0D1117", borderBottom: "1px solid #30363D" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: "#F78166" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#E3B341" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#3FB950" }} />
              <div className="ml-4 h-5 rounded-md" style={{ background: "#161B22", width: "180px" }} />
            </div>

            {/* Dashboard body */}
            <div className="flex" style={{ background: "#0D1117", minHeight: "300px" }}>

              {/* Sidebar */}
              <div className="flex flex-col items-center py-5 gap-5 shrink-0" style={{ width: "52px", background: "#0D1117", borderRight: "1px solid #30363D" }}>
                {[
                  // chart-bar
                  "M3 3v18h18M7 16l4-4 4 4 4-4",
                  // document
                  "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
                  // activity / EEG
                  "M22 12h-4l-3 9L9 3l-3 9H2",
                  // users
                  "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
                  // globe
                  "M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20",
                  // settings
                  "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
                ].map((d, i) => (
                  <div key={i} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: i === 0 ? "rgba(29,111,235,0.2)" : "transparent" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? "#388BFD" : "#484F58"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={d} />
                    </svg>
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="flex-1 p-5 flex flex-col gap-4">

                {/* Metric cards */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: "M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6", value: "926k CHF", color: "#388BFD", bg: "rgba(29,111,235,0.12)" },
                    { icon: "M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3", value: "508k CHF", color: "#3FB950", bg: "rgba(63,185,80,0.1)" },
                    { icon: "M12 22V12M12 12L8 8m4 4l4-4M2 17l4-4 4 4 4-4 4 4", value: "345k CHF", color: "#E3B341", bg: "rgba(227,179,65,0.1)" },
                    { icon: "M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20", value: "Top 10%", color: "#39D0D8", bg: "rgba(57,208,216,0.1)" },
                  ].map((m, i) => (
                    <div key={i} className="p-3 rounded-xl" style={{ background: "#161B22", border: "1px solid #30363D" }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ background: m.bg }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d={m.icon} />
                        </svg>
                      </div>
                      <div className="text-sm font-bold" style={{ color: m.color }}>{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Charts row */}
                <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>

                  {/* Bar chart */}
                  <div className="rounded-xl p-3" style={{ background: "#161B22", border: "1px solid #30363D" }}>
                    <div className="h-3 w-20 rounded mb-3" style={{ background: "#30363D" }} />
                    <div className="flex items-end gap-1.5" style={{ height: "72px" }}>
                      {[38, 52, 44, 70, 58, 82, 65, 90, 72, 96, 80, 100].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm" style={{
                          height: `${h}%`,
                          background: i === 11 ? "linear-gradient(180deg,#1D6FEB,#388BFD)" : i >= 9 ? "rgba(29,111,235,0.45)" : "rgba(29,111,235,0.2)",
                        }} />
                      ))}
                    </div>
                  </div>

                  {/* Neural wave panel */}
                  <div className="rounded-xl p-3 relative overflow-hidden" style={{ background: "#161B22", border: "1px solid #30363D" }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-3 w-16 rounded" style={{ background: "#30363D" }} />
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#3FB950" }} />
                        <div className="text-xs font-medium" style={{ color: "#3FB950" }}>AI</div>
                      </div>
                    </div>
                    <svg width="100%" height="72" viewBox="0 0 280 72" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1D6FEB" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#1D6FEB" stopOpacity="0" />
                        </linearGradient>
                        <filter id="wglow">
                          <feGaussianBlur stdDeviation="1.5" result="blur" />
                          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                      </defs>
                      {/* Flat baseline then spike then return */}
                      <path d="M0,36 L30,36 L35,36 L38,12 L42,60 L46,28 L50,48 L54,36 L80,36 L85,36 L88,8 L92,64 L96,24 L100,52 L104,36 L150,36 L155,36 L158,16 L162,56 L166,30 L170,46 L174,36 L220,36 L225,36 L228,10 L232,62 L236,26 L240,50 L244,36 L280,36"
                        fill="url(#waveGrad)" stroke="none" />
                      <path d="M0,36 L30,36 L35,36 L38,12 L42,60 L46,28 L50,48 L54,36 L80,36 L85,36 L88,8 L92,64 L96,24 L100,52 L104,36 L150,36 L155,36 L158,16 L162,56 L166,30 L170,46 L174,36 L220,36 L225,36 L228,10 L232,62 L236,26 L240,50 L244,36 L280,36"
                        fill="none" stroke="#1D6FEB" strokeWidth="1.5" filter="url(#wglow)" />
                    </svg>
                  </div>

                </div>

                {/* Bottom row: mini patient list + ring */}
                <div className="grid gap-3" style={{ gridTemplateColumns: "1fr auto" }}>
                  <div className="flex items-center gap-2">
                    {[
                      { color: "#3FB950" }, { color: "#3FB950" }, { color: "#E3B341" },
                      { color: "#3FB950" }, { color: "#3FB950" },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg flex-1" style={{ background: "#161B22", border: "1px solid #30363D" }}>
                        <div className="w-5 h-5 rounded-full shrink-0" style={{ background: `rgba(${p.color === "#3FB950" ? "63,185,80" : "227,179,65"},0.15)`, border: `1.5px solid ${p.color}` }} />
                        <div className="flex-1 h-2 rounded" style={{ background: "#30363D" }} />
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                      </div>
                    ))}
                  </div>
                  {/* Ring */}
                  <div className="flex items-center justify-center w-20 h-12">
                    <svg width="52" height="52" viewBox="0 0 52 52">
                      <circle cx="26" cy="26" r="20" fill="none" stroke="#1E2A3A" strokeWidth="6" />
                      <circle cx="26" cy="26" r="20" fill="none" stroke="url(#ringGrad)" strokeWidth="6"
                        strokeDasharray="125.66" strokeDashoffset="20" strokeLinecap="round"
                        transform="rotate(-90 26 26)" />
                      <defs>
                        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#1D6FEB" />
                          <stop offset="100%" stopColor="#39D0D8" />
                        </linearGradient>
                      </defs>
                      <text x="26" y="30" textAnchor="middle" fontSize="9" fontWeight="700" fill="#F0F6FC">84%</text>
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Floating badge left */}
          <div className="absolute -left-4 sm:-left-8 top-1/3 px-3 py-2 rounded-xl shadow-2xl hidden sm:block"
            style={{ background: "#161B22", border: "1px solid #30363D" }}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(63,185,80,0.15)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3FB950" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#3FB950" }} />
                  <span className="text-xs font-semibold" style={{ color: "#F0F6FC" }}>AI · 3s</span>
                </div>
                <div className="flex gap-0.5 mt-1">
                  {[1,1,1,0.5,0.3].map((o,i) => <div key={i} className="w-4 h-1 rounded-full" style={{ background: `rgba(63,185,80,${o * 0.6})` }} />)}
                </div>
              </div>
            </div>
          </div>

          {/* Floating badge right */}
          <div className="absolute -right-4 sm:-right-8 bottom-1/3 px-3 py-2 rounded-xl shadow-2xl hidden sm:block"
            style={{ background: "#161B22", border: "1px solid #30363D" }}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(57,208,216,0.12)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#39D0D8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: "#F0F6FC" }}>EU · Top 10%</div>
                <div className="text-xs" style={{ color: "#39D0D8" }}>Benchmarking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
