import { NextResponse } from "next/server";

export function publicError(message: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json(
    { success: false, message, ...extra },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

export function noStoreJson(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(body, { ...init, headers });
}

export function safeApiMessage(err: unknown, fallback = "Something went wrong. Please try again.") {
  if (process.env.NODE_ENV !== "production" && err instanceof Error) {
    console.error("[api]", err.message);
  } else if (err instanceof Error) {
    console.error("[api]", err.name);
  }
  return fallback;
}
