"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Pricing() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      key: "starter" as const,
      color: "#1D6FEB",
      gradient: "from-blue-600 to-blue-500",
      featured: false,
    },
    {
      key: "cabinet" as const,
      color: "#1D6FEB",
      gradient: "from-blue-600 to-cyan-500",
      featured: true,
    },
    {
      key: "reseau" as const,
      color: "#8863ED",
      gradient: "from-purple-600 to-indigo-500",
      featured: false,
    },
  ];

  const starterFeatures = t.raw("starter.features") as string[];
  const cabinetFeatures = t.raw("cabinet.features") as string[];
  const reseauFeatures = t.raw("reseau.features") as string[];
  const featuresList = [starterFeatures, cabinetFeatures, reseauFeatures];

  return (
    <section
      id="pricing"
      ref={ref}
      style={{ background: "#0D1117", padding: "100px 0" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(136,99,237,0.1)", border: "1px solid rgba(136,99,237,0.3)" }}
          >
            <span className="text-xs font-medium" style={{ color: "#8863ED" }}>{t("badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#F0F6FC" }}>
            {t("title")}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8B949E" }}>
            {t("subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map(({ key, color, featured }, i) => (
            <div
              key={key}
              className="relative rounded-2xl p-7 flex flex-col"
              style={{
                background: featured ? "linear-gradient(135deg, rgba(29,111,235,0.12), rgba(57,208,216,0.06))" : "#161B22",
                border: featured ? "1px solid rgba(29,111,235,0.4)" : "1px solid #30363D",
                boxShadow: featured ? "0 0 40px rgba(29,111,235,0.12)" : "none",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}
            >
              {/* Popular badge */}
              {featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "linear-gradient(135deg, #1D6FEB, #39D0D8)", color: "#fff" }}
                >
                  {t(`${key}.badge` as "cabinet.badge")}
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-xl font-bold mb-3 tracking-tight" style={{ color }}>
                {t(`${key}.name`)}
              </h3>

              <p className="text-sm mb-6" style={{ color: "#8B949E" }}>
                {t(`${key}.desc`)}
              </p>

              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-bold mb-1" style={{ color: "#F0F6FC" }}>
                  {t(`${key}.price`)}
                </div>
                <p className="text-xs" style={{ color: "#8B949E" }}>personnalisé selon vos besoins</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-8">
                {featuresList[i].map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div className="flex-shrink-0 mt-0.5">
                      <CheckIcon color={color} />
                    </div>
                    <span className="text-sm" style={{ color: "#8B949E" }}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={`/${locale}#contact`}
                className="block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={
                  featured
                    ? {
                        background: "linear-gradient(135deg, #1D6FEB, #388BFD)",
                        color: "#fff",
                      }
                    : {
                        background: "rgba(255,255,255,0.04)",
                        color: "#F0F6FC",
                        border: "1px solid #30363D",
                      }
                }
              >
                {t("contact_cta")}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          className="text-center p-6 rounded-2xl"
          style={{ background: "#161B22", border: "1px solid #30363D" }}
        >
          <p className="text-sm" style={{ color: "#8B949E" }}>
            ✓ {t("note")}
          </p>
        </div>
      </div>
    </section>
  );
}
