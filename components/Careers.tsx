import { CareersForm } from "@/components/CareersForm";

const steps = [
  "Tell us about yourself and what you'd like to work on.",
  "Submit the form. Your application goes straight to our team.",
  "If there's a good fit, we'll reply by email.",
];

export function Careers() {
  return (
    <section
      id="careers"
      aria-labelledby="careers-title"
      className="scroll-mt-16"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2
            id="careers-title"
            className="display text-[clamp(2.4rem,5.5vw,3.75rem)] leading-[1] font-bold tracking-[-0.03em] text-balance"
          >
            Build with Bansal Tech
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-pretty text-stone sm:text-lg">
            We&apos;re always interested in connecting with curious, motivated
            people who enjoy building technology.
          </p>

          <h3 className="mt-12 text-sm font-semibold text-pine">
            How applying works
          </h3>
          <ol className="mt-4 space-y-4">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-7 shrink-0 place-items-center rounded-full bg-mist text-sm font-bold text-pine"
                >
                  {i + 1}
                </span>
                <span className="pt-0.5 leading-relaxed text-stone">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <CareersForm />
      </div>
    </section>
  );
}
