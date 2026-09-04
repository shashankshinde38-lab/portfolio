const express = require("express");
const router = express.Router();
const { insertMessage, fetchMessages, deleteMessage } = require("../config/db");
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

    // ── Insert into Supabase ──
    const { id: insertedId } = await insertMessage({
      full_name: full_name.trim(),
      email: email.trim(),
      mobile: mobile ? mobile.trim() : null,
      reason: reason.trim(),
      message: message.trim(),
    });

    // Send email notification (non-blocking — don't fail the response)
    try {
      await sendContactNotification({
        full_name: full_name.trim(),
        email: email.trim(),
        mobile: mobile ? mobile.trim() : null,
        reason: reason.trim(),
        message: message.trim(),
      });
      console.log("✓ Email notification sent for contact #" + insertedId);
    } catch (emailErr) {
      console.error("✕ Email notification failed (DB entry saved):", emailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: { id: insertedId },
    });
  } catch (err) {
    console.error("Error inserting contact message:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error. Please try again later.",
    });
  }
});

// GET /api/contact — Fetch all contact messages (optional: for admin)
router.get("/", async (req, res) => {
  try {
    const messages = await fetchMessages();

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

// DELETE /api/contact/:id — Delete a message by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteMessage(req.params.id);

    if (!deleted) {
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
