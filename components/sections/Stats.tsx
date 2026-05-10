"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ icon, value, suffix, label, sublabel, color, delay, inView }: {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  sublabel: string;
  color: string;
  delay: number;
  inView: boolean;
}) {
  const count = useCountUp(value, 1500, inView);
  return (
    <div
      className="relative p-6 rounded-2xl transition-all duration-500 hover:scale-[1.02]"
      style={{
        background: "#161B22",
        border: "1px solid #30363D",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${color}20` }}
      >
        <div style={{ color }}>{icon}</div>
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-bold" style={{ color: "#F0F6FC" }}>{count}</span>
        {suffix && <span className="text-xl font-bold" style={{ color }}>{suffix}</span>}
      </div>
      <div className="text-sm font-medium mb-1" style={{ color: "#F0F6FC" }}>{label}</div>
      <div className="text-xs" style={{ color: "#8B949E" }}>{sublabel}</div>
    </div>
  );
}

export default function Stats() {
  const t = useTranslations("stats");
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

  const stats = [
    {
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/></svg>,
      value: 20,
      suffix: t("docs_suffix"),
      label: t("docs"),
      sublabel: t("docs_label"),
      color: "#1D6FEB",
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/></svg>,
      value: 1,
      suffix: t("doctors_suffix"),
      label: t("doctors"),
      sublabel: t("doctors_label"),
      color: "#3FB950",
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg>,
      value: 100,
      suffix: "%",
      label: t("custom"),
      sublabel: t("custom_label"),
      color: "#E3B341",
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>,
      value: 4,
      suffix: t("benchmark_suffix"),
      label: t("benchmark"),
      sublabel: t("benchmark_label"),
      color: "#39D0D8",
    },
  ];

  return (
    <section style={{ background: "#0D1117", padding: "80px 0" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} delay={i * 100} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
