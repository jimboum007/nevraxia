import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { name, lastname, email, phone, structure, specialty, message } = body;

    if (!name || !lastname || !email || !structure) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Nevraxia <noreply@nevraxia.ch>",
      to: "contact@nevraxia.ch",
      replyTo: email,
      subject: `Nouvelle demande de démo — ${name} ${lastname}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;color:#111827">
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#1D6FEB,#388BFD);padding:32px 40px;border-radius:12px 12px 0 0">
            <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.7)">Nevraxia · nevraxia.ch</p>
            <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff">Nouvelle demande de démo</h1>
          </div>

          <!-- Body -->
          <div style="padding:32px 40px;background:#ffffff;border:1px solid #E5E7EB;border-top:none;border-radius:0 0 12px 12px">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #F3F4F6;font-size:13px;color:#6B7280;width:38%">Nom</td>
                <td style="padding:12px 0;border-bottom:1px solid #F3F4F6;font-size:14px;font-weight:600;color:#111827">${name} ${lastname}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #F3F4F6;font-size:13px;color:#6B7280">Email</td>
                <td style="padding:12px 0;border-bottom:1px solid #F3F4F6;font-size:14px"><a href="mailto:${email}" style="color:#1D6FEB;text-decoration:none;font-weight:500">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #F3F4F6;font-size:13px;color:#6B7280">Téléphone</td>
                <td style="padding:12px 0;border-bottom:1px solid #F3F4F6;font-size:14px;color:#111827">${phone || "—"}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #F3F4F6;font-size:13px;color:#6B7280">Structure</td>
                <td style="padding:12px 0;border-bottom:1px solid #F3F4F6;font-size:14px;font-weight:600;color:#111827">${structure}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;${message ? "border-bottom:1px solid #F3F4F6;" : ""}font-size:13px;color:#6B7280">Spécialité</td>
                <td style="padding:12px 0;${message ? "border-bottom:1px solid #F3F4F6;" : ""}font-size:14px;color:#111827">${specialty || "—"}</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding:12px 0;font-size:13px;color:#6B7280;vertical-align:top">Message</td>
                <td style="padding:12px 0;font-size:14px;color:#111827;line-height:1.6">${message}</td>
              </tr>` : ""}
            </table>

            <div style="margin-top:28px;padding:16px 20px;background:#F0F6FF;border-radius:8px;border-left:3px solid #1D6FEB">
              <p style="margin:0;font-size:13px;color:#374151">
                Répondre à cet email pour contacter directement <strong style="color:#111827">${name} ${lastname}</strong>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
