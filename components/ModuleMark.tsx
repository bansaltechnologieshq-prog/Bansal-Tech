import { markRows } from "@/lib/site";

const COLS = 7;
const ROWS = 9;

/**
 * The "B" monogram assembled from square modules on a 7×9 board.
 * Filled tiles build in once on load; any tile warms to brass under the pointer
 * and fades back, leaving a short trail.
 */
export function ModuleMark() {
  const cells = Array.from({ length: COLS * ROWS }, (_, i) => {
    const x = i % COLS;
    const y = Math.floor(i / COLS);
    const on = markRows[y - 1]?.[x - 1] === "#";
    return { x, y, on };
  });

  return (
    <div
      aria-hidden="true"
      className="grid aspect-[7/9] w-full grid-cols-7 gap-[6px] sm:gap-2"
    >
      {cells.map(({ x, y, on }) => (
        <span
          key={`${x}-${y}`}
          style={on ? { animationDelay: `${150 + (x + y) * 45}ms` } : undefined}
          className={`rounded-[22%] transition-colors duration-700 ease-out hover:bg-brass hover:duration-0 ${
            on
              ? "tile-on bg-pine"
              : "border border-line bg-paper/60 hover:border-brass"
          }`}
        />
      ))}
    </div>
  );
}
