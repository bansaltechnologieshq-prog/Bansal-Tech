import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { interests } from "@/lib/careers";
import { listApplications, SupabaseConfigError, type ApplicationRow } from "@/lib/supabase";
import { logout } from "./actions";

export const metadata: Metadata = { title: "Careers applications" };

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

async function load(): Promise<{ rows: ApplicationRow[] } | { error: string }> {
  try {
    return { rows: await listApplications() };
  } catch (err) {
    console.error("Loading applications failed:", err);
    return {
      error:
        err instanceof SupabaseConfigError
          ? "Supabase isn't connected yet. Add SUPABASE_URL and SUPABASE_SECRET_KEY to .env.local, then restart the server."
          : "Applications couldn't be loaded from Supabase. Check that the career_applications table exists and the keys are correct, then reload.",
    };
  }
}

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  if (!(await isAdmin())) redirect("/admin/login");

  const { interest } = await searchParams;
  const filter = typeof interest === "string" ? interest : undefined;
  const result = await load();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="display text-4xl font-bold tracking-[-0.03em] text-pine">
            Careers applications
          </h1>
          {"rows" in result && (
            <p className="mt-2 text-stone">
              {result.rows.length === 0
                ? "No applications yet."
                : `${result.rows.length} ${result.rows.length === 1 ? "application" : "applications"}, newest first.`}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-[15px] font-medium text-stone transition-colors hover:bg-white hover:text-pine"
          >
            View website
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-pine/20 px-5 py-2 text-[15px] font-semibold text-pine transition-colors hover:border-pine hover:bg-white"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      {"error" in result ? (
        <p
          role="alert"
          className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6 font-medium text-red-800"
        >
          {result.error}
        </p>
      ) : (
        <Applications rows={result.rows} filter={filter} />
      )}
    </div>
  );
}

function Applications({ rows, filter }: { rows: ApplicationRow[]; filter?: string }) {
  if (rows.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-dashed border-line bg-paper p-10 text-center">
        <p className="font-semibold text-pine">Nothing here yet</p>
        <p className="mt-1 text-stone">
          Applications from the Careers section will appear here as soon as
          they&apos;re submitted.
        </p>
      </div>
    );
  }

  const counts = new Map<string, number>();
  for (const r of rows) counts.set(r.area_of_interest, (counts.get(r.area_of_interest) ?? 0) + 1);
  const shown = filter ? rows.filter((r) => r.area_of_interest === filter) : rows;

  const chip = (label: string, href: string, active: boolean, count: number) => (
    <Link
      key={label}
      href={href}
      aria-current={active ? "page" : undefined}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-paper px-4 text-[15px] font-medium text-pine transition-colors hover:border-pine/40 aria-[current=page]:border-pine aria-[current=page]:bg-pine aria-[current=page]:text-paper"
    >
      {label}
      <span className="text-sm opacity-60">{count}</span>
    </Link>
  );

  return (
    <>
      <nav aria-label="Filter by area of interest" className="mt-8 flex flex-wrap gap-2">
        {chip("All", "/admin", !filter, rows.length)}
        {interests
          .filter((i) => counts.has(i))
          .map((i) =>
            chip(i, `/admin?interest=${encodeURIComponent(i)}`, filter === i, counts.get(i) ?? 0),
          )}
      </nav>

      {shown.length === 0 ? (
        <p className="mt-8 text-stone">
          No applications for {filter}.{" "}
          <Link href="/admin" className="font-semibold text-pine underline underline-offset-4">
            Show all
          </Link>
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {shown.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl border border-line bg-white p-5 sm:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h2 className="text-lg font-bold tracking-tight text-pine">
                    {r.full_name}
                  </h2>
                  <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[15px]">
                    <a
                      href={`mailto:${r.email}`}
                      className="break-all text-pine underline decoration-line underline-offset-4 hover:decoration-pine"
                    >
                      {r.email}
                    </a>
                    {r.phone && (
                      <a
                        href={`tel:${r.phone.replace(/[^\d+]/g, "")}`}
                        className="text-stone hover:text-pine"
                      >
                        {r.phone}
                      </a>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
                  <span className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-pine">
                    {r.area_of_interest}
                  </span>
                  <time dateTime={r.created_at} className="text-sm text-stone">
                    {dateFormat.format(new Date(r.created_at))}
                  </time>
                </div>
              </div>
              <p className="mt-4 max-w-[70ch] leading-relaxed whitespace-pre-line text-stone">
                {r.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
