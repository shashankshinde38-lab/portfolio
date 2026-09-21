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
    content="light"
  >

  <meta
    name="supported-color-schemes"
    content="light"
  >

  <title>
    New Portfolio Enquiry
  </title>

  <style>
    html,
    body {
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      background-color: #e9eef5 !important;
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

    p {
      margin: 0;
    }

    @media only screen and (max-width: 640px) {
      .outer-pad {
        padding: 12px 7px !important;
      }

      .email-card {
        border-radius: 16px !important;
      }

      .header-pad {
        padding: 24px 19px 27px !important;
      }

      .body-pad {
        padding: 24px 18px 28px !important;
      }

      .footer-pad {
        padding: 20px 18px !important;
      }

      .hero-title {
        font-size: 27px !important;
        line-height: 33px !important;
        letter-spacing: -0.6px !important;
      }

      .hero-description {
        font-size: 13px !important;
        line-height: 21px !important;
      }

      .desktop-only {
        display: none !important;
      }

      .mobile-block {
        display: block !important;
        width: 100% !important;
      }

      .mobile-left {
        text-align: left !important;
      }

      .brand-copy {
        padding-left: 10px !important;
      }

      .status-cell {
        display: block !important;
        width: 100% !important;
        border-right: 0 !important;
      }

      .status-cell + .status-cell {
        border-top:
          1px solid #253950 !important;
      }

      .profile-avatar-cell {
        display: block !important;
        width: 100% !important;
      }

      .profile-copy-cell {
        display: block !important;
        width: 100% !important;
        padding: 14px 0 0 !important;
      }

      .detail-label,
      .detail-value {
        display: block !important;
        width: 100% !important;
      }

      .detail-label {
        padding: 0 0 4px !important;
      }

      .detail-value {
        padding: 0 0 16px !important;
      }

      .metric-cell {
        display: block !important;
        width: 100% !important;
        border-right: 0 !important;
      }

      .metric-cell + .metric-cell {
        border-top:
          1px solid #e5ebf2 !important;
      }

      .action-cell {
        display: block !important;
        width: 100% !important;
        padding: 0 0 10px !important;
      }

      .action-link {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        text-align: center !important;
      }

      .footer-col {
        display: block !important;
        width: 100% !important;
        text-align: left !important;
      }

      .footer-meta {
        padding-top: 10px !important;
      }

      .response-box {
        padding: 14px !important;
      }

      .message-card-pad {
        padding: 18px 16px !important;
      }
    }
  </style>

  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>
          96
        </o:PixelsPerInch>
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
    background-color:#e9eef5;
    color:#101828;
    -webkit-font-smoothing:antialiased;
    -webkit-text-size-adjust:100%;
    -ms-text-size-adjust:100%;
  "
>

  <!-- =========================================================
       PREHEADER
       ========================================================= -->

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
    New ${safeReason} enquiry from ${safeName}. Review the
    lead details and respond directly.
    &#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;
  </div>


  <!-- =========================================================
       EMAIL BACKGROUND
       ========================================================= -->

  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="
      width:100%;
      background-color:#e9eef5;
    "
  >
    <tr>
      <td
        class="outer-pad"
        align="center"
        style="
          padding:42px 16px;
        "
      >

        <!--[if mso]>
        <table
          role="presentation"
          width="660"
          cellspacing="0"
          cellpadding="0"
          border="0"
        >
          <tr>
            <td>
        <![endif]-->


        <!-- =====================================================
             MASTER CARD
             ===================================================== -->

        <table
          class="email-card"
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            width:100%;
            max-width:660px;
            background-color:#ffffff;
            border:1px solid #d7e0eb;
            border-radius:21px;
            overflow:hidden;
            box-shadow:
              0 22px 55px rgba(15,23,42,0.10);
          "
        >

          <!-- ===================================================
               PREMIUM ACCENT RAIL
               =================================================== -->

          <tr>
            <td
              height="5"
              style="
                height:5px;
                padding:0;
                background-color:#0ea5e9;
                background-image:
                  linear-gradient(
                    90deg,
                    #2563eb 0%,
                    #0ea5e9 35%,
                    #22d3ee 68%,
                    #4ade80 100%
                  );
                font-size:0;
                line-height:0;
              "
            >
              &nbsp;
            </td>
          </tr>


          <!-- ===================================================
               HEADER
               =================================================== -->

          <tr>
            <td
              class="header-pad"
              style="
                padding:31px 38px 33px;
                background-color:#06101d;
                background-image:
                  linear-gradient(
                    145deg,
                    #06101d 0%,
                    #0a1a2d 55%,
                    #0d2741 100%
                  );
              "
            >

              <!-- ===============================================
                   BRAND / EVENT STATUS
                   =============================================== -->

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tr>

                  <td
                    valign="middle"
                  >
                    <table
                      role="presentation"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                    >
                      <tr>

                        <!-- BRAND MARK -->

                        <td
                          width="46"
                          height="46"
                          align="center"
                          valign="middle"
                          style="
                            width:46px;
                            height:46px;
                            background-color:#0ea5e9;
                            background-image:
                              linear-gradient(
                                145deg,
                                #2563eb,
                                #06b6d4
                              );
                            border-radius:13px;
                            color:#ffffff;
                            font-family:
                              Arial,
                              Helvetica,
                              sans-serif;
                            font-size:14px;
                            line-height:46px;
                            font-weight:800;
                            letter-spacing:-0.2px;
                            box-shadow:
                              0 7px 20px rgba(14,165,233,0.22);
                          "
                        >
                          SS
                        </td>

                        <!-- BRAND COPY -->

                        <td
                          class="brand-copy"
                          style="
                            padding-left:13px;
                            font-family:
                              Arial,
                              Helvetica,
                              sans-serif;
                          "
                        >
                          <div
                            style="
                              color:#f8fafc;
                              font-size:15px;
                              line-height:20px;
                              font-weight:700;
                              letter-spacing:-0.2px;
                            "
                          >
                            Shashank Shinde
                          </div>

                          <div
                            style="
                              padding-top:1px;
                              color:#7390ad;
                              font-family:
                                'Courier New',
                                Courier,
                                monospace;
                              font-size:9px;
                              line-height:15px;
                              font-weight:700;
                              letter-spacing:1.15px;
                              text-transform:uppercase;
                            "
                          >
                            SDET · QA Command Center
                          </div>
                        </td>

                      </tr>
                    </table>
                  </td>


                  <!-- LIVE EVENT -->

                  <td
                    class="desktop-only"
                    align="right"
                    valign="middle"
                  >
                    <table
                      role="presentation"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="
                        background-color:#0a1a2b;
                        border:1px solid #1d3b56;
                        border-radius:999px;
                      "
                    >
                      <tr>

                        <td
                          width="27"
                          align="right"
                          valign="middle"
                          style="
                            padding-left:10px;
                          "
                        >
                          <div
                            style="
                              width:7px;
                              height:7px;
                              background-color:#4ade80;
                              border-radius:50%;
                              box-shadow:
                                0 0 8px rgba(74,222,128,0.6);
                              font-size:0;
                              line-height:0;
                            "
                          >
                            &nbsp;
                          </div>
                        </td>

                        <td
                          style="
                            padding:
                              7px
                              11px
                              7px
                              7px;
                            color:#a9bdd0;
                            font-family:
                              'Courier New',
                              Courier,
                              monospace;
                            font-size:9px;
                            line-height:13px;
                            font-weight:700;
                            letter-spacing:0.7px;
                            text-transform:uppercase;
                          "
                        >
                          New enquiry
                        </td>

                      </tr>
                    </table>
                  </td>

                </tr>
              </table>


              <div
                style="
                  height:31px;
                  line-height:31px;
                  font-size:0;
                "
              >
                &nbsp;
              </div>


              <!-- ===============================================
                   HERO COPY
                   =============================================== -->

              <div
                style="
                  color:#38bdf8;
                  font-family:
                    'Courier New',
                    Courier,
                    monospace;
                  font-size:9px;
                  line-height:15px;
                  font-weight:700;
                  letter-spacing:1.5px;
                  text-transform:uppercase;
                "
              >
                Portfolio Intelligence / Lead Alert
              </div>


              <h1
                class="hero-title"
                style="
                  margin:8px 0 10px;
                  color:#ffffff;
                  font-family:
                    Arial,
                    Helvetica,
                    sans-serif;
                  font-size:33px;
                  line-height:40px;
                  font-weight:700;
                  letter-spacing:-1px;
                "
              >
                A new conversation
                <br>
                just entered your pipeline.
              </h1>


              <p
                class="hero-description"
                style="
                  max-width:520px;
                  margin:0;
                  color:#9fb1c5;
                  font-family:
                    Arial,
                    Helvetica,
                    sans-serif;
                  font-size:14px;
                  line-height:22px;
                "
              >
                Your portfolio generated a new enquiry.
                Review the lead context, message and contact
                information below before responding.
              </p>


              <div
                style="
                  height:27px;
                  line-height:27px;
                  font-size:0;
                "
              >
                &nbsp;
              </div>


              <!-- ===============================================
                   COMMAND STATUS PANEL
                   =============================================== -->

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  width:100%;
                  overflow:hidden;
                  background-color:#081828;
                  border:1px solid #203a52;
                  border-radius:13px;
                "
              >
                <tr>

                  <td
                    class="status-cell"
                    width="50%"
                    valign="top"
                    style="
                      width:50%;
                      padding:14px 16px;
                      border-right:1px solid #203a52;
                    "
                  >
                    <div
                      style="
                        color:#688099;
                        font-family:
                          'Courier New',
                          Courier,
                          monospace;
                        font-size:8px;
                        line-height:13px;
                        font-weight:700;
                        letter-spacing:1.1px;
                        text-transform:uppercase;
                      "
                    >
                      Workflow status
                    </div>

                    <div
                      style="
                        padding-top:4px;
                        color:#bbf7d0;
                        font-family:
                          Arial,
                          Helvetica,
                          sans-serif;
                        font-size:12px;
                        line-height:18px;
                        font-weight:700;
                      "
                    >
                      ● Awaiting your reply
                    </div>
                  </td>


                  <td
                    class="status-cell"
                    width="50%"
                    valign="top"
                    style="
                      width:50%;
                      padding:14px 16px;
                    "
                  >
                    <div
                      style="
                        color:#688099;
                        font-family:
                          'Courier New',
                          Courier,
                          monospace;
                        font-size:8px;
                        line-height:13px;
                        font-weight:700;
                        letter-spacing:1.1px;
                        text-transform:uppercase;
                      "
                    >
                      Received
                    </div>

                    <div
                      style="
                        padding-top:4px;
                        color:#e2e8f0;
                        font-family:
                          Arial,
                          Helvetica,
                          sans-serif;
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


          <!-- ===================================================
               BODY
               =================================================== -->

          <tr>
            <td
              class="body-pad"
              style="
                padding:31px 38px 36px;
                background-color:#ffffff;
              "
            >

              <!-- =================================================
                   SECTION HEADING 01
                   ================================================= -->

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tr>

                  <td
                    width="34"
                    valign="middle"
                    style="
                      width:34px;
                      color:#0284c7;
                      font-family:
                        'Courier New',
                        Courier,
                        monospace;
                      font-size:10px;
                      line-height:15px;
                      font-weight:700;
                    "
                  >
                    01
                  </td>

                  <td
                    valign="middle"
                    style="
                      color:#344054;
                      font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                      font-size:10px;
                      line-height:15px;
                      font-weight:700;
                      letter-spacing:1.2px;
                      text-transform:uppercase;
                    "
                  >
                    Lead intelligence
                  </td>

                  <td
                    valign="middle"
                    style="
                      padding-left:14px;
                    "
                  >
                    <div
                      style="
                        height:1px;
                        background-color:#e3eaf2;
                        font-size:0;
                        line-height:0;
                      "
                    >
                      &nbsp;
                    </div>
                  </td>

                </tr>
              </table>


              <div
                style="
                  height:13px;
                  line-height:13px;
                  font-size:0;
                "
              >
                &nbsp;
              </div>


              <!-- =================================================
                   PREMIUM LEAD CARD
                   ================================================= -->

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  width:100%;
                  background-color:#f8fafc;
                  border:1px solid #dce5ef;
                  border-radius:15px;
                "
              >
                <tr>
                  <td
                    style="
                      padding:21px;
                    "
                  >

                    <!-- PROFILE -->

                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                    >
                      <tr>

                        <td
                          class="profile-avatar-cell"
                          width="66"
                          valign="top"
                          style="
                            width:66px;
                          "
                        >
                          <table
                            role="presentation"
                            cellspacing="0"
                            cellpadding="0"
                            border="0"
                          >
                            <tr>
                              <td
                                width="52"
                                height="52"
                                align="center"
                                valign="middle"
                                style="
                                  width:52px;
                                  height:52px;
                                  border:1px solid #bae6fd;
                                  border-radius:50%;
                                  background-color:#e0f2fe;
                                  color:#0369a1;
                                  font-family:
                                    Arial,
                                    Helvetica,
                                    sans-serif;
                                  font-size:20px;
                                  line-height:52px;
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
                          class="profile-copy-cell"
                          valign="top"
                          style="
                            padding-left:4px;
                            font-family:
                              Arial,
                              Helvetica,
                              sans-serif;
                          "
                        >
                          <div
                            style="
                              color:#667085;
                              font-size:9px;
                              line-height:14px;
                              font-weight:700;
                              letter-spacing:1px;
                              text-transform:uppercase;
                            "
                          >
                            Submitted by
                          </div>

                          <div
                            style="
                              padding-top:2px;
                              color:#101828;
                              font-size:21px;
                              line-height:28px;
                              font-weight:700;
                              letter-spacing:-0.4px;
                            "
                          >
                            ${safeName}
                          </div>

                          <div
                            style="
                              padding-top:8px;
                            "
                          >
                            <span
                              style="
                                display:inline-block;
                                padding:5px 10px;
                                border:1px solid ${badgeBorder};
                                border-radius:999px;
                                background-color:${badgeBg};
                                color:${badgeColor};
                                font-family:
                                  Arial,
                                  Helvetica,
                                  sans-serif;
                                font-size:10px;
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


                    <div
                      style="
                        height:19px;
                        line-height:19px;
                        font-size:0;
                      "
                    >
                      &nbsp;
                    </div>


                    <!-- =========================================
                         CONTACT DETAILS
                         ========================================= -->

                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="
                        border-top:1px solid #e0e7ef;
                      "
                    >

                      <tr>

                        <td
                          class="detail-label"
                          width="135"
                          valign="top"
                          style="
                            width:135px;
                            padding:17px 14px 8px 0;
                            color:#667085;
                            font-family:
                              Arial,
                              Helvetica,
                              sans-serif;
                            font-size:11px;
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
                            font-family:
                              Arial,
                              Helvetica,
                              sans-serif;
                            font-size:13px;
                            line-height:18px;
                            font-weight:700;
                            word-break:break-word;
                          "
                        >
                          <a
                            href="mailto:${safeEmail}"
                            style="
                              color:#0369a1;
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
                          width="135"
                          valign="top"
                          style="
                            width:135px;
                            padding:8px 14px 0 0;
                            color:#667085;
                            font-family:
                              Arial,
                              Helvetica,
                              sans-serif;
                            font-size:11px;
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
                            font-family:
                              Arial,
                              Helvetica,
                              sans-serif;
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


              <div
                style="
                  height:17px;
                  line-height:17px;
                  font-size:0;
                "
              >
                &nbsp;
              </div>


              <!-- =================================================
                   SNAPSHOT / METRICS
                   ================================================= -->

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  width:100%;
                  overflow:hidden;
                  background-color:#ffffff;
                  border:1px solid #e1e8f0;
                  border-radius:12px;
                "
              >
                <tr>

                  <td
                    class="metric-cell"
                    width="33.33%"
                    valign="top"
                    style="
                      width:33.33%;
                      padding:13px 14px;
                      border-right:1px solid #e5ebf2;
                    "
                  >
                    <div
                      style="
                        color:#98a2b3;
                        font-family:
                          'Courier New',
                          Courier,
                          monospace;
                        font-size:8px;
                        line-height:13px;
                        font-weight:700;
                        letter-spacing:0.9px;
                        text-transform:uppercase;
                      "
                    >
                      Lead source
                    </div>

                    <div
                      style="
                        padding-top:3px;
                        color:#344054;
                        font-family:
                          Arial,
                          Helvetica,
                          sans-serif;
                        font-size:11px;
                        line-height:17px;
                        font-weight:700;
                      "
                    >
                      Portfolio
                    </div>
                  </td>


                  <td
                    class="metric-cell"
                    width="33.33%"
                    valign="top"
                    style="
                      width:33.33%;
                      padding:13px 14px;
                      border-right:1px solid #e5ebf2;
                    "
                  >
                    <div
                      style="
                        color:#98a2b3;
                        font-family:
                          'Courier New',
                          Courier,
                          monospace;
                        font-size:8px;
                        line-height:13px;
                        font-weight:700;
                        letter-spacing:0.9px;
                        text-transform:uppercase;
                      "
                    >
                      Category
                    </div>

                    <div
                      style="
                        padding-top:3px;
                        color:#344054;
                        font-family:
                          Arial,
                          Helvetica,
                          sans-serif;
                        font-size:11px;
                        line-height:17px;
                        font-weight:700;
                        word-break:break-word;
                      "
                    >
                      ${safeReason}
                    </div>
                  </td>


                  <td
                    class="metric-cell"
                    width="33.33%"
                    valign="top"
                    style="
                      width:33.33%;
                      padding:13px 14px;
                    "
                  >
                    <div
                      style="
                        color:#98a2b3;
                        font-family:
                          'Courier New',
                          Courier,
                          monospace;
                        font-size:8px;
                        line-height:13px;
                        font-weight:700;
                        letter-spacing:0.9px;
                        text-transform:uppercase;
                      "
                    >
                      Next action
                    </div>

                    <div
                      style="
                        padding-top:3px;
                        color:#15803d;
                        font-family:
                          Arial,
                          Helvetica,
                          sans-serif;
                        font-size:11px;
                        line-height:17px;
                        font-weight:700;
                      "
                    >
                      Review &amp; reply
                    </div>
                  </td>

                </tr>
              </table>


              <div
                style="
                  height:29px;
                  line-height:29px;
                  font-size:0;
                "
              >
                &nbsp;
              </div>


              <!-- =================================================
                   SECTION 02
                   ================================================= -->

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tr>

                  <td
                    width="34"
                    valign="middle"
                    style="
                      width:34px;
                      color:#0284c7;
                      font-family:
                        'Courier New',
                        Courier,
                        monospace;
                      font-size:10px;
                      line-height:15px;
                      font-weight:700;
                    "
                  >
                    02
                  </td>

                  <td
                    valign="middle"
                    style="
                      color:#344054;
                      font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                      font-size:10px;
                      line-height:15px;
                      font-weight:700;
                      letter-spacing:1.2px;
                      text-transform:uppercase;
                    "
                  >
                    Enquiry message
                  </td>

                  <td
                    valign="middle"
                    style="
                      padding-left:14px;
                    "
                  >
                    <div
                      style="
                        height:1px;
                        background-color:#e3eaf2;
                        font-size:0;
                        line-height:0;
                      "
                    >
                      &nbsp;
                    </div>
                  </td>

                </tr>
              </table>


              <div
                style="
                  height:13px;
                  line-height:13px;
                  font-size:0;
                "
              >
                &nbsp;
              </div>


              <!-- =================================================
                   PREMIUM MESSAGE CARD
                   ================================================= -->

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  width:100%;
                  background-color:#f9fbfd;
                  border:1px solid #dce5ef;
                  border-radius:15px;
                "
              >
                <tr>

                  <td
                    width="5"
                    style="
                      width:5px;
                      background-color:#0ea5e9;
                      background-image:
                        linear-gradient(
                          180deg,
                          #0ea5e9,
                          #22d3ee
                        );
                      border-radius:15px 0 0 15px;
                      font-size:0;
                      line-height:0;
                    "
                  >
                    &nbsp;
                  </td>


                  <td
                    class="message-card-pad"
                    style="
                      padding:21px 22px;
                    "
                  >

                    <div
                      style="
                        margin-bottom:8px;
                        color:#0284c7;
                        font-family:
                          Georgia,
                          'Times New Roman',
                          serif;
                        font-size:28px;
                        line-height:20px;
                        font-weight:700;
                      "
                    >
                      &ldquo;
                    </div>

                    <div
                      style="
                        color:#27364b;
                        font-family:
                          Arial,
                          Helvetica,
                          sans-serif;
                        font-size:14px;
                        line-height:24px;
                        word-break:break-word;
                      "
                    >
                      ${safeMessage.replace(/\n/g, "<br>")}
                    </div>

                    <div
                      style="
                        margin-top:16px;
                        padding-top:13px;
                        border-top:1px solid #e6ecf2;
                        color:#98a2b3;
                        font-family:
                          'Courier New',
                          Courier,
                          monospace;
                        font-size:8px;
                        line-height:14px;
                        font-weight:700;
                        letter-spacing:0.8px;
                        text-transform:uppercase;
                      "
                    >
                      Original message · Portfolio contact form
                    </div>

                  </td>

                </tr>
              </table>


              <div
                style="
                  height:21px;
                  line-height:21px;
                  font-size:0;
                "
              >
                &nbsp;
              </div>


              <!-- =================================================
                   RESPONSE PRIORITY
                   ================================================= -->

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  width:100%;
                  background-color:#effaf5;
                  border:1px solid #ccebd9;
                  border-radius:12px;
                "
              >
                <tr>
                  <td
                    class="response-box"
                    style="
                      padding:14px 16px;
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
                          width="30"
                          valign="top"
                          style="
                            width:30px;
                          "
                        >
                          <table
                            role="presentation"
                            cellspacing="0"
                            cellpadding="0"
                            border="0"
                          >
                            <tr>
                              <td
                                width="24"
                                height="24"
                                align="center"
                                valign="middle"
                                style="
                                  width:24px;
                                  height:24px;
                                  background-color:#dcfce7;
                                  border-radius:50%;
                                  color:#15803d;
                                  font-family:
                                    Arial,
                                    Helvetica,
                                    sans-serif;
                                  font-size:12px;
                                  line-height:24px;
                                  font-weight:800;
                                "
                              >
                                ✓
                              </td>
                            </tr>
                          </table>
                        </td>


                        <td
                          valign="top"
                          style="
                            padding-left:4px;
                          "
                        >
                          <div
                            style="
                              color:#166534;
                              font-family:
                                Arial,
                                Helvetica,
                                sans-serif;
                              font-size:11px;
                              line-height:17px;
                              font-weight:700;
                            "
                          >
                            Lead ready for review
                          </div>

                          <div
                            style="
                              padding-top:2px;
                              color:#527061;
                              font-family:
                                Arial,
                                Helvetica,
                                sans-serif;
                              font-size:10px;
                              line-height:16px;
                            "
                          >
                            Contact details and enquiry context
                            have been captured successfully.
                          </div>
                        </td>

                      </tr>
                    </table>

                  </td>
                </tr>
              </table>


              <div
                style="
                  height:26px;
                  line-height:26px;
                  font-size:0;
                "
              >
                &nbsp;
              </div>


              <!-- =================================================
                   SECTION 03
                   ================================================= -->

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tr>

                  <td
                    width="34"
                    valign="middle"
                    style="
                      width:34px;
                      color:#0284c7;
                      font-family:
                        'Courier New',
                        Courier,
                        monospace;
                      font-size:10px;
                      line-height:15px;
                      font-weight:700;
                    "
                  >
                    03
                  </td>

                  <td
                    valign="middle"
                    style="
                      color:#344054;
                      font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                      font-size:10px;
                      line-height:15px;
                      font-weight:700;
                      letter-spacing:1.2px;
                      text-transform:uppercase;
                    "
                  >
                    Take action
                  </td>

                  <td
                    valign="middle"
                    style="
                      padding-left:14px;
                    "
                  >
                    <div
                      style="
                        height:1px;
                        background-color:#e3eaf2;
                        font-size:0;
                        line-height:0;
                      "
                    >
                      &nbsp;
                    </div>
                  </td>

                </tr>
              </table>


              <div
                style="
                  height:13px;
                  line-height:13px;
                  font-size:0;
                "
              >
                &nbsp;
              </div>


              <!-- =================================================
                   CTA BUTTONS
                   ================================================= -->

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tr>

                  <!-- PRIMARY CTA -->

                  <td
                    class="action-cell"
                    valign="top"
                    style="
                      padding-right:9px;
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
                          align="center"
                          style="
                            background-color:#0369a1;
                            border-radius:10px;
                          "
                        >
                          <a
                            class="action-link"
                            href="mailto:${safeEmail}?subject=${encodeURIComponent(
        `Re: ${reason} — Shashank Shinde`
      )}"
                            style="
                              display:inline-block;
                              width:100%;
                              box-sizing:border-box;
                              padding:14px 18px;
                              border:1px solid #0369a1;
                              border-radius:10px;
                              color:#ffffff;
                              background-color:#0369a1;
                              font-family:
                                Arial,
                                Helvetica,
                                sans-serif;
                              font-size:12px;
                              line-height:18px;
                              font-weight:700;
                              text-align:center;
                              text-decoration:none;
                            "
                          >
                            Reply to ${safeName}
                            &nbsp;&nbsp;&rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>


                  <!-- CALL CTA -->

                  ${safeMobile
        ? `
                      <td
                        class="action-cell"
                        width="38%"
                        valign="top"
                        style="
                          width:38%;
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
                              align="center"
                              style="
                                background-color:#ffffff;
                                border-radius:10px;
                              "
                            >
                              <a
                                class="action-link"
                                href="tel:${safeMobile.replace(/[^\d+]/g, "")}"
                                style="
                                  display:inline-block;
                                  width:100%;
                                  box-sizing:border-box;
                                  padding:14px 16px;
                                  border:1px solid #cbd5e1;
                                  border-radius:10px;
                                  color:#172033;
                                  background-color:#ffffff;
                                  font-family:
                                    Arial,
                                    Helvetica,
                                    sans-serif;
                                  font-size:12px;
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


              <!-- ===============================================
                   RESPONSE NOTE
                   =============================================== -->

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  margin-top:15px;
                "
              >
                <tr>
                  <td
                    align="center"
                    style="
                      color:#98a2b3;
                      font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                      font-size:9px;
                      line-height:15px;
                    "
                  >
                    A thoughtful, timely reply helps convert
                    portfolio interest into a meaningful
                    professional conversation.
                  </td>
                </tr>
              </table>

            </td>
          </tr>


          <!-- ===================================================
               FOOTER
               =================================================== -->

          <tr>
            <td
              class="footer-pad"
              style="
                padding:22px 38px 24px;
                background-color:#f7f9fc;
                border-top:1px solid #dfe7f0;
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
                    class="footer-col"
                    valign="middle"
                    style="
                      font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
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
                      Software Test Engineer · QA Automation · SDET
                    </div>
                  </td>


                  <td
                    class="footer-col footer-meta"
                    align="right"
                    valign="middle"
                    style="
                      color:#98a2b3;
                      font-family:
                        'Courier New',
                        Courier,
                        monospace;
                      font-size:8px;
                      line-height:14px;
                      font-weight:700;
                      letter-spacing:0.8px;
                      text-transform:uppercase;
                    "
                  >
                    Portfolio / Secure lead notification
                  </td>

                </tr>
              </table>


              <div
                style="
                  height:14px;
                  line-height:14px;
                  font-size:0;
                "
              >
                &nbsp;
              </div>


              <div
                style="
                  height:1px;
                  background-color:#e1e8f0;
                  font-size:0;
                  line-height:0;
                "
              >
                &nbsp;
              </div>


              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  margin-top:12px;
                "
              >
                <tr>

                  <td
                    align="center"
                    style="
                      color:#98a2b3;
                      font-family:
                        Arial,
                        Helvetica,
                        sans-serif;
                      font-size:9px;
                      line-height:15px;
                    "
                  >
                    Private automated notification generated
                    from the Shashank Shinde portfolio
                    enquiry system.
                  </td>

                </tr>
              </table>

            </td>
          </tr>

        </table>


        <!-- =====================================================
             OUTSIDE FOOTER
             ===================================================== -->

        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            width:100%;
            max-width:660px;
          "
        >
          <tr>
            <td
              align="center"
              style="
                padding:17px 12px 0;
                color:#8794a5;
                font-family:
                  'Courier New',
                  Courier,
                  monospace;
                font-size:8px;
                line-height:14px;
                letter-spacing:0.55px;
                text-transform:uppercase;
              "
            >
              QA Command Center
              &nbsp;·&nbsp;
              Portfolio Lead Intelligence
              &nbsp;·&nbsp;
              Secure Notification
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
