import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "../../utils/contact";

type ContactPayload = {
  formType?: "hero" | "contact";
  source?: string;
  email?: string;
  website?: string;
  phone?: string;
  name?: string;
  site?: string;
  fullName?: string;
  phoneNumber?: string;
  selectedPackage?: string;
  budget?: string;
};

export async function POST(request: Request) {
  try {
    
    const body = (await request.json()) as ContactPayload;

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Adzo Marketing <onboarding@resend.dev>";

    const formType = body.formType || "contact";
    const source = body.source || (formType === "hero" ? "Hero Form" : "Contact Form");

    let subject = `New ${source} Submission`;
    let html = "";
    let text = "";

    const createEmailTemplate = (title: string, subtitle: string, rows: Array<{ label: string; value: string }>) => {
      const rowsHtml = rows
        .map(
          (row) => `
            <tr>
              <td style="padding: 12px 14px; border-bottom: 1px solid #e2e8f0; width: 32%; font-weight: 700; color: #0f172a; font-family: 'Manrope','Segoe UI',Arial,sans-serif; font-size: 13px; vertical-align: top;">
                ${row.label}
              </td>
              <td style="padding: 12px 14px; border-bottom: 1px solid #e2e8f0; color: #334155; font-family: 'Manrope','Segoe UI',Arial,sans-serif; font-size: 13px; line-height: 1.55;">
                ${row.value || "N/A"}
              </td>
            </tr>
          `
        )
        .join("");

      return `
        <!doctype html>
        <html>
          <body style="margin:0; padding:0; background:#f8fafc;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc; padding:30px 14px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px; border-radius:18px; overflow:hidden; background:#ffffff; border:1px solid rgba(119,185,62,0.22); box-shadow:0 20px 45px rgba(15,23,42,0.08);">
                    <tr>
                      <td style="padding:26px 26px 20px; background:linear-gradient(140deg,#ffffff 0%,#f8fff1 48%,#f1f5f9 100%); border-bottom:1px solid rgba(119,185,62,0.2);">
                        <div style="display:inline-block; padding:6px 10px; border-radius:999px; border:1px solid rgba(119,185,62,0.3); background:rgba(119,185,62,0.09); color:#4a7a24; font-weight:700; font-family:'IBM Plex Mono',Consolas,monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.08em;">
                          Adzo Marketing Lead Alert
                        </div>
                        <h1 style="margin:14px 0 8px; font-family:'Manrope','Segoe UI',Arial,sans-serif; font-size:27px; line-height:1.2; color:#0f172a;">
                          ${title}
                        </h1>
                        <p style="margin:0; font-family:'Manrope','Segoe UI',Arial,sans-serif; font-size:14px; line-height:1.6; color:#64748b;">
                          ${subtitle}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:20px 22px 10px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; background:#ffffff;">
                          ${rowsHtml}
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 24px 24px;">
                        <p style="margin:0; font-family:'Manrope','Segoe UI',Arial,sans-serif; font-size:12px; line-height:1.6; color:#64748b;">
                          This message was generated from your website form. Reply directly to follow up with this lead.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 24px 24px;">
                        <div style="height:4px; border-radius:999px; background:linear-gradient(90deg,#77b93e 0%,#10b981 100%);"></div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `;
    };

    if (formType === "hero") {
      const phone = body.phone?.trim() || "";
      const name = body.name?.trim() || "";
      const site = body.site?.trim() || "";

      if (!phone) {
        return NextResponse.json({ error: "Phone is required." }, { status: 400 });
      }

      subject = "New Hero Lead Submission";
      html = createEmailTemplate("New Hero Lead", "A fresh inquiry just landed from the Hero section.", [
        { label: "Source", value: source },
        { label: "Phone", value: phone },
        { label: "Name", value: name || "N/A" },
        { label: "Website", value: site || "N/A" },
      ]);
      text = `New Hero Lead\nSource: ${source}\nPhone: ${phone}\nName: ${name || "N/A"}\nSite: ${site || "N/A"}`;
    } else {
      subject = "New Contact Form Submission";
      html = createEmailTemplate(
        "New Contact Submission",
        "A potential client submitted the main contact form.",
        [
          { label: "Source", value: source },
          { label: "Full Name", value: body.fullName || "N/A" },
          { label: "Phone", value: body.phoneNumber || "N/A" },
          { label: "Selected Package", value: body.selectedPackage || "N/A" },
          { label: "Budget", value: body.budget || "N/A" },
        ]
      );
      text = `New Contact Form Submission\nSource: ${source}\nFull Name: ${body.fullName || "N/A"}\nPhone: ${body.phoneNumber || "N/A"}\nPackage: ${body.selectedPackage || "N/A"}\nBudget: ${body.budget || "N/A"}`;
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        html,
        text,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      return NextResponse.json(
        { error: "Resend failed", details: errorBody },
        { status: resendResponse.status || 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
