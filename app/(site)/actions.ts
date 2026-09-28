"use server";

import { readApplication, validateApplication, type Errors } from "@/lib/careers";
import { insertApplication, SupabaseConfigError } from "@/lib/supabase";

export type ApplyState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; errors?: Errors; message?: string };

export async function submitApplication(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  // Honeypot: people never see this field, simple bots fill it in.
  if (String(formData.get("website") ?? "").trim()) return { status: "success" };

  const application = readApplication(formData);
  const errors = validateApplication(application);
  if (Object.keys(errors).length) return { status: "error", errors };

  try {
    await insertApplication({
      full_name: application.name,
      email: application.email,
      phone: application.phone || null,
      area_of_interest: application.interest,
      message: application.message,
    });
    return { status: "success" };
  } catch (err) {
    console.error("Careers application failed to save:", err);
    return {
      status: "error",
      message:
        err instanceof SupabaseConfigError
          ? "Applications can't be received right now. Please email us instead."
          : "Your application didn't go through. Check your connection and try again, or email us instead.",
    };
  }
}
