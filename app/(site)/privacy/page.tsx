import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles information shared through this website.`,
};

const sections = [
  {
    title: "Information we collect",
    body: "This website does not require you to create an account. When you submit the careers form, we store the details you provide (your name, email address, optional phone number, area of interest, and message) in a secure database operated by our service provider, Supabase. If you email us, we receive whatever you choose to include.",
  },
  {
    title: "How we use information",
    body: "We use the information you send us only to respond to your enquiry or to consider your interest in working with us. We do not sell your personal information.",
  },
  {
    title: "Retention",
    body: "Careers applications and correspondence are kept only for as long as is reasonably necessary for the purpose they were shared, or as required by applicable law. Access to stored applications is restricted to authorised staff.",
  },
  {
    title: "Cookies and analytics",
    body: "This website does not use advertising or tracking cookies. Our hosting provider may process standard technical data, such as IP addresses and request logs, to deliver and secure the website.",
  },
  {
    title: "Your choices",
    body: "You may ask us to access, correct, or delete information you have shared with us by contacting us at the email address below.",
  },
  {
    title: "Changes to this policy",
    body: "We may update this policy from time to time. The latest version will always be available on this page.",
  },
];

export default function PrivacyPage() {
  return (
    <main id="top" className="flex-1">
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <Link
          href="/"
          className="text-sm text-stone transition-colors hover:text-pine"
        >
          ← Back to home
        </Link>
        <h1 className="mt-8 display text-4xl font-bold tracking-tight text-pine sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-stone">
          Last updated September 2026
        </p>
        <p className="mt-8 text-base leading-relaxed text-stone sm:text-lg">
          {site.name} respects your privacy. This policy explains what
          information we receive through this website and how we handle it.
        </p>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {sections.map((s) => (
            <section key={s.title} className="py-8">
              <h2 className="text-lg font-semibold tracking-tight text-pine">
                {s.title}
              </h2>
              <p className="mt-3 leading-relaxed text-stone">{s.body}</p>
            </section>
          ))}
          <section className="py-8">
            <h2 className="text-lg font-semibold tracking-tight text-pine">
              Contact
            </h2>
            <p className="mt-3 leading-relaxed text-stone">
              Questions about this policy can be sent to{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-pine underline underline-offset-4 hover:decoration-2"
              >
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
