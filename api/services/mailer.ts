import nodemailer from "nodemailer";

let _transporter: nodemailer.Transporter | null = null;

/**
 * Create/reuse Gmail SMTP transporter.
 */
export function getTransporter() {
  if (_transporter) return _transporter;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn(
      "[Mailer] GMAIL_USER or GMAIL_APP_PASSWORD is not configured."
    );
    return null;
  }

  _transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
      user,
      pass,
    },

    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });

  return _transporter;
}

/**
 * Escape user-controlled content before inserting into HTML.
 */
function escapeHtml(value: string | null | undefined): string {
  if (!value) return "";

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Keep only characters normally required for tel: URLs.
 */
function sanitizePhoneForHref(value: string | null | undefined): string {
  if (!value) return "";

  return String(value).replace(/[^\d+]/g, "");
}

/**
 * Send portfolio contact notification.
 */
export async function sendContactNotification(data: {
  full_name: string;
  email: string;
  mobile?: string | null;
  reason: string;
  message: string;
}) {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn(
      "[Mailer] Transporter unavailable. Email notification skipped."
    );
    return null;
  }

  const { full_name, email, mobile, reason, message } = data;

  // -------------------------------------------------------
  // DATE / TIME
  // -------------------------------------------------------

  const now = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // -------------------------------------------------------
  // SAFE HTML VALUES
  // -------------------------------------------------------

  const safeName = escapeHtml(full_name);
  const safeEmail = escapeHtml(email);
  const safeMobile = escapeHtml(mobile || "");
  const safeReason = escapeHtml(reason);
  const safeMessage = escapeHtml(message);

  const phoneHref = sanitizePhoneForHref(mobile);

  // mailto values should be URL encoded
  const replySubject = encodeURIComponent(
    `Re: ${reason} - Shashank Shinde`
  );

  // -------------------------------------------------------
  // BADGE STYLE
  // -------------------------------------------------------

  let badgeBg = "#172033";
  let badgeBorder = "#334155";
  let badgeColor = "#cbd5e1";

  const normalizedReason = reason.toLowerCase();

  if (normalizedReason.includes("job")) {
    badgeBg = "#0c2b1b";
    badgeBorder = "#166534";
    badgeColor = "#86efac";
  } else if (normalizedReason.includes("freelance")) {
    badgeBg = "#2a1333";
    badgeBorder = "#6b2179";
    badgeColor = "#f0abfc";
  } else if (normalizedReason.includes("consultation")) {
    badgeBg = "#30270d";
    badgeBorder = "#854d0e";
    badgeColor = "#fde68a";
  } else if (
    normalizedReason.includes("project") ||
    normalizedReason.includes("collaboration")
  ) {
    badgeBg = "#10263d";
    badgeBorder = "#075985";
    badgeColor = "#7dd3fc";
  }

  // -------------------------------------------------------
  // EMAIL
  // -------------------------------------------------------

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"Shashank Shinde | QA Portfolio" <${process.env.GMAIL_USER}>`,

    to:
      process.env.NOTIFICATION_EMAIL ||
      "shashankshinde38@gmail.com",

    replyTo: email,

    subject: `[Portfolio Enquiry] ${reason} — ${full_name}`,

    // -----------------------------------------------------
    // PLAIN TEXT FALLBACK
    // -----------------------------------------------------

    text: `
NEW PORTFOLIO ENQUIRY

Enquiry Type:
${reason}

Contact Details
------------------------------
Name: ${full_name}
Email: ${email}
Mobile: ${mobile || "Not provided"}

Message
------------------------------
${message}

Received:
${now} IST

This enquiry was submitted through the Shashank Shinde QA Portfolio
and stored in the Supabase enquiries database.
    `.trim(),

    // -----------------------------------------------------
    // HTML EMAIL
    // -----------------------------------------------------

    html: `
<!doctype html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
>
<head>

  <meta charset="utf-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  >

  <meta
    name="x-apple-disable-message-reformatting"
  >

  <meta
    name="format-detection"
    content="telephone=no,address=no,email=no,date=no,url=no"
  >

  <meta
    name="color-scheme"
    content="dark"
  >

  <meta
    name="supported-color-schemes"
    content="dark"
  >

  <title>New Portfolio Enquiry</title>

  <style>

    html,
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #070b14 !important;
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
    }

    a {
      text-decoration: none;
    }

    .mobile-only {
      display: none;
    }

    @media only screen and (max-width: 640px) {

      .email-wrapper {
        padding: 14px 8px !important;
      }

      .email-container {
        width: 100% !important;
        max-width: 100% !important;
      }

      .section-padding {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }

      .email-title {
        font-size: 23px !important;
        line-height: 30px !important;
      }

      .detail-label {
        display: block !important;
        width: 100% !important;
        padding: 6px 0 2px !important;
      }

      .detail-value {
        display: block !important;
        width: 100% !important;
        padding: 0 0 13px !important;
      }

      .action-button {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        text-align: center !important;
        margin: 0 0 10px !important;
      }

    }

  </style>

</head>

<body
  style="
    margin:0;
    padding:0;
    width:100%;
    background-color:#070b14;
    color:#f8fafc;
    font-family:-apple-system,
                BlinkMacSystemFont,
                'Segoe UI',
                Roboto,
                Helvetica,
                Arial,
                sans-serif;
  "
>

<!-- ===================================================== -->
<!-- PAGE WRAPPER -->
<!-- ===================================================== -->

<table
  role="presentation"
  width="100%"
  border="0"
  cellspacing="0"
  cellpadding="0"
  class="email-wrapper"
  style="
    width:100%;
    background-color:#070b14;
    padding:36px 16px;
  "
>

<tr>

<td align="center">

<!-- ===================================================== -->
<!-- MAIN EMAIL CONTAINER -->
<!-- ===================================================== -->

<table
  role="presentation"
  width="620"
  border="0"
  cellspacing="0"
  cellpadding="0"
  class="email-container"
  style="
    width:100%;
    max-width:620px;
    background-color:#0f172a;
    border:1px solid #1e293b;
    border-radius:18px;
    overflow:hidden;
  "
>

<!-- ===================================================== -->
<!-- TOP ACCENT -->
<!-- ===================================================== -->

<tr>
  <td
    height="4"
    style="
      height:4px;
      background-color:#22c55e;
      font-size:0;
      line-height:0;
    "
  >
    &nbsp;
  </td>
</tr>

<!-- ===================================================== -->
<!-- HEADER -->
<!-- ===================================================== -->

<tr>

<td
  class="section-padding"
  style="
    padding:30px 34px 27px;
    background-color:#0b1220;
    border-bottom:1px solid #1e293b;
  "
>

<table
  role="presentation"
  width="100%"
  cellspacing="0"
  cellpadding="0"
  border="0"
>

<tr>

<td>

<!-- Brand Badge -->

<table
  role="presentation"
  cellspacing="0"
  cellpadding="0"
  border="0"
>

<tr>

<td
  style="
    padding:6px 11px;
    border-radius:20px;
    background-color:#0b2518;
    border:1px solid #14532d;
    color:#4ade80;
    font-size:10px;
    line-height:14px;
    font-weight:700;
    letter-spacing:1.3px;
    text-transform:uppercase;
  "
>
  QA PORTFOLIO · CONTACT CENTER
</td>

</tr>

</table>


<h1
  class="email-title"
  style="
    margin:16px 0 5px;
    padding:0;
    color:#f8fafc;
    font-size:26px;
    line-height:34px;
    font-weight:750;
    letter-spacing:-0.4px;
  "
>
  New Portfolio Enquiry
</h1>


<p
  style="
    margin:0;
    padding:0;
    color:#94a3b8;
    font-size:13px;
    line-height:21px;
  "
>
  Someone has submitted a new enquiry through your
  professional portfolio.
</p>


<p
  style="
    margin:8px 0 0;
    padding:0;
    color:#64748b;
    font-size:11px;
    line-height:18px;
  "
>
  ${now} IST
</p>

</td>

</tr>

</table>

</td>

</tr>

<!-- ===================================================== -->
<!-- BODY -->
<!-- ===================================================== -->

<tr>

<td
  class="section-padding"
  style="
    padding:30px 34px 34px;
    background-color:#0f172a;
  "
>

<!-- ===================================================== -->
<!-- ENQUIRY TYPE -->
<!-- ===================================================== -->

<table
  role="presentation"
  width="100%"
  cellspacing="0"
  cellpadding="0"
  border="0"
  style="
    margin-bottom:22px;
  "
>

<tr>

<td>

