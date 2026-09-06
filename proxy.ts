import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_ACCESS_COOKIE } from "@/lib/admin-cookie";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = pathname === "/admin/login";
  const hasSessionCookie = Boolean(req.cookies.get(ADMIN_ACCESS_COOKIE)?.value);

  if (!hasSessionCookie && !isLogin) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
