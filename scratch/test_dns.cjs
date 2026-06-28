const nodemailer = require("nodemailer");
const dns = require("dns").promises;

async function test() {
  try {
    const { address } = await dns.lookup("smtp.gmail.com", { family: 4 });
    console.log("Resolved IPv4 Address:", address);

    const transporter = nodemailer.createTransport({
      host: address,
      port: 587,
      secure: false,
      auth: {
        user: "sshindeshashankk@gmail.com",
        pass: "jybciumvbpgukmxr",
      },
      tls: {
        servername: "smtp.gmail.com",
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
      },
    });

    console.log("Verifying connection...");
    await transporter.verify();
    console.log("✓ Success!");
  } catch (err) {
    console.error("✕ Failed:", err);
  }
}

test();