<p
  style="
    margin:0 0 8px;
    padding:0;
    color:#64748b;
    font-size:10px;
    line-height:15px;
    font-weight:700;
    letter-spacing:1.3px;
    text-transform:uppercase;
  "
>
  Enquiry Type
</p>


<table
  role="presentation"
  cellspacing="0"
  cellpadding="0"
  border="0"
>

<tr>

<td
  style="
    padding:7px 12px;
    background-color:${badgeBg};
    border:1px solid ${badgeBorder};
    border-radius:7px;
    color:${badgeColor};
    font-size:12px;
    line-height:17px;
    font-weight:700;
  "
>
  ${safeReason}
</td>

</tr>

</table>

</td>

</tr>

</table>


<!-- ===================================================== -->
<!-- CONTACT DETAILS CARD -->
<!-- ===================================================== -->

<table
  role="presentation"
  width="100%"
  cellspacing="0"
  cellpadding="0"
  border="0"
  style="
    width:100%;
    background-color:#111c2e;
    border:1px solid #263447;
    border-radius:12px;
    margin-bottom:25px;
  "
>

<tr>

<td
  style="
    padding:22px;
  "
>

<p
  style="
    margin:0 0 15px;
    padding:0;
    color:#f8fafc;
    font-size:15px;
    line-height:22px;
    font-weight:700;
  "
>
  Contact Details
</p>


<table
  role="presentation"
  width="100%"
  cellspacing="0"
  cellpadding="0"
  border="0"
>

<!-- Name -->

<tr>

<td
  width="135"
  valign="top"
  class="detail-label"
  style="
    width:135px;
    padding:8px 15px 11px 0;
    color:#64748b;
    font-size:12px;
    line-height:19px;
    font-weight:600;
  "
>
  Full Name
</td>

<td
  valign="top"
  class="detail-value"
  style="
    padding:8px 0 11px;
    color:#f8fafc;
    font-size:14px;
    line-height:20px;
    font-weight:700;
  "
>
  ${safeName}
</td>

</tr>


<!-- Email -->

<tr>

<td
  width="135"
  valign="top"
  class="detail-label"
  style="
    width:135px;
    padding:8px 15px 11px 0;
    color:#64748b;
    font-size:12px;
    line-height:19px;
    font-weight:600;
  "
>
  Email Address
</td>

<td
  valign="top"
  class="detail-value"
  style="
    padding:8px 0 11px;
    font-size:14px;
    line-height:20px;
  "
>

<a
  href="mailto:${safeEmail}"
  style="
    color:#38bdf8;
    font-weight:600;
    text-decoration:none;
    word-break:break-word;
  "
>
  ${safeEmail}
</a>

</td>

</tr>


<!-- Phone -->

<tr>

<td
  width="135"
  valign="top"
  class="detail-label"
  style="
    width:135px;
    padding:8px 15px 5px 0;
    color:#64748b;
    font-size:12px;
    line-height:19px;
    font-weight:600;
  "
>
  Mobile Number
</td>

<td
  valign="top"
  class="detail-value"
  style="
    padding:8px 0 5px;
    color:#f8fafc;
    font-size:14px;
    line-height:20px;
  "
>

${safeMobile && phoneHref
        ? `
<a
  href="tel:${phoneHref}"
  style="
    color:#4ade80;
    font-weight:600;
    text-decoration:none;
  "
>
  ${safeMobile}
</a>
`
        : `
<span
  style="
    color:#64748b;
    font-style:italic;
  "
>
  Not provided
</span>
`
      }

</td>

</tr>

</table>

</td>

</tr>

</table>


<!-- ===================================================== -->
<!-- MESSAGE -->
<!-- ===================================================== -->

<table
  role="presentation"
  width="100%"
  cellspacing="0"
  cellpadding="0"
  border="0"
  style="
    margin-bottom:26px;
  "
>

<tr>

<td>

<p
  style="
    margin:0 0 8px;
    padding:0;
    color:#64748b;
    font-size:10px;
    line-height:15px;
    font-weight:700;
    letter-spacing:1.3px;
    text-transform:uppercase;
  "
>
  Message
</p>


<table
  role="presentation"
  width="100%"
  cellspacing="0"
  cellpadding="0"
  border="0"
  style="
    width:100%;
    background-color:#111c2e;
    border:1px solid #263447;
    border-radius:10px;
  "
