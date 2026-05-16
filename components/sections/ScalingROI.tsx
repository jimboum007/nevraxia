"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const ARG_ICONS = [
  /* 0 — Moins de personnel admin (blue) */
  <svg key="a0" width="36" height="36" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="6" r="3.5" fill="#1D6FEB" />
    <path d="M2 19.5C2 15.634 5.134 12.5 9 12.5s7 3.134 7 7" fill="#1D6FEB" fillOpacity="0.65" />
    <path d="M19 9.5v7M16.5 14l2.5 3 2.5-3" stroke="#1D6FEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  /* 1 — Croissance sans friction (green) */
  <svg key="a1" width="36" height="36" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="15" width="3" height="6" rx="1" fill="#3FB950" fillOpacity="0.45" />
    <rect x="8.5" y="10.5" width="3" height="10.5" rx="1" fill="#3FB950" fillOpacity="0.7" />
    <rect x="14" y="6.5" width="3" height="14.5" rx="1" fill="#3FB950" />
    <path d="M19.5 4.5l2 2.5-2 2.5M21.5 7H17" stroke="#3FB950" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  /* 2 — ROI immédiat (yellow) */
  <svg key="a2" width="36" height="36" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="13.5" r="6" fill="#E3B341" fillOpacity="0.18" stroke="#E3B341" strokeWidth="1.4" />
    <path d="M12 10.5v6M10.5 11.5h2.2a1.1 1.1 0 010 2.2h-1.8a1.1 1.1 0 000 2.2H13" stroke="#E3B341" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M17.5 4l2 2.3-2 2.3M19.5 6.3H15.5A8 8 0 005 13.5" stroke="#E3B341" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

const ARG_COLORS = ["#1D6FEB", "#3FB950", "#E3B341"];

