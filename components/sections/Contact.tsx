"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

type FormData = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  structure: string;
  specialty: string;
  message: string;
};

export default function Contact() {
  const t = useTranslations("contact");
  const [form, setForm] = useState<FormData>({
    name: "", lastname: "", email: "", phone: "",
    structure: "", specialty: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", lastname: "", email: "", phone: "", structure: "", specialty: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    background: "#0D1117",
    border: "1px solid #30363D",
    color: "#F0F6FC",
    borderRadius: "12px",
    padding: "12px 16px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const specialties = [
    "Allergologie et immunologie clinique",
    "Anesthésiologie",
    "Angiologie",
    "Chirurgie cardiaque et vasculaire thoracique",
    "Chirurgie générale et traumatologie",
    "Chirurgie orthopédique et traumatologie de l'appareil locomoteur",
    "Chirurgie pédiatrique",
    "Chirurgie plastique, reconstructive et esthétique",
    "Dermatologie et vénéréologie",
    "Endocrinologie et diabétologie",
    "Gastroentérologie",
    "Gynécologie et obstétrique",
    "Hématologie",
    "Infectiologie",
    "Médecine générale",
    "Médecine intensive",
    "Médecine interne générale",
    "Médecine nucléaire",
    "Médecine physique et réadaptation",
    "Médecine du travail",
    "Néphrologie",
    "Neurochirurgie",
    "Neurologie",
    "Neuropathologie",
    "Neuroradiologie",
    "Oncologie médicale",
    "Ophtalmologie",
    "Oto-rhino-laryngologie (ORL)",
    "Pathologie",
    "Pédiatrie",
    "Pharmacologie et toxicologie cliniques",
    "Pneumologie",
    "Psychiatrie et psychothérapie",
    "Psychiatrie et psychothérapie de l'enfant et de l'adolescent",
    "Radio-oncologie / radiothérapie",
    "Radiologie",
    "Rhumatologie",
    "Urologie",
    "Autre",
  ];

  return (
    <section
      id="contact"
      style={{
        background: "linear-gradient(180deg, #0D1117 0%, #0A0F1A 100%)",
        padding: "100px 0",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(29,111,235,0.1)", border: "1px solid rgba(29,111,235,0.3)" }}
          >
            <span className="text-xs font-medium" style={{ color: "#388BFD" }}>{t("badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#F0F6FC" }}>
            {t("title")}
          </h2>
          <p className="text-lg" style={{ color: "#8B949E" }}>{t("subtitle")}</p>
        </div>

        {/* Form card */}
        <div
          className="rounded-3xl p-8 sm:p-10"
          style={{ background: "#161B22", border: "1px solid #30363D" }}
        >
          {status === "success" ? (
            <div className="text-center py-16">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(63,185,80,0.15)", border: "2px solid rgba(63,185,80,0.4)" }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M8 20l8 8 16-16" stroke="#3FB950" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: "#F0F6FC" }}>{t("success_title")}</h3>
              <p style={{ color: "#8B949E" }}>{t("success_desc")}</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 px-6 py-3 rounded-xl text-sm font-medium transition-colors"
                style={{ background: "#30363D", color: "#F0F6FC" }}
              >
                Nouvelle demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2" style={{ color: "#8B949E" }}>{t("name")} *</label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="Marie"
                    onFocus={(e) => (e.target.style.borderColor = "#1D6FEB")}
                    onBlur={(e) => (e.target.style.borderColor = "#30363D")}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: "#8B949E" }}>{t("lastname")} *</label>
                  <input
                    required
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="Dupont"
                    onFocus={(e) => (e.target.style.borderColor = "#1D6FEB")}
                    onBlur={(e) => (e.target.style.borderColor = "#30363D")}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2" style={{ color: "#8B949E" }}>{t("email")} *</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="dr.dupont@clinique.ch"
                    onFocus={(e) => (e.target.style.borderColor = "#1D6FEB")}
                    onBlur={(e) => (e.target.style.borderColor = "#30363D")}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: "#8B949E" }}>{t("phone")}</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="+41 79 000 00 00"
                    onFocus={(e) => (e.target.style.borderColor = "#1D6FEB")}
                    onBlur={(e) => (e.target.style.borderColor = "#30363D")}
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2" style={{ color: "#8B949E" }}>{t("structure")} *</label>
                  <input
                    required
                    name="structure"
                    value={form.structure}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="Centre médical de Beau-Séjour"
                    onFocus={(e) => (e.target.style.borderColor = "#1D6FEB")}
                    onBlur={(e) => (e.target.style.borderColor = "#30363D")}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: "#8B949E" }}>{t("specialty")}</label>
                  <select
                    name="specialty"
                    value={form.specialty}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => (e.target.style.borderColor = "#1D6FEB")}
                    onBlur={(e) => (e.target.style.borderColor = "#30363D")}
                  >
                    <option value="">Sélectionner...</option>
                    {specialties.map((s) => (
                      <option key={s} value={s} style={{ background: "#0D1117" }}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm mb-2" style={{ color: "#8B949E" }}>{t("message")}</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                  placeholder="Décrivez votre contexte, vos besoins spécifiques..."
                  onFocus={(e) => (e.target.style.borderColor = "#1D6FEB")}
                  onBlur={(e) => (e.target.style.borderColor = "#30363D")}
                />
              </div>

              {status === "error" && (
                <p className="text-sm" style={{ color: "#F78166" }}>{t("error")}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-90 hover:scale-[1.01] disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, #1D6FEB, #388BFD)",
                  color: "#fff",
                  boxShadow: "0 0 24px rgba(29,111,235,0.25)",
                }}
              >
                {status === "sending" ? t("sending") : t("submit")}
              </button>

              <p className="text-xs text-center" style={{ color: "#8B949E" }}>
                En soumettant ce formulaire, vous acceptez d&apos;être contacté par l&apos;équipe Nevraxia.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
