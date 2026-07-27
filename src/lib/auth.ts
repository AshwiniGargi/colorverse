import "server-only";
import { currentUser } from "@clerk/nextjs/server";
import { env } from "@/lib/env";

const allowedAdminEmails = new Set(
  env.ADMIN_EMAIL_ALLOWLIST.split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
);

export async function requireAdminUser() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress.toLowerCase();

  if (!email || !allowedAdminEmails.has(email)) {
    throw new Error("Admin access is not permitted for this user.");
  }

  return user;
}
