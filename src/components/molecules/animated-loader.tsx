import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { AnimatedLogo } from "@/components/atoms/animated-logo";
import { LOADER_DURATION } from "@/constants/animations.config";
import { cn } from "@/lib/utils";

interface AnimatedLoaderProps {
  className?: string;
  logoClassName?: string;
  logoSvgClassName?: string;
  logoTitle?: string;
  fadeDelaySeconds?: number;
  onComplete?: () => void;
}

export function AnimatedLoader({
  className,
  logoClassName,
  logoSvgClassName,
  logoTitle = "Loading",
  fadeDelaySeconds = LOADER_DURATION,
  onComplete,
}: AnimatedLoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      const root = document.documentElement;
      const body = document.body;
      const previousRootOverflow = root.style.overflow;
      const previousBodyOverflow = body.style.overflow;
      root.style.overflow = "hidden";
      body.style.overflow = "hidden";

      const tl = gsap.timeline();
      tl.to(overlay, {
        delay: fadeDelaySeconds,
        opacity: 0,
      });
      tl.to(overlay, {
        display: "none",
        onComplete: () => {
          root.style.overflow = previousRootOverflow;
          body.style.overflow = previousBodyOverflow;
          onComplete?.();
        },
      });

      return () => {
        tl.kill();
        root.style.overflow = previousRootOverflow;
        body.style.overflow = previousBodyOverflow;
      };
    },
    { scope: overlayRef },
  );

  return (
    <div
      ref={overlayRef}
      className={cn(
        "absolute w-full h-dvh top-0 left-0 flex justify-center items-center bg-stone-900 z-50",
        className,
      )}
    >
      <AnimatedLogo
        className={logoClassName}
        svgClassName={logoSvgClassName}
        title={logoTitle}
      />
    </div>
  );
}
