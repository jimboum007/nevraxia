"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer style={{ background: "#0D1117", borderTop: "1px solid #30363D" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo size="md" variant="dark" />
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#8B949E", maxWidth: "280px" }}>
              {t("tagline")}
            </p>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors hover:opacity-80"
              style={{ background: "#161B22", color: "#8B949E", border: "1px solid #30363D" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#F0F6FC" }}>Produit</h3>
            <ul className="space-y-3">
              <li><FooterLink href={`/${locale}#features`}>{t("features")}</FooterLink></li>
              <li><FooterLink href={`/${locale}#benchmarking`}>{t("benchmarking")}</FooterLink></li>
              <li><FooterLink href={`/${locale}#pricing`}>{t("pricing")}</FooterLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#F0F6FC" }}>Contact</h3>
            <ul className="space-y-3">
              <li><FooterLink href={`/${locale}#contact`}>{t("contact")}</FooterLink></li>
              <li>
                <a
                  href="mailto:contact@nevraxia.ch"
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "#8B949E" }}
                >
                  contact@nevraxia.ch
                </a>
              </li>
              <li><FooterLink href={`/${locale}/legal`}>{t("legal")}</FooterLink></li>
              <li><FooterLink href={`/${locale}/privacy`}>{t("privacy")}</FooterLink></li>
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid #30363D" }}
        >
          <p className="text-xs" style={{ color: "#8B949E" }}>{t("copyright")}</p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs" style={{ color: "#8B949E" }}>Made in Switzerland</span>
            <span className="text-base">🇨🇭</span>
            <span className="text-xs" style={{ color: "#30363D" }}>·</span>
            <span className="text-xs" style={{ color: "#8B949E" }}>by Humans</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm transition-colors hover:opacity-80"
      style={{ color: "#8B949E" }}
    >
      {children}
    </Link>
  );
}
