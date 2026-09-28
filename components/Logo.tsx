import { SectionLink } from "@/components/SectionLink";
import { markRows, site } from "@/lib/site";

/** Small static SVG version of the module mark. */
export function MarkGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 5 7"
      aria-hidden="true"
      className={className}
      shapeRendering="crispEdges"
    >
      {markRows.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "#" ? (
            <rect
              key={`${x}-${y}`}
              x={x + 0.08}
              y={y + 0.08}
              width={0.84}
              height={0.84}
              fill="currentColor"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

export function Logo({
  onClick,
  tone = "dark",
}: {
  onClick?: () => void;
  tone?: "dark" | "light";
}) {
  return (
    <SectionLink
      href="/#top"
      onClick={onClick}
      aria-label={`${site.name}, home`}
      className={`group inline-flex items-center gap-2.5 rounded-sm text-[17px] font-bold tracking-tight ${
        tone === "dark" ? "text-pine" : "text-paper"
      }`}
    >
      <MarkGlyph className="h-6 w-auto text-brass transition-transform duration-300 group-hover:scale-110" />
      {site.name}
    </SectionLink>
  );
}
