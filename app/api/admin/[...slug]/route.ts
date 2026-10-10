import { isAdminRequest, isSameOrigin, setAdminAccessCookie, signInAdmin, clearAdminAccessCookie, revokeAdminRequest } from "@/api/services/admin-auth";
import { noStoreJson, publicError, safeApiMessage } from "@/api/helpers/api-response";
import { enquiryStats } from "@/api/services/enquiries";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const action = slug?.[0];

  if (action === "dashboard") {
    try {
      if (!(await isAdminRequest(req))) return publicError("Unauthorized", 401);
      return noStoreJson({ success: true, ...(await enquiryStats()) });
    } catch (error: unknown) {
      return publicError(safeApiMessage(error, "Unable to load dashboard."), 500);
    }
  }

  if (action === "session") {
    return noStoreJson({ success: true, authenticated: await isAdminRequest(req) });
  }

  return publicError("Not Found", 404);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const action = slug?.[0];

  if (action === "login") {
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

  if (action === "logout") {
    if (!isSameOrigin(req)) return publicError("Request origin is not allowed.", 403);
    try {
      await revokeAdminRequest(req);
    } catch {
      console.warn("[admin] Supabase session revocation failed; clearing the local cookie.");
    }
    const response = noStoreJson({ success: true });
    clearAdminAccessCookie(response);
    return response;
  }

  return publicError("Not Found", 404);
}
