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
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden animate-float"
            style={{
              background: "#161B22",
              border: "1px solid #30363D",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 80px rgba(29,111,235,0.08)",
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#0D1117", borderBottom: "1px solid #30363D" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: "#F78166" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#E3B341" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#3FB950" }} />
              <div className="ml-4 flex-1 h-6 rounded" style={{ background: "#161B22", maxWidth: "200px" }} />
            </div>

            {/* Dashboard mockup content */}
            <div className="p-6" style={{ background: "#0D1117" }}>
              {/* Header bar */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="h-6 w-48 rounded-lg mb-2" style={{ background: "#161B22" }} />
                  <div className="h-4 w-32 rounded" style={{ background: "#161B22" }} />
                </div>
                <div className="h-8 w-24 rounded-lg" style={{ background: "rgba(29,111,235,0.2)", border: "1px solid rgba(29,111,235,0.4)" }} />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { label: "CA Total", value: "926k CHF", color: "#1D6FEB" },
                  { label: "CA Encaissé", value: "508k CHF", color: "#3FB950" },
                  { label: "En Attente", value: "345k CHF", color: "#E3B341" },
                  { label: "Backlog", value: "172k CHF", color: "#F78166" },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-xl" style={{ background: "#161B22", border: "1px solid #30363D" }}>
                    <div className="text-xs mb-1" style={{ color: "#8B949E" }}>{s.label}</div>
                    <div className="text-sm font-bold" style={{ color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div className="h-24 rounded-xl flex items-end gap-2 px-3 pb-3" style={{ background: "#161B22", border: "1px solid #30363D" }}>
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm opacity-80"
                    style={{
                      height: `${h}%`,
                      background: i === 11
                        ? "linear-gradient(180deg, #1D6FEB, #388BFD)"
                        : "rgba(29,111,235,0.25)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div
            className="absolute -left-6 top-1/3 px-4 py-2 rounded-xl shadow-2xl"
            style={{ background: "#161B22", border: "1px solid #30363D" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(63,185,80,0.2)" }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="#3FB950">
                  <path d="M2 6l3 3 5-5" stroke="#3FB950" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: "#F0F6FC" }}>Rapport généré</div>
                <div className="text-xs" style={{ color: "#8B949E" }}>En 3 secondes</div>
              </div>
            </div>
          </div>

          <div
            className="absolute -right-6 bottom-1/3 px-4 py-2 rounded-xl shadow-2xl"
            style={{ background: "#161B22", border: "1px solid #30363D" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(29,111,235,0.2)" }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v4l3 3" stroke="#1D6FEB" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: "#F0F6FC" }}>Benchmarking EU</div>
                <div className="text-xs" style={{ color: "#3FB950" }}>Top 10%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
