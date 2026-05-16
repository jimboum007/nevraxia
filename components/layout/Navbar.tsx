"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

const LOCALES = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "it", label: "IT" },
];

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(13, 17, 23, 0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(48, 54, 61, 0.6)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Logo size="lg" variant="dark" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href={`/${locale}#features`}>{t("features")}</NavLink>
            <NavLink href={`/${locale}#benchmarking`}>{t("benchmarking")}</NavLink>
            <NavLink href={`/${locale}#pricing`}>{t("pricing")}</NavLink>
            <NavLink href={`/${locale}#contact`}>{t("contact")}</NavLink>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: "#8B949E", border: "1px solid #30363D" }}
              >
                {locale.toUpperCase()}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 8L1 3h10z" />
                </svg>
              </button>
              {langOpen && (
                <div
                  className="absolute right-0 top-10 rounded-xl overflow-hidden shadow-2xl z-50"
                  style={{ background: "#161B22", border: "1px solid #30363D", minWidth: "80px" }}
                >
                  {LOCALES.map((l) => (
                    <Link
                      key={l.code}
                      href={`/${l.code}`}
                      onClick={() => setLangOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors"
                      style={{
                        color: l.code === locale ? "#1D6FEB" : "#8B949E",
                        background: l.code === locale ? "rgba(29,111,235,0.1)" : "transparent",
                      }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}#contact`}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #1D6FEB, #388BFD)",
                color: "#fff",
              }}
            >
              {t("demo")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-3 rounded-lg"
            style={{ color: "#8B949E" }}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden px-4 pt-2 pb-4 space-y-2"
          style={{ background: "rgba(13, 17, 23, 0.98)", borderBottom: "1px solid #30363D" }}
        >
          <MobileNavLink href={`/${locale}#features`} onClick={() => setMenuOpen(false)}>{t("features")}</MobileNavLink>
          <MobileNavLink href={`/${locale}#benchmarking`} onClick={() => setMenuOpen(false)}>{t("benchmarking")}</MobileNavLink>
          <MobileNavLink href={`/${locale}#pricing`} onClick={() => setMenuOpen(false)}>{t("pricing")}</MobileNavLink>
          <MobileNavLink href={`/${locale}#contact`} onClick={() => setMenuOpen(false)}>{t("contact")}</MobileNavLink>
          <div className="flex gap-2 pt-2">
            {LOCALES.map((l) => (
              <Link
                key={l.code}
                href={`/${l.code}`}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: l.code === locale ? "rgba(29,111,235,0.2)" : "#161B22",
                  color: l.code === locale ? "#1D6FEB" : "#8B949E",
                  border: "1px solid #30363D",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}#contact`}
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center px-5 py-2.5 rounded-xl text-sm font-semibold mt-2"
            style={{ background: "linear-gradient(135deg, #1D6FEB, #388BFD)", color: "#fff" }}
          >
            {t("demo")}
          </Link>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium transition-colors hover:text-white"
      style={{ color: "#8B949E" }}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors"
      style={{ color: "#8B949E" }}
    >
      {children}
    </Link>
  );
}
