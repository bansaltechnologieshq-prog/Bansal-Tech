"use client";

import { useState, type FormEvent } from "react";
import { buttonClass } from "@/components/Button";
import { site } from "@/lib/site";

const interests = [
  "Engineering",
  "Design",
  "Product",
  "Operations",
  "Something else",
];

type Field = "name" | "email" | "phone" | "interest" | "message";
type Errors = Partial<Record<Field, string>>;

const inputClass =
  "block w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-pine transition-[border-color,box-shadow,background-color] placeholder:text-stone/60 hover:border-pine/30 focus:border-pine focus:bg-white focus:outline-none focus:ring-4 focus:ring-brass/25 aria-[invalid=true]:border-red-600";

const labelClass = "text-[15px] font-semibold text-pine";

function read(data: FormData, key: Field) {
  return String(data.get(key) ?? "").trim();
}

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!read(data, "name")) errors.name = "Enter your full name.";
  const email = read(data, "email");
  if (!email) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter an email address like name@example.com.";
  const phone = read(data, "phone");
  if (phone && !/^[+()\d\s-]{7,20}$/.test(phone))
    errors.phone = "Use digits, spaces, +, - or brackets only.";
  if (!read(data, "interest")) errors.interest = "Choose the area that fits you best.";
  if (read(data, "message").length < 10)
    errors.message = "Write at least a sentence about yourself.";
  return errors;
}

function buildMailto(data: FormData) {
  const subject = `Careers: ${read(data, "interest")}, ${read(data, "name")}`;
  const body = [
    `Full name: ${read(data, "name")}`,
    `Email: ${read(data, "email")}`,
    `Phone: ${read(data, "phone") || "Not provided"}`,
    `Area of interest: ${read(data, "interest")}`,
    "",
    read(data, "message"),
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function CareersForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [mailto, setMailto] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next = validate(data);
    setErrors(next);

    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const href = buildMailto(data);
    setMailto(href);
    window.location.href = href;
  }

  function clearError(field: Field) {
    if (!errors[field]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  const describedBy = (field: Field) =>
    errors[field] ? `${field}-error` : undefined;

  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-2 text-sm font-medium text-red-700">
        {errors[field]}
      </p>
    ) : null;

  if (mailto) {
    return (
      <div
        role="status"
        className="rounded-3xl bg-pine p-8 text-paper sm:p-12"
      >
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
          Your email app should now be open with your application filled in.
          Send that email to finish applying. This website doesn&apos;t send or
          store anything itself.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={mailto} className={buttonClass("brass")}>
            Open email again
          </a>
          <button
            type="button"
            onClick={() => setMailto(null)}
            className={buttonClass(
              "secondary",
              "border-paper/30 text-paper hover:border-paper hover:bg-pine-2",
            )}
          >
            Edit application
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-label="Careers application"
      className="rounded-3xl border border-line bg-white p-6 shadow-[0_24px_60px_-30px_rgba(15,47,42,0.25)] sm:p-10"
    >
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
            placeholder="What do you enjoy building, and what would you like to work on?"
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message")}
            onChange={() => clearError("message")}
            className={`mt-2 resize-y ${inputClass}`}
          />
          {errorText("message")}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className={buttonClass("primary", "w-full sm:w-auto")}>
          Submit Application
        </button>
        <p className="text-sm leading-relaxed text-stone sm:max-w-[16rem] sm:text-right">
          Opens your email app with everything filled in.
        </p>
      </div>
    </form>
  );
}
