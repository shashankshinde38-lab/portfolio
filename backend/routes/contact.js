const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");
const { sendContactNotification } = require("../config/mailer");

// POST /api/contact — Submit a contact message
router.post("/", async (req, res) => {
  try {
    const { full_name, email, mobile, reason, message } = req.body;

    // ── Validation ──
    const errors = {};

    if (!full_name || !full_name.trim()) {
      errors.full_name = "Full name is required";
    }

    if (!email || !email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (mobile && mobile.trim()) {
      const digits = mobile.replace(/\D/g, "");
      if (digits.length !== 10) {
        errors.mobile = "Mobile number must be exactly 10 digits";
      }
    }

    if (!reason || !reason.trim()) {
      errors.reason = "Please select a reason for contact";
    }

    if (!message || !message.trim()) {
      errors.message = "Message is required";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // ── Insert into database ──
    const [result] = await pool.execute(
      `INSERT INTO contact_messages (full_name, email, mobile, reason, message) VALUES (?, ?, ?, ?, ?)`,
      [
        full_name.trim(),
        email.trim(),
        mobile ? mobile.trim() : null,
        reason.trim(),
        message.trim(),
      ]
    );

    // Send email notification (non-blocking — don't fail the response)
    try {
      await sendContactNotification({
        full_name: full_name.trim(),
        email: email.trim(),
        mobile: mobile ? mobile.trim() : null,
        reason: reason.trim(),
        message: message.trim(),
      });
      console.log("✓ Email notification sent for contact #" + result.insertId);
    } catch (emailErr) {
      console.error("✕ Email notification failed (DB entry saved):", emailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: { id: result.insertId },
    });
  } catch (err) {
    console.error("Error inserting contact message:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
});

// GET /api/contact — Fetch all contact messages (optional: for admin)
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM contact_messages ORDER BY created_at DESC`
    );

    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

// GET /api/contact/:id — Fetch a single message by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM contact_messages WHERE id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    console.error("Error fetching contact message:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

// DELETE /api/contact/:id — Delete a message by ID
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.execute(
      `DELETE FROM contact_messages WHERE id = ?`,
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting contact message:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

module.exports = router;
