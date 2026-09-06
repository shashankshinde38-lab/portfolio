import { isSameOrigin, setAdminAccessCookie, signInAdmin } from "@/lib/admin-auth";
import { noStoreJson, publicError } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    if (!isSameOrigin(req)) return publicError("Request origin is not allowed.", 403);
    const body = await req.json().catch(() => ({}));
    const pin = typeof body.pin === "string" ? body.pin.trim() : "";

    if (!pin) return publicError("Enter the 6-digit password.", 400);
    if (pin.length < 6) return publicError("Password must be 6 digits.", 400);
    if (pin.length > 6 || !/^\d{6}$/.test(pin)) {
      return publicError("Password must be exactly 6 digits.", 400);
    }

    const result = await signInAdmin(pin);
    if (!result.ok && result.reason === "rate_limited") {
      return publicError("Too many attempts. Try again later.", 429);
    }
    if (!result.ok && result.reason === "unavailable") {
      return publicError("Authentication service is temporarily unavailable. Please try again.", 503);
    }
    if (!result.ok) return publicError("Incorrect password.", 401);

    const response = noStoreJson({ success: true });
    setAdminAccessCookie(response, result.sessionToken, result.expiresIn);
    return response;
  } catch {
    return publicError("Admin access is temporarily unavailable.", 503);
  }
}
