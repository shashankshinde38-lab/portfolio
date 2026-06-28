const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER || "shashankshinde38@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/**
 * Send email notification for a new contact enquiry.
 * @param {{ full_name: string, email: string, mobile?: string, reason: string, message: string }} data
 */
async function sendContactNotification(data) {
  const { full_name, email, mobile, reason, message } = data;

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.GMAIL_USER || "shashankshinde38@gmail.com"}>`,
    to: "shashankshinde38@gmail.com",
    subject: `📩 New Enquiry — ${reason} | ${full_name}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 24px 28px;">
          <h2 style="margin: 0; color: #ffffff; font-size: 20px;">📩 New Portfolio Enquiry</h2>
          <p style="margin: 6px 0 0; color: #e0e7ff; font-size: 13px;">Someone reached out via your portfolio contact form</p>
        </div>
        <div style="padding: 24px 28px; background: #ffffff;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 110px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${full_name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Mobile</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${mobile || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Reason</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="background: #eef2ff; color: #4f46e5; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;">${reason}</span>
              </td>
            </tr>
          </table>
          <div style="margin-top: 18px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #6366f1;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 8px;">Message</div>
            <div style="font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
        </div>
        <div style="padding: 16px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
          <p style="margin: 0; font-size: 11px; color: #94a3b8;">Sent from your Portfolio · shashank.qa</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendContactNotification };
