import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, lastname, email, phone, structure, specialty, message } = body;

    if (!name || !lastname || !email || !structure) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Nevraxia <onboarding@resend.dev>",
      to: "contact@nevraxia.ch",
      replyTo: email,
      subject: `Nouvelle demande de démo — ${name} ${lastname}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#F0F6FC;padding:40px;border-radius:12px">
          <div style="margin-bottom:32px">
            <h1 style="font-size:24px;font-weight:700;margin:0 0 4px">Nouvelle demande de démo</h1>
            <p style="color:#8B949E;margin:0;font-size:14px">Reçue depuis nevraxia.ch</p>
          </div>

          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #30363D;color:#8B949E;font-size:14px;width:40%">Nom</td>
              <td style="padding:12px 0;border-bottom:1px solid #30363D;font-size:14px;font-weight:600">${name} ${lastname}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #30363D;color:#8B949E;font-size:14px">Email</td>
              <td style="padding:12px 0;border-bottom:1px solid #30363D;font-size:14px"><a href="mailto:${email}" style="color:#388BFD;text-decoration:none">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #30363D;color:#8B949E;font-size:14px">Téléphone</td>
              <td style="padding:12px 0;border-bottom:1px solid #30363D;font-size:14px">${phone || "—"}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #30363D;color:#8B949E;font-size:14px">Structure</td>
              <td style="padding:12px 0;border-bottom:1px solid #30363D;font-size:14px;font-weight:600">${structure}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #30363D;color:#8B949E;font-size:14px">Spécialité</td>
              <td style="padding:12px 0;border-bottom:1px solid #30363D;font-size:14px">${specialty || "—"}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding:12px 0;color:#8B949E;font-size:14px;vertical-align:top">Message</td>
              <td style="padding:12px 0;font-size:14px;line-height:1.6">${message}</td>
            </tr>` : ""}
          </table>

          <div style="margin-top:32px;padding:16px;background:#161B22;border-radius:8px;border:1px solid #30363D">
            <p style="margin:0;font-size:12px;color:#8B949E">
              Répondre directement à cet email pour contacter <strong style="color:#F0F6FC">${name} ${lastname}</strong> — ${email}
            </p>
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
