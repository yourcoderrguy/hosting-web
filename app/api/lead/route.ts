import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Runs on the server only — SUPABASE_SERVICE_ROLE_KEY and RESEND_API_KEY
// never reach the browser. That's the "auth code" you were asking
// about: it's Supabase's service role key, a secret API key you get
// from your Supabase project settings, kept only in environment
// variables (never in client-side code).
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const pkg = typeof body.package === "string" ? body.package : null;
    const source = typeof body.source === "string" ? body.source : "landing_page";

    if (!name || !email) {
      return NextResponse.json({ error: "Missing name or email" }, { status: 400 });
    }

    let dbError: string | null = null;

    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
      const { error } = await supabase.from("leads").insert({
        name,
        email,
        package: pkg,
        source,
      });
      if (error) {
        console.error("Supabase insert error:", error.message);
        dbError = error.message;
      }
    } else {
      console.warn("Supabase env vars missing — skipping DB insert.");
    }

    // Email notification. Awaited (not fire-and-forget) — on
    // serverless, the function can be frozen/killed the instant the
    // response is returned, which was silently dropping most of
    // these emails before. Still wrapped so a Resend failure never
    // fails the request for the user.
    let emailError: string | null = null;
    if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        const { error: sendError } = await resend.emails.send({
          from: process.env.LEAD_FROM_EMAIL || "OP5 Leads <onboarding@resend.dev>",
          to: process.env.LEAD_NOTIFY_EMAIL,
          subject: `New lead: ${name} — ${pkg ?? "General enquiry"}`,
          text: `Name: ${name}\nEmail: ${email}\nPackage: ${pkg ?? "N/A"}\nSource: ${source}`,
        });
        if (sendError) {
          console.error("Resend error:", sendError);
          emailError = sendError.message;
        }
      } catch (err) {
        console.error("Resend threw:", err);
        emailError = err instanceof Error ? err.message : "Unknown email error";
      }
    } else {
      console.warn("Resend env vars missing — skipping email notification.");
      emailError = "RESEND_API_KEY or LEAD_NOTIFY_EMAIL not configured";
    }

    return NextResponse.json({ ok: true, dbError, emailError });
  } catch (err) {
    console.error("Lead route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
