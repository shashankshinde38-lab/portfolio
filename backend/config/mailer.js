const nodemailer = require("nodemailer");

/**
 * Create transporter lazily (env vars are guaranteed to be loaded by call time).
 */
let _transporter = null;

function getTransporter() {
  if (!_transporter) {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    console.log(`[Mailer] GMAIL_USER = ${user ? user : "⚠ NOT SET"}`);
    console.log(`[Mailer] GMAIL_APP_PASSWORD = ${pass ? "****" + pass.slice(-4) : "⚠ NOT SET"}`);

    if (!user || !pass) {
      console.error("✕ Email credentials missing — notifications will be skipped");
      return null;
    }

    _transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      family: 4,
      auth: { user, pass },
    });
  }
  return _transporter;
}

/**
 * Send email notification for a new contact enquiry.
 */
async function sendContactNotification(data) {
  const transporter = getTransporter();

  if (!transporter) {
    console.error("✕ Skipping email — transporter not configured");
    return;
  }

  const { full_name, email, mobile, reason, message } = data;

  // Format current IST date/time
  const now = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium",
  });

  const mailOptions = {
    from: `"Portfolio Contact System" <${process.env.GMAIL_USER}>`,
    to: "shashankshinde38@gmail.com",
    replyTo: email,
    subject: `New Enquiry — ${reason} | ${full_name}`,
    html: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #222;">

  <p style="font-size: 16px; margin-bottom: 20px;">
    <strong>Hello Shashank,</strong>
  </p>

  <p style="font-size: 14px; color: #444; margin-bottom: 24px;">
    You have received a new message from your portfolio website.
  </p>

  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;" />

  <h2 style="font-size: 18px; color: #333; margin-bottom: 16px;">Contact Details</h2>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 8px;">
    <tr>
      <td style="padding: 8px 0; color: #666; width: 160px; vertical-align: top;"><strong>Full Name:</strong></td>
      <td style="padding: 8px 0; color: #222;">${full_name}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Email:</strong></td>
      <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Mobile Number:</strong></td>
      <td style="padding: 8px 0; color: #222;">${mobile || "Not provided"}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Reason for Contact:</strong></td>
      <td style="padding: 8px 0; color: #222;">${reason}</td>
    </tr>
  </table>

  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;" />

  <h2 style="font-size: 18px; color: #333; margin-bottom: 12px;">Message</h2>

  <div style="font-size: 14px; color: #333; line-height: 1.7; padding: 16px; background: #f9fafb; border-radius: 8px; border-left: 3px solid #4f46e5; white-space: pre-wrap; margin-bottom: 8px;">${message}</div>

  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;" />

  <h3 style="font-size: 15px; color: #333; margin-bottom: 12px;">Submission Details</h3>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 8px;">
    <tr>
      <td style="padding: 6px 0; color: #666; width: 160px;"><strong>Submitted On:</strong></td>
      <td style="padding: 6px 0; color: #222;">${now}</td>
    </tr>
    <tr>
      <td style="padding: 6px 0; color: #666;"><strong>Source:</strong></td>
      <td style="padding: 6px 0; color: #222;">Portfolio Contact Form</td>
    </tr>
  </table>

  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;" />

  <p style="font-size: 14px; color: #444; line-height: 1.6;">
    You can reply directly to this email or contact the sender using the information provided above.
  </p>

  <p style="font-size: 14px; color: #444; margin-top: 20px;">
    Best Regards,<br />
    <strong>Portfolio Contact System</strong>
  </p>

</div>
    `,
  };

  console.log("[Mailer] Sending email to shashankshinde38@gmail.com...");
  const info = await transporter.sendMail(mailOptions);
  console.log("[Mailer] ✓ Email sent — messageId:", info.messageId);
}

module.exports = { sendContactNotification };
