import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, lastname, email, phone, structure, specialty, message } = body;

    if (!name || !lastname || !email || !structure) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Log the submission (replace with email service like Resend in production)
    console.log("New demo request:", {
      name: `${name} ${lastname}`,
      email,
      phone,
      structure,
      specialty,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate Resend or Nodemailer to send to contact@neuraxia.ch
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@neuraxia.ch',
    //   to: 'contact@neuraxia.ch',
    //   subject: `Nouvelle demande de démo — ${name} ${lastname}`,
    //   html: `<p>...</p>`
    // });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
