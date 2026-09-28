import { ButtonLink } from "@/components/Button";
import { ModuleMark } from "@/components/ModuleMark";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-12 pb-20 sm:px-8 sm:pt-20 sm:pb-28 lg:grid-cols-[1.35fr_1fr] lg:gap-20 lg:pt-24 lg:pb-32">
        <div className="order-2 lg:order-1">
          <h1
            id="hero-title"
            className="display rise text-[clamp(3.4rem,10vw,7.25rem)] leading-[0.9] font-extrabold tracking-[-0.04em] text-pine"
          >
            {site.name}
          </h1>

          <p className="rise mt-7 text-xl font-semibold tracking-tight text-pine sm:text-2xl [animation-delay:80ms]">
            {site.tagline}
          </p>

          <p className="rise mt-3 max-w-[34rem] text-[17px] leading-relaxed text-pretty text-stone sm:text-lg [animation-delay:140ms]">
            We build practical technology solutions with a focus on simplicity,
            reliability, and long-term value.
          </p>

          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row [animation-delay:200ms]">
            <ButtonLink href="/#careers" className="w-full sm:w-auto">
              Explore Careers
            </ButtonLink>
            <ButtonLink
              href="/#contact"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Get in Touch
            </ButtonLink>
          </div>
        </div>

        <div className="order-1 mx-auto w-40 sm:w-52 lg:order-2 lg:w-full lg:max-w-[340px]">
          <ModuleMark />
        </div>
      </div>
    </section>
  );
}