>

<tr>

<td
  width="4"
  style="
    width:4px;
    background-color:#22c55e;
    font-size:0;
    line-height:0;
  "
>
  &nbsp;
</td>

<td
  style="
    padding:19px 20px;
    color:#e2e8f0;
    font-size:14px;
    line-height:23px;
    word-break:break-word;
  "
>
  ${safeMessage.replace(/\n/g, "<br>")}
</td>

</tr>

</table>

</td>

</tr>

</table>


<!-- ===================================================== -->
<!-- QUICK ACTIONS -->
<!-- ===================================================== -->

<p
  style="
    margin:0 0 10px;
    padding:0;
    color:#64748b;
    font-size:10px;
    line-height:15px;
    font-weight:700;
    letter-spacing:1.3px;
    text-transform:uppercase;
  "
>
  Quick Actions
</p>


<table
  role="presentation"
  width="100%"
  cellspacing="0"
  cellpadding="0"
  border="0"
>

<tr>

<td>

<!-- Reply Button -->

<a
  href="mailto:${safeEmail}?subject=${replySubject}"
  class="action-button"
  style="
    display:inline-block;
    margin:0 8px 8px 0;
    padding:12px 21px;
    background-color:#22c55e;
    border:1px solid #22c55e;
    border-radius:8px;
    color:#052e16;
    font-size:13px;
    line-height:18px;
    font-weight:700;
    text-align:center;
    text-decoration:none;
  "
>
  Reply to ${safeName}
</a>


${safeMobile && phoneHref
        ? `
<a
  href="tel:${phoneHref}"
  class="action-button"
  style="
    display:inline-block;
    margin:0 0 8px;
    padding:12px 21px;
    background-color:#111c2e;
    border:1px solid #334155;
    border-radius:8px;
    color:#38bdf8;
    font-size:13px;
    line-height:18px;
    font-weight:700;
    text-align:center;
    text-decoration:none;
  "
>
  Call ${safeMobile}
</a>
`
        : ""
      }

</td>

</tr>

</table>

</td>

</tr>

<!-- ===================================================== -->
<!-- SECURITY INFO -->
<!-- ===================================================== -->

<tr>

<td
  class="section-padding"
  style="
    padding:17px 34px;
    background-color:#0c1424;
    border-top:1px solid #1e293b;
  "
>

<table
  role="presentation"
  width="100%"
  cellspacing="0"
  cellpadding="0"
  border="0"
>

<tr>

<td
  width="10"
  valign="top"
  style="
    width:10px;
    padding-top:5px;
  "
>

<div
  style="
    width:7px;
    height:7px;
    background-color:#22c55e;
    border-radius:50%;
  "
></div>

</td>

<td
  style="
    padding-left:7px;
    color:#64748b;
    font-size:10px;
    line-height:17px;
  "
>
  Enquiry successfully captured and stored in the
  <span style="color:#94a3b8;font-weight:600;">
    Supabase enquiries
  </span>
  database.
</td>

</tr>

</table>

</td>

</tr>

<!-- ===================================================== -->
<!-- FOOTER -->
<!-- ===================================================== -->

<tr>

<td
  class="section-padding"
  align="center"
  style="
    padding:23px 34px 25px;
    background-color:#080d16;
    border-top:1px solid #172033;
    text-align:center;
  "
>

<p
  style="
    margin:0 0 4px;
    padding:0;
    color:#e2e8f0;
    font-size:12px;
    line-height:18px;
    font-weight:700;
  "
>
  Shashank Shinde
</p>


<p
  style="
    margin:0;
    padding:0;
    color:#64748b;
    font-size:11px;
    line-height:18px;
  "
>
  Software Test Engineer · QA Automation
</p>


<p
  style="
    margin:9px 0 0;
    padding:0;
    color:#475569;
    font-size:10px;
    line-height:16px;
  "
>
  Automated notification from Shashank Shinde's
  professional portfolio.
</p>

</td>

</tr>

</table>
<!-- END MAIN EMAIL -->

</td>

</tr>

</table>
<!-- END WRAPPER -->

</body>
</html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log(
      `[Mailer] Portfolio enquiry notification sent: ${info.messageId}`
    );

    return info;
  } catch (error) {
    console.error(
      "[Mailer] Failed to send portfolio enquiry notification:",
      error
    );

    throw error;
  }
}