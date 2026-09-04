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
<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>New Portfolio Enquiry</title>

  <style>
    html,
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background: #eef2f7;
    }

    table,
    td {
      border-collapse: collapse !important;
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }

    img {
      display: block;
      border: 0;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    a {
      text-decoration: none;
    }

    @media only screen and (max-width: 640px) {
      .email-shell {
        padding: 16px 10px !important;
      }

      .email-card {
        border-radius: 14px !important;
      }

      .content-pad {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }

      .header-pad {
        padding: 26px 20px 24px !important;
      }

      .hero-title {
        font-size: 25px !important;
        line-height: 32px !important;
      }

      .mobile-block {
        display: block !important;
        width: 100% !important;
      }

      .mobile-hide {
        display: none !important;
      }

      .contact-copy {
        padding: 14px 0 0 !important;
      }

      .detail-label,
      .detail-value {
        display: block !important;
        width: 100% !important;
      }

      .detail-label {
        padding: 0 0 3px !important;
      }

      .detail-value {
        padding: 0 0 14px !important;
      }

      .button-cell {
        display: block !important;
        width: 100% !important;
        padding: 0 0 10px !important;
      }

      .action-button {
        display: block !important;
        box-sizing: border-box !important;
        width: 100% !important;
        text-align: center !important;
      }
    }
  </style>

  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>

<body style="margin:0; padding:0; width:100%; background-color:#eef2f7; color:#172033; -webkit-font-smoothing:antialiased; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">

  <!-- Hidden inbox preview text -->
  <div style="display:none; overflow:hidden; visibility:hidden; opacity:0; color:transparent; height:0; width:0; max-height:0; max-width:0; mso-hide:all;">
    ${safeName} submitted a ${safeReason} enquiry through your portfolio.
    &#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;
  </div>

  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%; background-color:#eef2f7;">
    <tr>
      <td class="email-shell" align="center" style="padding:36px 16px;">

        <!--[if mso]>
        <table role="presentation" width="640" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>
        <![endif]-->

        <table class="email-card" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%; max-width:640px; background-color:#ffffff; border:1px solid #dfe6ef; border-radius:18px; overflow:hidden; box-shadow:0 12px 36px rgba(15,23,42,0.08);">

          <!-- Brand accent -->
          <tr>
            <td height="5" style="height:5px; background-color:#22c55e; font-size:0; line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td class="header-pad" style="padding:30px 34px 28px; background-color:#08111f; background-image:linear-gradient(135deg,#08111f 0%,#10233d 100%);">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td valign="middle">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="42" height="42" align="center" valign="middle" style="width:42px; height:42px; border-radius:12px; background-color:#22c55e; color:#052e16; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:800; letter-spacing:-0.3px;">
                          SS
                        </td>
                        <td style="padding-left:12px; font-family:Arial,Helvetica,sans-serif;">
                          <div style="color:#ffffff; font-size:14px; line-height:19px; font-weight:700;">Shashank Shinde</div>
                          <div style="color:#91a1b8; font-size:11px; line-height:17px; font-weight:600; letter-spacing:1.1px; text-transform:uppercase;">QA Portfolio</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td class="mobile-hide" align="right" valign="middle" style="font-family:Arial,Helvetica,sans-serif;">
                    <span style="display:inline-block; padding:7px 11px; border:1px solid #2a3b52; border-radius:999px; color:#9fb0c7; font-size:10px; line-height:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">
                      Contact alert
                    </span>
                  </td>
                </tr>
              </table>

              <div style="height:25px; line-height:25px;">&nbsp;</div>

              <div style="font-family:Arial,Helvetica,sans-serif; color:#3ce982; font-size:11px; line-height:16px; font-weight:800; letter-spacing:1.35px; text-transform:uppercase;">
                New portfolio enquiry
              </div>
              <h1 class="hero-title" style="margin:7px 0 8px; color:#f8fafc; font-family:Arial,Helvetica,sans-serif; font-size:29px; line-height:36px; font-weight:760; letter-spacing:-0.6px;">
                A new opportunity just landed.
              </h1>
              <p style="margin:0; color:#a8b5c7; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:22px;">
                Review the enquiry below and follow up while the conversation is fresh.
              </p>
            </td>
          </tr>

          <!-- Received status -->
          <tr>
            <td class="content-pad" style="padding:22px 34px 0; background-color:#ffffff;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px;">
                <tr>
                  <td width="36" align="center" valign="middle" style="padding:12px 0 12px 14px;">
                    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:#22c55e;">&nbsp;</span>
                  </td>
                  <td valign="middle" style="padding:11px 14px 11px 8px; color:#166534; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:18px; font-weight:700;">
                    Successfully received <span style="color:#4b5563; font-weight:500;">&nbsp;·&nbsp; ${now} IST</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td class="content-pad" style="padding:24px 34px 32px; background-color:#ffffff;">

              <!-- Sender card -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%; background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:14px;">
                <tr>
                  <td style="padding:21px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td class="mobile-block" width="64" valign="top" style="width:64px;">
                          <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td width="52" height="52" align="center" valign="middle" style="width:52px; height:52px; border-radius:50%; background-color:#dcfce7; border:1px solid #bbf7d0; color:#15803d; font-family:Arial,Helvetica,sans-serif; font-size:20px; line-height:52px; font-weight:800;">
                                ${safeName.charAt(0).toUpperCase()}
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td class="mobile-block contact-copy" valign="top" style="padding-left:4px; font-family:Arial,Helvetica,sans-serif;">
                          <div style="color:#667085; font-size:11px; line-height:16px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">
                            Enquiry from
                          </div>
                          <div style="padding-top:2px; color:#101828; font-size:20px; line-height:27px; font-weight:750;">
                            ${safeName}
                          </div>
                          <div style="padding-top:9px;">
                            <span style="display:inline-block; padding:5px 10px; border-radius:999px; background-color:${badgeBg}; border:1px solid ${badgeBorder}; color:${badgeColor}; font-size:11px; line-height:15px; font-weight:700;">
                              ${safeReason}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <div style="height:18px; line-height:18px;">&nbsp;</div>

                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top:1px solid #e2e8f0;">
                      <tr>
                        <td class="detail-label" width="126" valign="top" style="width:126px; padding:17px 12px 9px 0; color:#667085; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:18px; font-weight:600;">
                          Email address
                        </td>
                        <td class="detail-value" valign="top" style="padding:17px 0 9px; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:18px; font-weight:700; word-break:break-word;">
                          <a href="mailto:${safeEmail}" style="color:#2563eb; text-decoration:none;">${safeEmail}</a>
                        </td>
                      </tr>
                      <tr>
                        <td class="detail-label" width="126" valign="top" style="width:126px; padding:9px 12px 0 0; color:#667085; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:18px; font-weight:600;">
                          Mobile number
                        </td>
                        <td class="detail-value" valign="top" style="padding:9px 0 0; color:#101828; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:18px; font-weight:700; word-break:break-word;">
                          ${safeMobile ? `<a href="tel:${safeMobile}" style="color:#101828; text-decoration:none;">${safeMobile}</a>` : '<span style="color:#98a2b3; font-weight:500; font-style:italic;">Not provided</span>'}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <div style="height:24px; line-height:24px;">&nbsp;</div>

              <!-- Message -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom:9px; color:#475467; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:16px; font-weight:800; letter-spacing:1px; text-transform:uppercase;">
                    Their message
                  </td>
                </tr>
                <tr>
                  <td style="border:1px solid #dfe6ef; border-left:4px solid #22c55e; border-radius:10px; background-color:#ffffff; padding:18px 19px; color:#27364b; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:23px; white-space:pre-wrap; word-break:break-word;">${safeMessage}</td>
                </tr>
              </table>

              <div style="height:24px; line-height:24px;">&nbsp;</div>

              <!-- Actions -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="button-cell" valign="top" style="padding-right:10px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" style="border-radius:9px; background-color:#111827;">
                          <a class="action-button" href="mailto:${safeEmail}?subject=Re%3A%20${encodeURIComponent(reason)}%20%E2%80%94%20Shashank%20Shinde" aria-label="Reply to ${safeName} by email" style="display:inline-block; box-sizing:border-box; width:100%; padding:13px 20px; border:1px solid #111827; border-radius:9px; color:#ffffff; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:18px; font-weight:750; text-align:center;">
                            Reply by email&nbsp;&nbsp;&rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>

                  ${safeMobile ? `
                  <td class="button-cell" width="43%" valign="top" style="width:43%;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" style="border-radius:9px; background-color:#f8fafc;">
                          <a class="action-button" href="tel:${safeMobile}" aria-label="Call ${safeName}" style="display:inline-block; box-sizing:border-box; width:100%; padding:13px 18px; border:1px solid #cfd8e5; border-radius:9px; color:#172033; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:18px; font-weight:750; text-align:center;">
                            Call ${safeName}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                  ` : ''}
                </tr>
              </table>

              <p style="margin:13px 0 0; color:#98a2b3; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:17px; text-align:center;">
                Tip: A quick, personalized response creates a stronger first impression.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="content-pad" style="padding:21px 34px 23px; border-top:1px solid #e2e8f0; background-color:#f8fafc; text-align:center;">
              <p style="margin:0; color:#344054; font-family:Arial,Helvetica,sans-serif; font-size:12px; line-height:19px; font-weight:700;">
                Shashank Shinde
              </p>
              <p style="margin:1px 0 0; color:#667085; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:18px;">
                Software Test Engineer &amp; QA Automation
              </p>
              <p style="margin:9px 0 0; color:#98a2b3; font-family:Arial,Helvetica,sans-serif; font-size:10px; line-height:16px;">
                Automated notification from your portfolio contact form. Keep this email private.
              </p>
            </td>
          </tr>
        </table>

        <!--[if mso]>
            </td>
          </tr>
        </table>
        <![endif]-->

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
