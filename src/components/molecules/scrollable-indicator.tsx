import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { LOADER_DURATION } from "@/constants/animations.config";
import { cn } from "@/lib/utils";

interface ScrollableIndicatorProps {
  className?: string;
  size?: number;
  title?: string;
}

export function ScrollableIndicator({
  className,
  size = 32,
  title = "Scroll indicator",
}: ScrollableIndicatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const didHideRef = useRef(false);
  const [dismissed, setDismissed] = useState(false);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const container = containerRef.current;
      if (!container) return;

      gsap.set(container, { opacity: 0, y: 12 });
      const showTween = gsap.to(container, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.inOut",
        delay: LOADER_DURATION + 8,
      });

      if (window.scrollY > 0) {
        didHideRef.current = true;
        setDismissed(true);
        showTween.kill();
        return;
      }

      const cleanup = () => {
        showTween.kill();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("wheel", onWheel as EventListener);
        window.removeEventListener("touchmove", onTouchMove as EventListener);
        window.removeEventListener("keydown", onKeyDown);
      };

      const hide = () => {
        if (didHideRef.current) return;
        didHideRef.current = true;
        cleanup();
        gsap.to(container, {
          opacity: 0,
          y: 12,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => setDismissed(true),
        });
      };

      const onScroll = () => {
        if (window.scrollY > 0) hide();
      };
      const onWheel = () => hide();
      const onTouchMove = () => hide();
      const onKeyDown = (e: KeyboardEvent) => {
        if (
          e.key === "ArrowDown" ||
          e.key === "PageDown" ||
          e.key === "End" ||
          e.key === " " ||
          e.code === "Space"
        ) {
          hide();
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("wheel", onWheel, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("keydown", onKeyDown);

      return cleanup;
    },
    { scope: containerRef },
  );

  if (dismissed) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute bottom-20 left-1/2 -translate-x-1/2 will-change-transform opacity-0 z-10",
        "pointer-events-none",
      )}
      aria-hidden
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        className={cn("inline-block shrink-0", className)}
        fill="currentColor"
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
      >
        {title ? <title>{title}</title> : null}

        <path d="M16.049 0c-4.941 0-9.047 4.007-9.047 8.948v14.104c0 4.942 4.105 8.948 9.047 8.948s8.948-4.007 8.948-8.948v-14.104c0-4.941-4.007-8.948-8.948-8.948v-0zM22.998 23.052c0 3.831-3.117 6.948-6.948 6.948s-7.047-3.117-7.047-6.948v-14.104c0-3.831 3.216-6.948 7.047-6.948s6.948 3.117 6.948 6.948v14.104z" />

        <path d="M16.011 6c-0.552 0-1 0.448-1 1v5c0 0.552 0.448 1 1 1s1-0.448 1-1v-5c0-0.552-0.448-1-1-1z">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 3; 0 0"
            dur="0.9s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}
