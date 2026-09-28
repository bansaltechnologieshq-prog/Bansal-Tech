import { buttonClass } from "@/components/Button";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { site } from "@/lib/site";

export function Contact() {
  const [user, domain] = site.email.split("@");

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-16 px-3 pb-3 sm:px-5 sm:pb-5"
    >
      <div className="mx-auto max-w-[76rem] rounded-[2rem] bg-mist px-5 py-16 sm:px-12 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2
            id="contact-title"
            className="display text-[clamp(2.4rem,5.5vw,3.75rem)] leading-[1] font-bold tracking-[-0.03em]"
          >
            Get in touch
          </h2>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-stone sm:text-lg">
            Questions, ideas, or introductions. Write to us and we&apos;ll reply
            by email.
          </p>

          <a
            href={`mailto:${site.email}`}
            className="display mt-12 block text-[clamp(1.35rem,4.4vw,3.25rem)] leading-tight font-bold tracking-[-0.02em] text-pine decoration-brass decoration-[3px] underline-offset-[10px] transition-colors hover:text-pine-2 hover:underline"
          >
            {user}
            <wbr />
            <span className="text-stone">@{domain}</span>
          </a>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${site.email}`}
              className={buttonClass("primary", "w-full sm:w-auto")}
            >
              Email Us
            </a>
            <CopyEmailButton email={site.email} />
          </div>
        </div>
      </div>
    </section>
  );
}
