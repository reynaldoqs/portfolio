import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { LOADER_DURATION } from "@/constants/animations.config";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
  svgClassName?: string;
  title?: string;
}

export function AnimatedLogo({
  className,
  svgClassName,
  title = "Logo",
}: AnimatedLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const path = pathRef.current;
      if (!container || !path) return;

      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: "transparent",
        stroke: "white",
        strokeWidth: 1.5,
      });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(path, {
        strokeDashoffset: 0,
        duration: LOADER_DURATION - 0.3,
        delay: 0.5,
      })
        .to(
          path,
          {
            fill: "white",
            duration: 1.2,
          },
          "-=0.8",
        )
        .to(
          container,
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
          },
          0,
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={cn("opacity-0 translate-y-4", className)}
      style={{ willChange: "transform, opacity" }}
    >
      <svg
        role="img"
        aria-label={title}
        viewBox="0 0 500 500"
        className={cn("w-64 h-64 md:w-80 md:h-80", svgClassName)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{title}</title>
        <path
          ref={pathRef}
          d="M135.5,410.5C120,405 105,370 115,280C125,190 170,100 240,65C310,30 420,40 445,140C465,220 425,290 350,315C370,340 410,380 435,405C450,420 460,425 455,445C450,465 410,465 385,445C350,415 315,365 295,335C275,340 247.843,338.414 222.843,318.414L252.44,278.52C258.676,282.262 265.378,285.797 272.403,288.654C293.045,297.049 317.484,300.011 340,285C390,255 415,200 400,150C385,100 315,85 265,110C210,135 170,220 160,290C155,340 155.513,377.353 170.92,375.44C186.327,373.527 232.44,303.52 252.44,278.52C252.44,278.52 267.206,286.488 272.403,288.654C282.337,292.795 293.322,294.725 293.322,294.725C268.322,329.725 160,420 135.5,410.5Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
