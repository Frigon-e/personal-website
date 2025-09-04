import React from "react";

export type DotSpec = {
  // absolute positioning within the nearest positioned ancestor
  style: React.CSSProperties;
  // Tailwind utility classes for size, color, and animation
  className?: string;
};

export type ColoredDotsProps = {
  // Optional predefined layout
  preset?: "header" | "cornerCluster" | "subtle" | "footer";
  // If provided, overrides preset dots completely
  dots?: DotSpec[];
  // Additional classes applied to the wrapper container
  className?: string;
  // Whether to hide from assistive tech
  ariaHidden?: boolean;
  // z-index layer control for better visibility management across sections
  layer?: "behind" | "normal" | "front";
};

// Small helper to merge class names without adding a runtime dep
function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function getPreset(preset?: ColoredDotsProps["preset"]): DotSpec[] {
  switch (preset) {
    case "cornerCluster":
      return [
        { style: { top: -6, left: 8 }, className: "h-2 w-2 rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 opacity-60 animate-pulse" },
        { style: { top: 24, left: 48 }, className: "h-1.5 w-1.5 rounded-full bg-primary/70 opacity-40 animate-[pulse_2s_ease-in-out_infinite]" },
        { style: { bottom: 20, left: 16 }, className: "h-1.5 w-1.5 rounded-full bg-emerald-400/70 opacity-40 animate-[pulse_2.5s_ease-in-out_infinite]" },
      ];
    case "subtle":
      return [
        { style: { top: 8, left: "20%" }, className: "h-1 w-1 rounded-full bg-primary/50 opacity-30 animate-[pulse_3s_ease-in-out_infinite]" },
        { style: { top: 32, right: "18%" as any }, className: "h-1 w-1 rounded-full bg-emerald-400/60 opacity-30 animate-[pulse_2.5s_ease-in-out_infinite]" },
      ];
    case "footer":
      return [
        { style: { bottom: 6, left: "8%" }, className: "h-1.5 w-1.5 rounded-full bg-primary/50 opacity-25 animate-[pulse_3s_ease-in-out_infinite]" },
        { style: { bottom: 12, right: "10%" as any }, className: "h-2 w-2 rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 opacity-30 animate-pulse" },
        { style: { bottom: 18, left: "35%" }, className: "h-1 w-1 rounded-full bg-emerald-400/60 opacity-25 animate-[pulse_2.5s_ease-in-out_infinite]" },
      ];
    case "header":
    default:
      // Matches the current header arrangement closely
      return [
        { style: { top: -16, left: 32 }, className: "h-2 w-2 rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 opacity-60 animate-pulse" },
        { style: { top: 40, right: 40 }, className: "h-1.5 w-1.5 rounded-full bg-primary/70 opacity-40 animate-[pulse_2s_ease-in-out_infinite]" },
        { style: { bottom: 24, left: 64 }, className: "h-1.5 w-1.5 rounded-full bg-emerald-400/70 opacity-40 animate-[pulse_2.5s_ease-in-out_infinite]" },
        { style: { bottom: -8, right: 96 }, className: "h-2 w-2 rounded-full bg-sky-400/70 opacity-40 animate-[pulse_3s_ease-in-out_infinite]" },
      ];
  }
}

export function ColoredDots({ preset = "header", dots, className, ariaHidden = true, layer = "behind" }: ColoredDotsProps) {
  const specs = dots ?? getPreset(preset);
  const zClass = layer === "front" ? "z-10" : layer === "normal" ? "z-0" : "-z-10";
  return (
    <div
      aria-hidden={ariaHidden}
      className={cx("pointer-events-none absolute inset-0", zClass, className)}
    >
      {specs.map((d, i) => (
        <div
          key={i}
          className={cx("absolute", d.className)}
          style={d.style}
        />
      ))}
    </div>
  );
}

export default ColoredDots;