export default function ScalingROI() {
  const t = useTranslations("scaling");
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const [doctors, setDoctors] = useState(3);
  const [consults, setConsults] = useState(15);
  const [rate, setRate] = useState(35);
  const [minutes, setMinutes] = useState(20);
  const [ca, setCa] = useState(2000000);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const workingDays = 22;
  const secretarialSavings = Math.round(doctors * consults * workingDays * (minutes / 60) * rate);
  const adminSavings = Math.round((ca / 12) * 0.03);
  const totalSavings = secretarialSavings + adminSavings;

  const args = [
    { icon: ARG_ICONS[0], color: ARG_COLORS[0], title: t("arg1_title"), desc: t("arg1_desc") },
    { icon: ARG_ICONS[1], color: ARG_COLORS[1], title: t("arg2_title"), desc: t("arg2_desc") },
    { icon: ARG_ICONS[2], color: ARG_COLORS[2], title: t("arg3_title"), desc: t("arg3_desc") },
  ];

  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{
        background: "linear-gradient(180deg, #0A1628 0%, #0D1A30 50%, #0A1628 100%)",
      }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(63,185,80,0.1)", border: "1px solid rgba(63,185,80,0.3)" }}
          >
            <span className="text-xs font-medium" style={{ color: "#3FB950" }}>{t("badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#F0F6FC" }}>
            {t("title")}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8B949E" }}>
            {t("subtitle")}
          </p>
        </div>

        {/* 3 args */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {args.map(({ icon, color, title, desc }, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl"
              style={{
                background: "rgba(22,27,34,0.7)",
                border: "1px solid rgba(48,54,61,0.8)",
                backdropFilter: "blur(4px)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`,
              }}
            >
              <div
                className="mx-auto mb-4 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}
              >
                {icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-center" style={{ color: "#F0F6FC" }}>{title}</h3>
              <p className="text-sm leading-relaxed text-center" style={{ color: "#8B949E" }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* ROI Calculator */}
        <div
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: "linear-gradient(135deg, rgba(22,27,34,0.9), rgba(28,35,51,0.9))",
            border: "1px solid rgba(48,54,61,0.8)",
            backdropFilter: "blur(8px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
          }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center" style={{ color: "#F0F6FC" }}>
            {t("calculator_title")}
          </h3>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Sliders */}
            <div className="space-y-8">
              <Slider
                label={t("doctors_label")}
                value={doctors}
                min={1} max={20} step={1}
                onChange={setDoctors}
                color="#1D6FEB"
                displayValue={`${doctors}`}
              />
              <Slider
                label={t("consults_label")}
                value={consults}
                min={5} max={50} step={1}
                onChange={setConsults}
                color="#3FB950"
                displayValue={`${consults}`}
              />
              <Slider
                label={t("rate_label")}
                value={rate}
                min={20} max={80} step={1}
                onChange={setRate}
                color="#E3B341"
                displayValue={`${rate} CHF/h`}
              />
              <Slider
                label={t("minutes_label")}
                value={minutes}
                min={5} max={45} step={1}
                onChange={setMinutes}
                color="#39D0D8"
                displayValue={`${minutes} min`}
              />
              <Slider
                label={t("ca_label")}
                value={ca}
                min={0} max={5000000} step={100000}
                onChange={setCa}
                color="#8863ED"
                displayValue={ca === 0 ? "0 CHF/an" : `${(ca / 1000000).toFixed(1)} M CHF/an`}
              />
            </div>

            {/* Result */}
            <div className="flex flex-col items-center justify-center">
              <div
                className="w-full rounded-2xl p-8 text-center"
                style={{ background: "rgba(29,111,235,0.08)", border: "1px solid rgba(29,111,235,0.2)" }}
              >
                <p className="text-sm mb-3" style={{ color: "#8B949E" }}>{t("result_label")}</p>
                <div className="text-5xl font-bold mb-2" style={{ color: "#1D6FEB" }}>
                  {totalSavings.toLocaleString("fr-CH")}
                </div>
                <p className="text-lg font-medium" style={{ color: "#388BFD" }}>{t("result_unit")}</p>

                <div className="mt-6 space-y-2 text-left">
                  <Detail label="Économies secrétariat / mois" value={`${secretarialSavings.toLocaleString("fr-CH")} CHF`} />
                  <Detail label="Gestion admin & comptable (3% CA)" value={`${adminSavings.toLocaleString("fr-CH")} CHF`} color="#8863ED" />
                  <Detail label="ROI annuel estimé" value={`${Math.round(totalSavings * 12).toLocaleString("fr-CH")} CHF`} color="#3FB950" bold />
                </div>
              </div>

              <p className="text-xs mt-4 text-center" style={{ color: "#8B949E" }}>
                * Estimation basée sur {workingDays} jours ouvrés / mois. 3% du CA annuel récupérés via automatisation administrative et réduction des erreurs de facturation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label, value, min, max, step, onChange, color, displayValue,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; color: string; displayValue: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm" style={{ color: "#8B949E" }}>{label}</label>
        <span className="text-sm font-semibold" style={{ color }}>{displayValue}</span>
      </div>
      <div className="relative rounded-full" style={{ height: "6px", background: "#1C2333", overflow: "visible" }}>
        {/* Fill */}
        <div
          className="absolute left-0 top-0 bottom-0 rounded-full"
          style={{ width: `${pct}%`, background: color }}
        />
        {/* Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: "18px",
            height: "18px",
            left: `calc(${pct}% - 9px)`,
            background: "#040D22",
            border: `2.5px solid ${color}`,
            boxShadow: `0 0 10px ${color}70, 0 2px 6px rgba(0,0,0,0.5)`,
          }}
        />
        {/* Invisible input on top */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full opacity-0 cursor-pointer"
          style={{ height: "32px", top: "50%", transform: "translateY(-50%)", margin: 0 }}
        />
      </div>
    </div>
  );
}

function Detail({ label, value, color, bold }: { label: string; value: string; color?: string; bold?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1.5" style={{ borderBottom: "1px solid rgba(48,54,61,0.5)" }}>
      <span className="text-xs" style={{ color: "#8B949E" }}>{label}</span>
      <span className="text-xs font-semibold" style={{ color: bold ? (color ?? "#F0F6FC") : (color ?? "#F0F6FC") }}>
        {value}
      </span>
    </div>
  );
}
