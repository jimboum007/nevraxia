import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default async function LegalPage({ params }: PageProps<"/[locale]/legal">) {
  const { locale } = await params;
  return (
    <main style={{ background: "#0D1117", minHeight: "100vh" }}>
      <Navbar locale={locale} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-20">
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
          Mentions légales
        </h1>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: "#8B949E" }}>
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "#F0F6FC" }}>Éditeur</h2>
            <p>Nevraxia<br />Suisse<br />contact@nevraxia.ch</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "#F0F6FC" }}>Hébergement</h2>
            <p>Vercel Inc.<br />340 Pine Street, Suite 701<br />San Francisco, CA 94104, USA<br />vercel.com</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "#F0F6FC" }}>Propriété intellectuelle</h2>
            <p>L'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété exclusive de Nevraxia et est protégé par les lois suisses et internationales relatives à la propriété intellectuelle. Toute reproduction est interdite sans autorisation préalable.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "#F0F6FC" }}>Limitation de responsabilité</h2>
            <p>Nevraxia s'efforce de maintenir les informations de ce site à jour et exactes. Nevraxia ne saurait être tenu responsable des erreurs ou omissions, ni des dommages directs ou indirects résultant de l'utilisation de ce site.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "#F0F6FC" }}>Droit applicable</h2>
            <p>Le présent site est soumis au droit suisse. Tout litige relève de la compétence exclusive des tribunaux du canton de Genève.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
