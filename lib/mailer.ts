import nodemailer from "nodemailer";

let _transporter: nodemailer.Transporter | null = null;

export function getTransporter() {
  if (_transporter) return _transporter;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn("[Mailer] GMAIL_USER or GMAIL_APP_PASSWORD is not set.");
    return null;
  }

  _transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });

  return _transporter;
}

function escapeHtml(str: string) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContactNotification(data: {
  full_name: string;
  email: string;
  mobile?: string | null;
  reason: string;
  message: string;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[Mailer] Transporter not available, skipping email.");
    return null;
  }

  const { full_name, email, mobile, reason, message } = data;

  const now = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium",
  });

  const safeName = escapeHtml(full_name);
  const safeEmail = escapeHtml(email);
  const safeMobile = escapeHtml(mobile || "");
  const safeReason = escapeHtml(reason);
  const safeMessage = escapeHtml(message);

  let badgeBg = "#eff6ff";
  let badgeBorder = "#bfdbfe";
  let badgeColor = "#1d4ed8";
  if (reason.toLowerCase().includes("job")) {
    badgeBg = "#f0fdf4";
    badgeBorder = "#bbf7d0";
    badgeColor = "#15803d";
  } else if (reason.toLowerCase().includes("freelance")) {
    badgeBg = "#fdf4ff";
    badgeBorder = "#f5d0fe";
    badgeColor = "#86198f";
  } else if (reason.toLowerCase().includes("consultation")) {
    badgeBg = "#fefce8";
    badgeBorder = "#fef08a";
    badgeColor = "#854d0e";
  }

  const mailOptions = {
    from: `"Shashank Shinde QA Portfolio" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFICATION_EMAIL || "shashankshinde38@gmail.com",
    replyTo: email,
    subject: `🔔 [Portfolio] ${reason} from ${full_name}`,
    text: `New Portfolio Inquiry from ${full_name} (${email}, ${mobile || "No phone"}):
Reason: ${reason}
Date: ${now} IST

Message:
${message}

Saved to Supabase database.
    `.trim(),
    html: `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>New Portfolio Enquiry</title>
</head>
<body style="margin:0; padding:0; width:100%; background-color:#070b14; color:#f8fafc; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#070b14; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:620px; background-color:#0c1322; border:1px solid #1e293b; border-radius:18px; overflow:hidden; box-shadow:0 12px 40px rgba(0,0,0,0.5);">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding:28px 32px; background:linear-gradient(135deg, #070b14 0%, #111c2e 100%); border-bottom:3px solid #22c55e;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display:inline-block; font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#22c55e; background-color:rgba(34,197,94,0.12); padding:4px 10px; border-radius:20px; border:1px solid rgba(34,197,94,0.25); font-family:ui-monospace,monospace;">
                      QA Quality Center · Instant Alert
                    </span>
                    <h1 style="margin:12px 0 4px; color:#f8fafc; font-size:22px; font-weight:700;">
                      New Portfolio Enquiry
                    </h1>
                    <p style="margin:0; color:#94a3b8; font-size:13px;">
                      Received on ${now} (IST)
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding:28px 32px; background-color:#0f172a;">
              
              <!-- Sender Overview Card -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#1e293b; border:1px solid #334155; border-radius:12px; margin-bottom:24px;">
                <tr>
                  <td style="padding:20px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td colspan="2" style="padding-bottom:14px;">
                          <span style="display:inline-block; font-size:12px; font-weight:600; padding:5px 12px; border-radius:6px; background-color:${badgeBg}; color:${badgeColor}; border:1px solid ${badgeBorder};">
                            🏷️ ${safeReason}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td width="130" style="padding:6px 0; font-size:13px; color:#94a3b8; font-weight:500;">Full Name</td>
                        <td style="padding:6px 0; font-size:15px; color:#f8fafc; font-weight:700;">${safeName}</td>
                      </tr>
                      <tr>
                        <td width="130" style="padding:6px 0; font-size:13px; color:#94a3b8; font-weight:500;">Email Address</td>
                        <td style="padding:6px 0; font-size:14px; font-weight:600;">
                          <a href="mailto:${safeEmail}" style="color:#38bdf8; text-decoration:none;">${safeEmail}</a>
                        </td>
                      </tr>
                      <tr>
                        <td width="130" style="padding:6px 0; font-size:13px; color:#94a3b8; font-weight:500;">Mobile Number</td>
                        <td style="padding:6px 0; font-size:14px; color:#f8fafc;">
                          ${safeMobile ? `<a href="tel:${safeMobile}" style="color:#22c55e; text-decoration:none; font-weight:600;">${safeMobile}</a>` : '<span style="color:#64748b; font-style:italic;">Not provided</span>'}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message Section -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
                <tr>
                  <td>
                    <div style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#94a3b8; margin-bottom:8px;">
                      Message Content
                    </div>
                    <div style="background-color:#1e293b; border-left:4px solid #22c55e; border-radius:0 10px 10px 0; padding:18px 20px; font-size:14px; line-height:1.7; color:#f1f5f9; white-space:pre-wrap;">${safeMessage}</div>
                  </td>
                </tr>
              </table>

              <!-- Action Buttons -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(reason)}%20-%20Shashank%20Shinde" style="display:inline-block; background-color:#22c55e; color:#052e16; font-size:13px; font-weight:700; text-decoration:none; padding:12px 24px; border-radius:8px; margin-right:12px; margin-bottom:8px;">
                      ✉️ Reply to ${safeName}
                    </a>
                    ${safeMobile ? `
                    <a href="tel:${safeMobile}" style="display:inline-block; background-color:#1e293b; color:#38bdf8; font-size:13px; font-weight:600; text-decoration:none; padding:12px 20px; border-radius:8px; border:1px solid #334155; margin-bottom:8px;">
                      📞 Call ${safeMobile}
                    </a>
                    ` : ""}
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Metadata -->
          <tr>
            <td style="background-color:#070b14; padding:20px 32px; border-top:1px solid #1e293b; text-align:center;">
              <p style="margin:0; font-size:12px; color:#64748b;">
                <strong>Shashank Shinde</strong> · Software Test Engineer & QA Automation<br />
                Stored in Supabase (<span style="color:#22c55e;">contact_messages</span>)
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };

  return await transporter.sendMail(mailOptions);
}
