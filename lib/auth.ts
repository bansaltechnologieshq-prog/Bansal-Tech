import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Single-admin authentication. Credentials live in environment variables;
 * a successful login sets an httpOnly cookie signed with ADMIN_SESSION_SECRET.
 */

export const SESSION_COOKIE = "bt_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function env(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set. Add it to .env.local.`);
  return value;
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest();
}

/** Constant-time string comparison (hashing first equalises lengths). */
function safeEqual(a: string, b: string) {
  return timingSafeEqual(sha256(a), sha256(b));
}

function sign(payload: string) {
  return createHmac("sha256", env("ADMIN_SESSION_SECRET"))
    .update(payload)
    .digest("base64url");
}

export function checkCredentials(username: string, password: string) {
  // Evaluate both so timing doesn't reveal which one was wrong.
  const userOk = safeEqual(username, env("ADMIN_USERNAME"));
  const passOk = safeEqual(password, env("ADMIN_PASSWORD"));
  return userOk && passOk;
}

export async function createSession() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `admin.${expires}`;
  const store = await cookies();
  store.set(SESSION_COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete({ name: SESSION_COOKIE, path: "/admin" });
}

export async function isAdmin() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const lastDot = token.lastIndexOf(".");
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  const [role, expires] = payload.split(".");

  if (role !== "admin" || !safeEqual(signature, sign(payload))) return false;
  return Number(expires) > Math.floor(Date.now() / 1000);
}
