"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { submitApplication, type ApplyState } from "@/app/(site)/actions";
import { buttonClass } from "@/components/Button";
import {
  interests,
  limits,
  readApplication,
  validateApplication,
  type Errors,
  type Field,
} from "@/lib/careers";
import { site } from "@/lib/site";

const inputClass =
  "block w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-pine transition-[border-color,box-shadow,background-color] placeholder:text-stone/60 hover:border-pine/30 focus:border-pine focus:bg-white focus:outline-none focus:ring-4 focus:ring-brass/25 aria-[invalid=true]:border-red-600";

const labelClass = "text-[15px] font-semibold text-pine";

const initialState: ApplyState = { status: "idle" };

export function CareersForm() {
  const [state, formAction, pending] = useActionState(submitApplication, initialState);
  const [clientErrors, setClientErrors] = useState<Errors>({});
  const [dismissed, setDismissed] = useState<ApplyState | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Server-side validation errors take over from client ones after a submit.
  const serverErrors = state.status === "error" && state !== dismissed ? state.errors ?? {} : {};
  const errors: Errors = { ...serverErrors, ...clientErrors };
  const formMessage = state.status === "error" && state !== dismissed ? state.message : undefined;

  useEffect(() => {
    const first = Object.keys(serverErrors)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    // Only when a new server response arrives.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Dispatch manually (rather than <form action>) so React doesn't clear
  // the fields when the server reports a problem.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next = validateApplication(readApplication(data));
    setClientErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    startTransition(() => formAction(data));
  }

  function clearError(field: Field) {
    if (clientErrors[field]) {
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (serverErrors[field] || formMessage) setDismissed(state);
  }

  const describedBy = (field: Field) =>
    errors[field] ? `${field}-error` : undefined;

  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-2 text-sm font-medium text-red-700">
        {errors[field]}
      </p>
    ) : null;

  if (state.status === "success" && state !== dismissed) {
    return (
      <div role="status" className="rounded-3xl bg-pine p-8 text-paper sm:p-12">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-10 rounded-full bg-brass p-2 text-pine"
        >
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 className="display mt-8 text-3xl font-bold tracking-tight text-balance">
          Thanks for your interest. We&apos;ll be in touch.
        </h3>
        <p className="mt-4 max-w-md leading-relaxed text-paper/75">
          Your application has been received. If it&apos;s a good fit, we&apos;ll
          reply to the email address you gave us.
        </p>
        <button
          type="button"
          onClick={() => {
            setClientErrors({});
            setDismissed(state);
          }}
          className={buttonClass(
            "secondary",
            "mt-8 border-paper/30 text-paper hover:border-paper hover:bg-pine-2",
          )}
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-label="Careers application"
      className="rounded-3xl border border-line bg-white p-6 shadow-[0_24px_60px_-30px_rgba(15,47,42,0.25)] sm:p-10"
    >
      {/* Spam trap: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={labelClass}>
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={limits.name}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            onChange={() => clearError("name")}
            className={`mt-2 ${inputClass}`}
          />
          {errorText("name")}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={limits.email}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            onChange={() => clearError("email")}
            className={`mt-2 ${inputClass}`}
          />
          {errorText("email")}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number{" "}
            <span className="font-normal text-stone">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={limits.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            onChange={() => clearError("phone")}
            className={`mt-2 ${inputClass}`}
          />
          {errorText("phone")}
        </div>

        <fieldset
          className="sm:col-span-2"
          aria-describedby={describedBy("interest")}
        >
          <legend className={labelClass}>Area of Interest</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {interests.map((interest) => (
              <label key={interest} className="cursor-pointer">
                <input
                  type="radio"
                  name="interest"
                  value={interest}
                  onChange={() => clearError("interest")}
                  className="peer sr-only"
                />
                <span className="inline-flex h-11 items-center rounded-full border border-line bg-paper px-5 text-[15px] font-medium text-pine transition-colors select-none hover:border-pine/40 peer-checked:border-pine peer-checked:bg-pine peer-checked:text-paper peer-focus-visible:ring-4 peer-focus-visible:ring-brass/40">
                  {interest}
                </span>
              </label>
            ))}
          </div>
          {errorText("interest")}
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            maxLength={limits.message}
            placeholder="What do you enjoy building, and what would you like to work on?"
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message")}
            onChange={() => clearError("message")}
            className={`mt-2 resize-y ${inputClass}`}
          />
          {errorText("message")}
        </div>
      </div>

      {formMessage && (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
        >
          {formMessage}{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-2">
            {site.email}
          </a>
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className={buttonClass("primary", "w-full sm:w-auto sm:min-w-52")}
        >
          {pending ? "Sending application…" : "Submit Application"}
        </button>
        <p className="text-sm leading-relaxed text-stone sm:max-w-[17rem] sm:text-right">
          We only use these details to consider your application.
        </p>
      </div>
    </form>
  );
}
