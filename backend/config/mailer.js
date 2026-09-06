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
  console.log(`[Mailer] GMAIL_APP_PASSWORD = ${pass ? "SET" : "NOT SET"}`);

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
Stored in the secure Supabase enquiries inbox
    `.trim(),
    html: `
<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta
    name="format-detection"
    content="telephone=no,address=no,email=no,date=no,url=no"
  >
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">

  <title>New Portfolio Enquiry</title>

  <style>
    html,
    body {
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      background-color: #edf2f7;
    }

    table,
    td {
      border-collapse: collapse !important;
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }

    a {
      text-decoration: none;
    }

    @media only screen and (max-width: 640px) {
      .outer-pad {
        padding: 14px 8px !important;
      }

      .email-card {
        border-radius: 14px !important;
      }

      .header-pad {
        padding: 25px 21px 27px !important;
      }

      .body-pad,
      .footer-pad {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }

      .hero-title {
        font-size: 27px !important;
        line-height: 34px !important;
        letter-spacing: -0.5px !important;
      }

      .desktop-only {
        display: none !important;
      }

      .mobile-block {
        display: block !important;
        width: 100% !important;
      }

      .identity-copy {
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
        padding: 0 0 16px !important;
      }

      .action-cell {
        display: block !important;
        width: 100% !important;
        padding: 0 0 10px !important;
      }

      .action-link {
        display: block !important;
        box-sizing: border-box !important;
        width: 100% !important;
        text-align: center !important;
      }

      .status-cell {
        display: block !important;
        width: 100% !important;
        border-right: 0 !important;
      }

      .status-cell + .status-cell {
        border-top: 1px solid #263a54 !important;
      }

      .footer-meta {
        padding-top: 8px !important;
        text-align: left !important;
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

<body
  style="
    width:100%;
    margin:0;
    padding:0;
    background-color:#edf2f7;
    color:#101828;
    -webkit-font-smoothing:antialiased;
    -webkit-text-size-adjust:100%;
    -ms-text-size-adjust:100%;
  "
>

  <!-- PREVIEW TEXT -->
  <div
    style="
      display:none;
      visibility:hidden;
      overflow:hidden;
      opacity:0;
      color:transparent;
      width:0;
      height:0;
      max-width:0;
      max-height:0;
      mso-hide:all;
    "
  >
    New ${safeReason} enquiry from ${safeName}. Review the message and respond directly.
    &#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;
  </div>

  <!-- PAGE BACKGROUND -->
  <table
    role="presentation"
    width="100%"
    border="0"
    cellspacing="0"
    cellpadding="0"
    style="
      width:100%;
      background-color:#edf2f7;
    "
  >
    <tr>
      <td
        class="outer-pad"
        align="center"
        style="padding:38px 16px;"
      >

        <!--[if mso]>
        <table role="presentation" width="640" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>
        <![endif]-->

        <!-- MAIN EMAIL -->
        <table
          class="email-card"
          role="presentation"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="
            width:100%;
            max-width:640px;
            overflow:hidden;
            background-color:#ffffff;
            border:1px solid #dce4ee;
            border-radius:18px;
            box-shadow:0 18px 45px rgba(16,24,40,0.09);
          "
        >

          <!-- GREEN TOP RAIL -->
          <tr>
            <td
              height="5"
              style="
                height:5px;
                background-color:#22c55e;
                font-size:0;
                line-height:0;
              "
            >
              &nbsp;
            </td>
          </tr>

          <!-- ================================================= -->
          <!-- HEADER -->
          <!-- ================================================= -->

          <tr>
            <td
              class="header-pad"
              style="
                padding:29px 35px 31px;
                background-color:#07111f;
                background-image:linear-gradient(
                  135deg,
                  #07111f 0%,
                  #0d2038 100%
                );
              "
            >

              <!-- BRAND ROW -->
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
              >
                <tr>

                  <td valign="middle">

                    <table
                      role="presentation"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tr>

                        <!-- LOGO -->
                        <td
                          width="42"
                          height="42"
                          align="center"
                          valign="middle"
                          style="
                            width:42px;
                            height:42px;
                            background-color:#22c55e;
                            border-radius:12px;
                            color:#052e16;
                            font-family:Arial,Helvetica,sans-serif;
                            font-size:15px;
                            line-height:42px;
                            font-weight:800;
                            letter-spacing:-0.3px;
                          "
                        >
                          SS
                        </td>

                        <td
                          style="
                            padding-left:12px;
                            font-family:Arial,Helvetica,sans-serif;
                          "
                        >

                          <div
                            style="
                              color:#f8fafc;
                              font-size:14px;
                              line-height:19px;
                              font-weight:700;
                            "
                          >
                            Shashank Shinde
                          </div>

                          <div
                            style="
                              color:#8fa1b9;
                              font-family:'Courier New',Courier,monospace;
                              font-size:10px;
                              line-height:17px;
                              font-weight:700;
                              letter-spacing:1px;
                              text-transform:uppercase;
                            "
                          >
                            QA Command Center
                          </div>

                        </td>

                      </tr>
                    </table>

                  </td>

                  <!-- STATUS -->
                  <td
                    class="desktop-only"
                    align="right"
                    valign="middle"
                  >

                    <table
                      role="presentation"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tr>

                        <td
                          width="8"
                          height="8"
                          style="
                            width:8px;
                            height:8px;
                            border-radius:50%;
                            background-color:#3ce982;
                            font-size:0;
                            line-height:0;
                          "
                        >
                          &nbsp;
                        </td>

                        <td
                          style="
                            padding-left:8px;
                            color:#a6b6ca;
                            font-family:'Courier New',Courier,monospace;
                            font-size:10px;
                            line-height:15px;
                            font-weight:700;
                            letter-spacing:0.7px;
                            text-transform:uppercase;
                          "
                        >
                          New lead detected
                        </td>

                      </tr>
                    </table>

                  </td>

                </tr>
              </table>

              <div style="height:28px;line-height:28px;">
                &nbsp;
              </div>

              <!-- EYEBROW -->
              <div
                style="
                  color:#3ce982;
                  font-family:'Courier New',Courier,monospace;
                  font-size:10px;
                  line-height:16px;
                  font-weight:700;
                  letter-spacing:1.4px;
                  text-transform:uppercase;
                "
              >
                Portfolio / Contact enquiry
              </div>

              <!-- TITLE -->
              <h1
                class="hero-title"
                style="
                  margin:7px 0 9px;
                  color:#ffffff;
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:31px;
                  line-height:39px;
                  font-weight:700;
                  letter-spacing:-0.8px;
                "
              >
                New enquiry received.
              </h1>

              <p
                style="
                  max-width:500px;
                  margin:0;
                  color:#a8b7ca;
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:14px;
                  line-height:22px;
                "
              >
                Someone viewed your work and started a conversation.
                The complete enquiry is ready for your review.
              </p>

              <div style="height:25px;line-height:25px;">
                &nbsp;
              </div>

              <!-- STATUS PANEL -->
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  width:100%;
                  border:1px solid #263a54;
                  border-radius:11px;
                  background-color:#0b192b;
                "
              >
                <tr>

                  <td
                    class="status-cell"
                    width="50%"
                    valign="top"
                    style="
                      width:50%;
                      padding:13px 15px;
                      border-right:1px solid #263a54;
                    "
                  >

                    <div
                      style="
                        color:#8091a8;
                        font-family:'Courier New',Courier,monospace;
                        font-size:9px;
                        line-height:14px;
                        font-weight:700;
                        letter-spacing:1.1px;
                        text-transform:uppercase;
                      "
                    >
                      Status
                    </div>

                    <div
                      style="
                        padding-top:2px;
                        color:#dcfce7;
                        font-family:Arial,Helvetica,sans-serif;
                        font-size:12px;
                        line-height:18px;
                        font-weight:700;
                      "
                    >
                      Awaiting your reply
                    </div>

                  </td>

                  <td
                    class="status-cell"
                    width="50%"
                    valign="top"
                    style="
                      width:50%;
                      padding:13px 15px;
                    "
                  >

                    <div
                      style="
                        color:#8091a8;
                        font-family:'Courier New',Courier,monospace;
                        font-size:9px;
                        line-height:14px;
                        font-weight:700;
                        letter-spacing:1.1px;
                        text-transform:uppercase;
                      "
                    >
                      Received
                    </div>

                    <div
                      style="
                        padding-top:2px;
                        color:#f1f5f9;
                        font-family:Arial,Helvetica,sans-serif;
                        font-size:12px;
                        line-height:18px;
                        font-weight:700;
                      "
                    >
                      ${now} IST
                    </div>

                  </td>

                </tr>
              </table>

            </td>
          </tr>

          <!-- ================================================= -->
          <!-- BODY -->
          <!-- ================================================= -->

          <tr>
            <td
              class="body-pad"
              style="
                padding:29px 35px 34px;
                background-color:#ffffff;
              "
            >

              <!-- SECTION 01 -->
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
              >
                <tr>

                  <td
                    width="30"
                    valign="middle"
                    style="
                      width:30px;
                      color:#16a34a;
                      font-family:'Courier New',Courier,monospace;
                      font-size:11px;
                      line-height:16px;
                      font-weight:700;
                    "
                  >
                    01
                  </td>

                  <td
                    valign="middle"
                    style="
                      color:#475467;
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:11px;
                      line-height:16px;
                      font-weight:700;
                      letter-spacing:1.1px;
                      text-transform:uppercase;
                    "
                  >
                    Lead details
                  </td>

                  <td
                    valign="middle"
                    style="padding-left:14px;"
                  >
                    <div
                      style="
                        height:1px;
                        background-color:#e4eaf1;
                        font-size:0;
                        line-height:0;
                      "
                    >
                      &nbsp;
                    </div>
                  </td>

                </tr>
              </table>

              <div style="height:13px;line-height:13px;">
                &nbsp;
              </div>

              <!-- LEAD CARD -->
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  width:100%;
                  background-color:#f8fafc;
                  border:1px solid #e1e8f0;
                  border-radius:13px;
                "
              >
                <tr>
                  <td style="padding:20px;">

                    <!-- IDENTITY -->
                    <table
                      role="presentation"
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tr>

                        <td
                          class="mobile-block"
                          width="62"
                          valign="top"
                          style="width:62px;"
                        >

                          <table
                            role="presentation"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tr>

                              <td
                                width="50"
                                height="50"
                                align="center"
                                valign="middle"
                                style="
                                  width:50px;
                                  height:50px;
                                  background-color:#dcfce7;
                                  border:1px solid #b7efc5;
                                  border-radius:50%;
                                  color:#15803d;
                                  font-family:Arial,Helvetica,sans-serif;
                                  font-size:20px;
                                  line-height:50px;
                                  font-weight:800;
                                  text-transform:uppercase;
                                "
                              >
                                ${safeName.charAt(0).toUpperCase()}
                              </td>

                            </tr>
                          </table>

                        </td>

                        <td
                          class="mobile-block identity-copy"
                          valign="top"
                          style="
                            padding-left:5px;
                            font-family:Arial,Helvetica,sans-serif;
                          "
                        >

                          <div
                            style="
                              color:#667085;
                              font-size:10px;
                              line-height:15px;
                              font-weight:700;
                              letter-spacing:0.9px;
                              text-transform:uppercase;
                            "
                          >
                            Submitted by
                          </div>

                          <div
                            style="
                              padding-top:2px;
                              color:#101828;
                              font-size:20px;
                              line-height:27px;
                              font-weight:700;
                            "
                          >
                            ${safeName}
                          </div>

                          <div style="padding-top:8px;">

                            <span
                              style="
                                display:inline-block;
                                padding:5px 10px;
                                background-color:${badgeBg};
                                border:1px solid ${badgeBorder};
                                border-radius:999px;
                                color:${badgeColor};
                                font-size:11px;
                                line-height:15px;
                                font-weight:700;
                              "
                            >
                              ${safeReason}
                            </span>

                          </div>

                        </td>

                      </tr>
                    </table>

                    <div style="height:19px;line-height:19px;">
                      &nbsp;
                    </div>

                    <!-- CONTACT DATA -->
                    <table
                      role="presentation"
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      style="border-top:1px solid #e1e8f0;"
                    >

                      <tr>

                        <td
                          class="detail-label"
                          width="125"
                          valign="top"
                          style="
                            width:125px;
                            padding:17px 12px 8px 0;
                            color:#667085;
                            font-family:Arial,Helvetica,sans-serif;
                            font-size:12px;
                            line-height:18px;
                            font-weight:600;
                          "
                        >
                          Email address
                        </td>

                        <td
                          class="detail-value"
                          valign="top"
                          style="
                            padding:17px 0 8px;
                            font-family:Arial,Helvetica,sans-serif;
                            font-size:13px;
                            line-height:18px;
                            font-weight:700;
                            word-break:break-word;
                          "
                        >
                          <a
                            href="mailto:${safeEmail}"
                            style="
                              color:#175cd3;
                              text-decoration:none;
                            "
                          >
                            ${safeEmail}
                          </a>
                        </td>

                      </tr>

                      <tr>

                        <td
                          class="detail-label"
                          width="125"
                          valign="top"
                          style="
                            width:125px;
                            padding:8px 12px 0 0;
                            color:#667085;
                            font-family:Arial,Helvetica,sans-serif;
                            font-size:12px;
                            line-height:18px;
                            font-weight:600;
                          "
                        >
                          Mobile number
                        </td>

                        <td
                          class="detail-value"
                          valign="top"
                          style="
                            padding:8px 0 0;
                            color:#101828;
                            font-family:Arial,Helvetica,sans-serif;
                            font-size:13px;
                            line-height:18px;
                            font-weight:700;
                            word-break:break-word;
                          "
                        >
                          ${safeMobile
        ? `
                                <a
                                  href="tel:${safeMobile.replace(/[^\d+]/g, "")}"
                                  style="
                                    color:#101828;
                                    text-decoration:none;
                                  "
                                >
                                  ${safeMobile}
                                </a>
                              `
        : `
                                <span
                                  style="
                                    color:#98a2b3;
                                    font-weight:500;
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

              <div style="height:26px;line-height:26px;">
                &nbsp;
              </div>

              <!-- SECTION 02 -->
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
              >
                <tr>

                  <td
                    width="30"
                    valign="middle"
                    style="
                      width:30px;
                      color:#16a34a;
                      font-family:'Courier New',Courier,monospace;
                      font-size:11px;
                      line-height:16px;
                      font-weight:700;
                    "
                  >
                    02
                  </td>

                  <td
                    valign="middle"
                    style="
                      color:#475467;
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:11px;
                      line-height:16px;
                      font-weight:700;
                      letter-spacing:1.1px;
                      text-transform:uppercase;
                    "
                  >
                    Message
                  </td>

                  <td
                    valign="middle"
                    style="padding-left:14px;"
                  >
                    <div
                      style="
                        height:1px;
                        background-color:#e4eaf1;
                        font-size:0;
                        line-height:0;
                      "
                    >
                      &nbsp;
                    </div>
                  </td>

                </tr>
              </table>

              <div style="height:13px;line-height:13px;">
                &nbsp;
              </div>

              <!-- MESSAGE CARD -->
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  width:100%;
                  background-color:#ffffff;
                  border:1px solid #dce4ee;
                  border-radius:13px;
                "
              >
                <tr>

                  <td
                    width="5"
                    style="
                      width:5px;
                      background-color:#22c55e;
                      border-radius:13px 0 0 13px;
                      font-size:0;
                      line-height:0;
                    "
                  >
                    &nbsp;
                  </td>

                  <td style="padding:19px 20px;">

                    <div
                      style="
                        margin-bottom:10px;
                        color:#16a34a;
                        font-family:Georgia,'Times New Roman',serif;
                        font-size:25px;
                        line-height:18px;
                        font-weight:700;
                      "
                    >
                      &ldquo;
                    </div>

                    <div
                      style="
                        color:#27364b;
                        font-family:Arial,Helvetica,sans-serif;
                        font-size:14px;
                        line-height:23px;
                        word-break:break-word;
                      "
                    >
                      ${safeMessage.replace(/\n/g, "<br>")}
                    </div>

                  </td>

                </tr>
              </table>

              <div style="height:27px;line-height:27px;">
                &nbsp;
              </div>

              <!-- ACTION BUTTONS -->
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
              >
                <tr>

                  <!-- REPLY -->
                  <td
                    class="action-cell"
                    valign="top"
                    style="padding-right:10px;"
                  >

                    <table
                      role="presentation"
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tr>

                        <td
                          align="center"
                          style="
                            background-color:#16a34a;
                            border-radius:9px;
                          "
                        >

                          <a
                            class="action-link"
                            href="mailto:${safeEmail}?subject=${encodeURIComponent(
        `Re: ${reason} — Shashank Shinde`
      )}"
                            style="
                              display:inline-block;
                              box-sizing:border-box;
                              width:100%;
                              padding:14px 20px;
                              border:1px solid #16a34a;
                              border-radius:9px;
                              color:#ffffff;
                              font-family:Arial,Helvetica,sans-serif;
                              font-size:13px;
                              line-height:18px;
                              font-weight:700;
                              text-align:center;
                              text-decoration:none;
                            "
                          >
                            Reply to ${safeName}&nbsp;&nbsp;&rarr;
                          </a>

                        </td>

                      </tr>
                    </table>

                  </td>

                  ${safeMobile
        ? `
                        <td
                          class="action-cell"
                          width="39%"
                          valign="top"
                          style="width:39%;"
                        >

                          <table
                            role="presentation"
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tr>

                              <td
                                align="center"
                                style="
                                  background-color:#ffffff;
                                  border-radius:9px;
                                "
                              >

                                <a
                                  class="action-link"
                                  href="tel:${safeMobile.replace(/[^\d+]/g, "")}"
                                  style="
                                    display:inline-block;
                                    box-sizing:border-box;
                                    width:100%;
                                    padding:14px 18px;
                                    border:1px solid #cbd5e1;
                                    border-radius:9px;
                                    color:#172033;
                                    font-family:Arial,Helvetica,sans-serif;
                                    font-size:13px;
                                    line-height:18px;
                                    font-weight:700;
                                    text-align:center;
                                    text-decoration:none;
                                  "
                                >
                                  Call now
                                </a>

                              </td>

                            </tr>
                          </table>

                        </td>
                      `
        : ""
      }

                </tr>
              </table>

              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="margin-top:14px;"
              >
                <tr>

                  <td
                    align="center"
                    style="
                      color:#98a2b3;
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:10px;
                      line-height:16px;
                    "
                  >
                    Responding promptly helps turn portfolio interest
                    into a meaningful conversation.
                  </td>

                </tr>
              </table>

            </td>
          </tr>

          <!-- ================================================= -->
          <!-- FOOTER -->
          <!-- ================================================= -->

          <tr>
            <td
              class="footer-pad"
              style="
                padding:21px 35px 23px;
                background-color:#f8fafc;
                border-top:1px solid #e1e8f0;
              "
            >

              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
              >
                <tr>

                  <td
                    class="mobile-block"
                    valign="middle"
                    style="
                      font-family:Arial,Helvetica,sans-serif;
                    "
                  >

                    <div
                      style="
                        color:#344054;
                        font-size:12px;
                        line-height:18px;
                        font-weight:700;
                      "
                    >
                      Shashank Shinde
                    </div>

                    <div
                      style="
                        color:#667085;
                        font-size:10px;
                        line-height:17px;
                      "
                    >
                      Software Test Engineer &amp; QA Automation
                    </div>

                  </td>

                  <td
                    class="mobile-block footer-meta"
                    align="right"
                    valign="middle"
                    style="
                      color:#98a2b3;
                      font-family:'Courier New',Courier,monospace;
                      font-size:9px;
                      line-height:15px;
                      font-weight:700;
                      letter-spacing:0.8px;
                      text-transform:uppercase;
                    "
                  >
                    Portfolio form &nbsp;/&nbsp; Secure alert
                  </td>

                </tr>
              </table>

              <div style="height:14px;line-height:14px;">
                &nbsp;
              </div>

              <div
                style="
                  height:1px;
                  background-color:#e4eaf1;
                  font-size:0;
                  line-height:0;
                "
              >
                &nbsp;
              </div>

              <p
                style="
                  margin:12px 0 0;
                  color:#98a2b3;
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:9px;
                  line-height:15px;
                  text-align:center;
                "
              >
                This is an automated private notification generated
                by your portfolio contact form.
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
