import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  return (
    <main style={{ background: "#0D1117", minHeight: "100vh" }}>
      <Navbar locale={locale} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm mb-10 hover:opacity-80 transition-opacity"
          style={{ color: "#8B949E" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Retour
        </Link>

        <h1 className="text-4xl font-bold mb-10" style={{ color: "#F0F6FC" }}>
          Politique de confidentialité
        </h1>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: "#8B949E" }}>
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "#F0F6FC" }}>Responsable du traitement</h2>
            <p>Nevraxia — contact@nevraxia.ch</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "#F0F6FC" }}>Données collectées</h2>
            <p>Via le formulaire de contact, nous collectons : nom, prénom, adresse email, numéro de téléphone, structure médicale et spécialité. Ces données sont utilisées uniquement pour répondre à votre demande de démonstration.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "#F0F6FC" }}>Base légale</h2>
            <p>Le traitement est fondé sur votre consentement explicite lors de la soumission du formulaire de contact (art. 6 al. 1 lit. a RGPD / LPD suisse).</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "#F0F6FC" }}>Conservation des données</h2>
            <p>Vos données sont conservées le temps nécessaire au traitement de votre demande et supprimées dans un délai de 12 mois si aucune relation contractuelle ne s'établit.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "#F0F6FC" }}>Vos droits</h2>
            <p>Conformément au RGPD et à la LPD suisse, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Pour exercer ces droits : <a href="mailto:contact@nevraxia.ch" style={{ color: "#388BFD" }}>contact@nevraxia.ch</a></p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "#F0F6FC" }}>Cookies</h2>
            <p>Ce site n'utilise pas de cookies de traçage ou publicitaires. Seuls des cookies techniques essentiels au fonctionnement du site peuvent être utilisés.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "#F0F6FC" }}>Contact</h2>
            <p>Pour toute question relative à vos données personnelles : <a href="mailto:contact@nevraxia.ch" style={{ color: "#388BFD" }}>contact@nevraxia.ch</a></p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
