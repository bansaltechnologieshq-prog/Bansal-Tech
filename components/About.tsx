const principles = [
  {
    title: "Simplicity",
    body: "Clear, focused solutions that are easy to understand and use.",
  },
  {
    title: "Reliability",
    body: "Technology that works consistently, day after day.",
  },
  {
    title: "Long-term value",
    body: "Considered decisions, made with the future in mind.",
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-16 bg-pine text-paper"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <h2
            id="about-title"
            className="display text-[clamp(2.4rem,6vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.03em] text-balance"
          >
            Technology, built with purpose.
          </h2>
          <p className="max-w-[34rem] text-[17px] leading-relaxed text-pretty text-paper/75 sm:text-lg">
            Bansal Tech is a privately operated technology company. We focus on
            building useful, reliable technology solutions: thoughtfully
            designed, and carefully maintained.
          </p>
        </div>

        <ul className="mt-16 grid gap-10 sm:mt-20 sm:grid-cols-3 sm:gap-0">
          {principles.map((p) => (
            <li
              key={p.title}
              className="border-t-2 border-brass pt-6 sm:border-t-0 sm:border-l sm:border-paper/15 sm:px-8 sm:pt-0 sm:first:border-l-0 sm:first:pl-0"
            >
              <h3 className="text-xl font-bold tracking-tight text-brass-soft">
                {p.title}
              </h3>
              <p className="mt-2 max-w-xs leading-relaxed text-paper/70">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
