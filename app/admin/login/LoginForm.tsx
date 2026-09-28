"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import { buttonClass } from "@/components/Button";
import { login, type LoginState } from "../actions";

const inputClass =
  "mt-2 block w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-pine transition-[border-color,box-shadow,background-color] hover:border-pine/30 focus:border-pine focus:bg-white focus:outline-none focus:ring-4 focus:ring-brass/25 aria-[invalid=true]:border-red-600";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, {} as LoginState);

  // Dispatch manually so the username stays filled in after a failed attempt.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => formAction(data));
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 rounded-3xl border border-line bg-white p-6 shadow-[0_24px_60px_-30px_rgba(15,47,42,0.25)] sm:p-8"
    >
      <label htmlFor="username" className="text-[15px] font-semibold text-pine">
        Username
      </label>
      <input
        id="username"
        name="username"
        type="text"
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        required
        aria-invalid={!!state.error}
        className={inputClass}
      />

      <label
        htmlFor="password"
        className="mt-5 block text-[15px] font-semibold text-pine"
      >
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        aria-invalid={!!state.error}
        aria-describedby={state.error ? "login-error" : undefined}
        className={inputClass}
      />

      {state.error && (
        <p
          id="login-error"
          role="alert"
          className="mt-4 text-sm font-medium text-red-700"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={buttonClass("primary", "mt-8 w-full")}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
