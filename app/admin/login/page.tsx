import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonClass } from "@/components/Button";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  if (await isAdmin()) redirect("/admin");
  const { signedOut } = await searchParams;

  return (
    <div className="mx-auto flex max-w-md flex-col px-5 py-16 sm:py-24">
      {signedOut && (
        <div
          role="status"
          className="mb-10 rounded-3xl bg-pine p-6 text-paper sm:p-8"
        >
          <p className="text-lg font-bold tracking-tight">You&apos;ve signed out.</p>
          <p className="mt-1 text-paper/75">
            Head back to the website, or sign in again below.
          </p>
          <Link href="/" className={buttonClass("brass", "mt-6 w-full sm:w-auto")}>
            Go to home page
          </Link>
        </div>
      )}

      <h1 className="display text-4xl font-bold tracking-[-0.03em] text-pine">
        Sign in
      </h1>
      <p className="mt-3 text-stone">Sign in to view careers applications.</p>
      <LoginForm />

      {!signedOut && (
        <Link
          href="/"
          className="mt-8 self-center rounded-full px-4 py-2 text-[15px] font-medium text-stone transition-colors hover:bg-mist hover:text-pine"
        >
          Back to home page
        </Link>
      )}
    </div>
  );
}
