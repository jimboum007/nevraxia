"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActive((a) => (a + 1) % 3), 6000);
    return () => clearInterval(interval);
  }, []);

  const items = t.raw("items") as Array<{
    quote: string; name: string; role: string; org: string;
  }>;

  const AVATAR_COLORS = ["#1D6FEB", "#3FB950", "#8863ED"];
  const AVATAR_INITIALS = ["AM", "FR", "DM"];

  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ background: "#0D1117" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#F0F6FC" }}>
            {t("title")}
          </h2>
          <p className="text-lg" style={{ color: "#8B949E" }}>{t("subtitle")}</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className="relative p-7 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: active === i ? "linear-gradient(135deg, rgba(29,111,235,0.1), rgba(57,208,216,0.05))" : "#161B22",
                border: active === i ? "1px solid rgba(29,111,235,0.3)" : "1px solid #30363D",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s, background 0.3s, border 0.3s`,
              }}
            >
              {/* Quote icon */}
              <div className="mb-4">
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                  <path
                    d="M0 20V12.6C0 9.93 0.693 7.607 2.08 5.627 3.467 3.647 5.507 2.12 8.2 1.047L9.96 3.88C8.253 4.58 6.9 5.587 5.9 6.9 4.9 8.213 4.333 9.76 4.2 11.54h4.96V20H0zm15.04 0V12.6c0-2.667.693-4.993 2.08-6.973 1.387-1.98 3.427-3.507 6.12-4.58L25 3.88c-1.707.7-3.06 1.707-4.06 3.02-.973 1.313-1.54 2.86-1.7 4.64H24.2V20H15.04z"
                    fill={active === i ? "#1D6FEB" : "#30363D"}
                    opacity={0.6}
                  />
                </svg>
              </div>

              <p className="text-sm leading-relaxed mb-6 italic" style={{ color: active === i ? "#F0F6FC" : "#8B949E" }}>
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: `${AVATAR_COLORS[i]}20`, color: AVATAR_COLORS[i], border: `1px solid ${AVATAR_COLORS[i]}40` }}
                >
                  {AVATAR_INITIALS[i]}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "#F0F6FC" }}>{item.name}</div>
                  <div className="text-xs" style={{ color: "#8B949E" }}>{item.role} · {item.org}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1 mt-8" role="tablist" aria-label="Témoignages">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={active === i}
              aria-label={`Témoignage ${i + 1}`}
              className="flex items-center justify-center p-3 -m-1 transition-all duration-300"
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  background: active === i ? "#1D6FEB" : "#30363D",
                  width: active === i ? "24px" : "8px",
                  height: "8px",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
