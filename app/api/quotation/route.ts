import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // honeypot
    const botField = String(form.get("companyWebsite") || "");
    if (botField) {
      return NextResponse.json({ success: true }); // silently ignore bots
    }

    const firstName  = String(form.get("name") || "");
    
    const email      = String(form.get("email") || "");
    const phone      = String(form.get("phone") || "");
    const serviceDate= String(form.get("serviceDate") || "");
    const location   = String(form.get("location") || "");
    const attendees  = String(form.get("attendees") || "");
    const message    = String(form.get("message") || "");

    // arrays from checkboxes
    const services   = form.getAll("service[]").map(v => String(v));
    const industries = form.getAll("industry[]").map(v => String(v));

    if (!firstName ||  !email) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const servicesList   = services.length ? `<ul>${services.map(s => `<li>${s}</li>`).join("")}</ul>` : "—";
    const industriesList = industries.length ? `<ul>${industries.map(i => `<li>${i}</li>`).join("")}</ul>` : "—";

    await resend.emails.send({
      from: "Metro Guards <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL!,            // e.g. ummehabiba989@gmail.com
      replyTo: email,                                // <- correct key
      subject: `New Contact Form Submission from ${firstName} `,
      html: `
        <h2>New Quotation Request</h2>
        <p><strong>Name:</strong> ${firstName} </p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "—"}</p>
        <p><strong>Service Date:</strong> ${serviceDate || "—"}</p>
        <p><strong>Location/Suburb:</strong> ${location || "—"}</p>
        <p><strong>Attendees:</strong> ${attendees || "—"}</p>
        <p><strong>Industries:</strong> ${industriesList}</p>
        <p><strong>Services:</strong> ${servicesList}</p>
        <p><strong>Message:</strong><br/>${message ? message.replace(/\n/g, "<br/>") : "—"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Email failed" }, { status: 500 });
  }
}
