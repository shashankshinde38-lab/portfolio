"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!pin) {
      setError("Enter the 6-digit password.");
      return;
    }
    if (pin.length !== 6) {
      setError("Password must be exactly 6 digits.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Authentication failed.");
        return;
      }
      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-card surface" onSubmit={submit} noValidate>
        <p className="admin-kicker">ADMIN ACCESS</p>
        <h1>Enter 6-digit password</h1>
        <label className="sr-only" htmlFor="admin-pin">
          6-digit password
        </label>
        <div className="admin-pin-wrap">
          <input
            id="admin-pin"
            className="admin-pin"
            type={showPassword ? "text" : "password"}
            /* type="password" */
            inputMode="numeric"
            autoComplete="current-password"
            pattern="[0-9]{6}"
            maxLength={6}
            autoFocus
            required
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="• • • • • •"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "admin-pin-error" : "admin-login-note"}
            disabled={loading}
          />
          <button
            type="button"
            className="admin-pin-toggle"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
            disabled={loading}
          >
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </div>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? <span className="admin-button-loading"><span className="loading-spinner" /> Authenticating…</span> : "UNLOCK"}
        </button>
        <p id="admin-login-note" className="admin-login-note">
          Secure environment PIN access
        </p>
        <div aria-live="polite">
          {error && (
            <p id="admin-pin-error" className="field-error" role="alert">
              {error}
            </p>
          )}
        </div>
        <a href="/" className="admin-back">
          Back to portfolio
        </a>
      </form>
    </div>
  );
}
