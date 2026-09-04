const nodemailer = require("nodemailer");
const dns = require("dns").promises;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config();

let _transporter = null;

async function getTransporter() {
  if (_transporter) return _transporter;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  console.log(`[Mailer] GMAIL_USER = ${user || "NOT SET"}`);
  console.log(
    `[Mailer] GMAIL_APP_PASSWORD = ${pass ? "****" + pass.slice(-4) : "NOT SET"
    }`
  );

  if (!user || !pass) {
    throw new Error("Missing GMAIL_USER or GMAIL_APP_PASSWORD");
  }

  let smtpHost = "smtp.gmail.com";
  try {
    const { address } = await dns.lookup("smtp.gmail.com", { family: 4 });
    console.log(`[Mailer] Resolved smtp.gmail.com to IPv4: ${address}`);
    smtpHost = address;
  } catch (dnsErr) {
    console.warn(`[Mailer] DNS lookup failed, falling back to hostname: ${dnsErr.message}`);
  }

  _transporter = nodemailer.createTransport({
    host: smtpHost,
    port: 587,
    secure: false,
    auth: {
      user,
      pass,
    },

    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,

    tls: {
      servername: "smtp.gmail.com",
      rejectUnauthorized: false,
      minVersion: "TLSv1.2",
    },
  });

  return _transporter;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Send email notification for a new contact enquiry.
 */
async function sendContactNotification(data) {
  const transporter = await getTransporter();

  if (!transporter) {
    console.error("✕ Skipping email — transporter not configured");
    return;
  }

  const { full_name, email, mobile, reason, message, record_id } = data;

  // Format current IST date/time
  const now = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium",
  });

  const safeName = escapeHtml(full_name);
  const safeEmail = escapeHtml(email);
  const safeMobile = escapeHtml(mobile);
  const safeReason = escapeHtml(reason);
  const safeMessage = escapeHtml(message);

  // Badge color based on reason
  let badgeBg = "#eff6ff";
  let badgeBorder = "#bfdbfe";
  let badgeColor = "#1d4ed8";
  if (reason && reason.toLowerCase().includes("job")) {
    badgeBg = "#f0fdf4";
    badgeBorder = "#bbf7d0";
    badgeColor = "#15803d";
  } else if (reason && reason.toLowerCase().includes("freelance")) {
    badgeBg = "#fdf4ff";
    badgeBorder = "#f5d0fe";
    badgeColor = "#86198f";
  } else if (reason && reason.toLowerCase().includes("consultation")) {
    badgeBg = "#fefce8";
    badgeBorder = "#fef08a";
    badgeColor = "#854d0e";
  }

  const mailOptions = {
    from: `"Shashank Shinde Portfolio" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFICATION_EMAIL || "shashankshinde38@gmail.com",
    replyTo: email,
    subject: `🔔 [Portfolio] ${reason} from ${full_name}`,
    text: `New Portfolio Inquiry

From: ${full_name}
Email: ${email}
Mobile: ${mobile || "Not provided"}
Reason: ${reason}
Date: ${now} IST

Message:
----------------------------------------
${message}
----------------------------------------

Quick Reply: mailto:${email}
Stored in Supabase table: contact_messages
    `.trim(),
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #070b14 0%, #111c2e 100%); padding: 28px 32px; border-bottom: 3px solid #22c55e;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #22c55e; background-color: rgba(34, 197, 94, 0.12); padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(34, 197, 94, 0.25); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
                      QA Command Center · Contact Alert
                    </span>
                    <h1 style="margin: 12px 0 4px 0; color: #f8fafc; font-size: 22px; font-weight: 700; line-height: 1.3;">
                      New Portfolio Enquiry
                    </h1>
                    <p style="margin: 0; color: #94a3b8; font-size: 13px;">
                      Received on ${now} (IST)
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 28px 32px;">
              
              <!-- Sender Overview Card -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      
                      <!-- Category Pill -->
                      <tr>
                        <td colspan="2" style="padding-bottom: 14px;">
                          <span style="display: inline-block; font-size: 12px; font-weight: 600; padding: 5px 12px; border-radius: 6px; background-color: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder};">
                            🏷️ ${safeReason}
                          </span>
                        </td>
                      </tr>

                      <!-- Name -->
                      <tr>
                        <td width="130" style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 500; vertical-align: top;">
                          Full Name
                        </td>
                        <td style="padding: 6px 0; font-size: 15px; color: #0f172a; font-weight: 700;">
                          ${safeName}
                        </td>
                      </tr>

                      <!-- Email -->
                      <tr>
                        <td width="130" style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 500; vertical-align: top;">
                          Email Address
                        </td>
                        <td style="padding: 6px 0; font-size: 14px; font-weight: 600;">
                          <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">
                            ${safeEmail}
                          </a>
                        </td>
                      </tr>

                      <!-- Mobile -->
                      <tr>
                        <td width="130" style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 500; vertical-align: top;">
                          Mobile Number
                        </td>
                        <td style="padding: 6px 0; font-size: 14px; color: #334155;">
                          ${safeMobile ? `<a href="tel:${safeMobile}" style="color: #0f172a; text-decoration: none; font-weight: 600;">${safeMobile}</a>` : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message Section -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td>
                    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #475569; margin-bottom: 8px;">
                      Message Content
                    </div>
                    <div style="background-color: #ffffff; border-left: 4px solid #22c55e; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; border-radius: 0 10px 10px 0; padding: 18px 20px; font-size: 14px; line-height: 1.7; color: #1e293b; white-space: pre-wrap; font-family: inherit;">${safeMessage}</div>
                  </td>
                </tr>
              </table>

              <!-- Action Buttons -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 8px; margin-bottom: 8px;">
                <tr>
                  <td align="left">
                    <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(reason)}%20-%20Shashank%20Shinde" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; box-shadow: 0 2px 6px rgba(15, 23, 42, 0.2); margin-right: 12px; margin-bottom: 8px;">
                      ✉️ Reply to ${safeName}
                    </a>
                    ${safeMobile ? `
                    <a href="tel:${safeMobile}" style="display: inline-block; background-color: #f1f5f9; color: #0f172a; font-size: 13px; font-weight: 600; text-decoration: none; padding: 12px 20px; border-radius: 8px; border: 1px solid #cbd5e1; margin-bottom: 8px;">
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
            <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-size: 12px; color: #64748b; line-height: 1.6;">
                    <strong>Shashank Shinde</strong> · Software Test Engineer & QA Automation<br />
                    Data securely stored in <span style="font-family: monospace; color: #0f172a;">Supabase (contact_messages)</span>
                  </td>
                </tr>
              </table>
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

  console.log(`[Mailer] Sending notification to ${mailOptions.to}...`);
  const info = await transporter.sendMail(mailOptions);
  console.log("[Mailer] ✓ Notification email sent — messageId:", info.messageId);
  return info;
}

module.exports = { sendContactNotification };
