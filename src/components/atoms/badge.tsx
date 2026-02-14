import { useId } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  href: string;
  imageSrc: string;
  score: string | number;
  label: string;
  color?: string;
  borderColor?: string;
  className?: string;
  textClassName?: string;
}

const shieldPath = "M25 0 L50 6 L50 26 Q50 50 25 56 Q0 50 0 26 L0 6 Z";

export function Badge({
  href,
  imageSrc,
  score,
  label,
  color = "rgb(120 113 108)",
  borderColor = "rgba(0,0,0,0.35)",
  className,
  textClassName,
}: BadgeProps) {
  const id = useId().replace(/:/g, "");
  const fillGradId = `badge-fill-${id}`;
  const strokeGradId = `badge-stroke-${id}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "group relative flex h-[56px] w-[50px] shrink-0 overflow-hidden transition hover:opacity-90",
        className,
      )}
      style={{
        clipPath: `path('${shieldPath}')`,
        WebkitClipPath: `path('${shieldPath}')`,
      }}
    >
      <svg
        viewBox="0 0 50 56"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <title>Shield</title>
        <defs>
          <linearGradient
            id={fillGradId}
            gradientUnits="userSpaceOnUse"
            x1="25"
            y1="56"
            x2="25"
            y2="0"
          >
            <stop offset="0%" stopColor={color} />
            <stop offset="55%" stopColor={color} stopOpacity="0.95" />
            <stop offset="100%" stopColor="white" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id={strokeGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor={borderColor} />
          </linearGradient>
        </defs>
        <path
          d={shieldPath}
          fill={`url(#${fillGradId})`}
          stroke={`url(#${strokeGradId})`}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        {/* biome-ignore lint: external badge/achievement icons */}
        <img
          src={imageSrc}
          alt=""
          className="h-6 w-6 mt-1 object-contain absolute bottom-2"
        />
        <span
          className={cn(
            "absolute top-2 text-[10px] font-bold text-white block px-1 rounded bg-stone-950",
            textClassName,
          )}
        >
          {score}
        </span>
      </div>
    </a>
  );
}
