const path = require("path");
const { Pool } = require("pg");
const { createClient } = require("@supabase/supabase-js");

// Load .env from backend folder or current working directory
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config();

const SUPABASE_URL = process.env.SUPABASE_URL || "https://tuxkcnsywuhujoddinhm.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const connectionString = process.env.DATABASE_URL;

// 1. Initialize Supabase JS client if key is available
let supabase = null;
if (SUPABASE_URL && SUPABASE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log("✓ Supabase Client initialized for:", SUPABASE_URL);
}

// 2. Initialize PostgreSQL connection pool if DATABASE_URL is available
let pool = null;
if (connectionString) {
  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: true,
    },
  });
}

// Unified Database Helpers
async function insertMessage({ full_name, email, mobile, reason, message }) {
  // If Supabase API client is available
  if (supabase) {
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          full_name,
          email,
          mobile: mobile || null,
          reason,
          message,
          status: "new",
        },
      ])
      .select("id");

    if (error) throw error;
    return { id: data?.[0]?.id || Date.now() };
  }

  // Fallback to PostgreSQL pool if configured
  if (pool) {
    const result = await pool.query(
      `INSERT INTO contact_messages (full_name, email, mobile, reason, message, status) VALUES ($1, $2, $3, $4, $5, 'new') RETURNING id`,
      [full_name, email, mobile || null, reason, message]
    );
    return { id: result.rows[0]?.id };
  }

  throw new Error("No database credentials configured. Please set SUPABASE_SERVICE_ROLE_KEY (or DATABASE_URL) in backend/.env");
}

async function fetchMessages() {
  if (supabase) {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("id,full_name,email,mobile,reason,message,status,created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  if (pool) {
    const result = await pool.query(
      `SELECT id, full_name, email, mobile, reason, message, status, created_at FROM contact_messages ORDER BY created_at DESC`
    );
    return result.rows;
  }

  throw new Error("No database credentials configured.");
}

async function deleteMessage(id) {
  if (supabase) {
    const { error, count } = await supabase
      .from("contact_messages")
      .delete({ count: "exact" })
      .eq("id", id);

    if (error) throw error;
    return count > 0;
  }

  if (pool) {
    const result = await pool.query(
      `DELETE FROM contact_messages WHERE id = $1`,
      [id]
    );
    return result.rowCount > 0;
  }

  throw new Error("No database credentials configured.");
}

async function testConnection() {
  console.log(`▸ Supabase Project: ${SUPABASE_URL}`);
  if (supabase) {
    console.log("✓ Supabase Client is ready to accept queries");
  } else if (pool) {
    try {
      const client = await pool.connect();
      const res = await client.query("SELECT current_database();");
      console.log(`✓ PostgreSQL connected via connection pool — Database: ${res.rows[0].current_database}`);
      client.release();
    } catch (err) {
      console.error("✕ PostgreSQL connection failed:", err.message);
    }
  } else {
    console.warn("⚠ Waiting for SUPABASE_SERVICE_ROLE_KEY (or DATABASE_URL) in backend/.env");
  }
}

module.exports = {
  supabase,
  pool,
  insertMessage,
  fetchMessages,
  deleteMessage,
  testConnection,
};
