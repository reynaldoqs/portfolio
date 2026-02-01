import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { monoFont } from "@/constants/fonts";
import { cn } from "@/lib/utils";
import { Icon } from "../atoms";
import { MatchHeader } from "../molecules";

interface AiMatchModalProps {
  open: boolean;
  onClose: () => void;
  onClosed?: () => void;
  contentAreaClassName?: string;
  className?: string;
}

export function AiMatchModal({
  open,
  onClose,
  onClosed,
  contentAreaClassName = "left-[100px] sm:left-[230px] md:left-[280px]",
  className,
}: AiMatchModalProps) {
  const [isMounted, setIsMounted] = useState(open);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeWithAnimation = useCallback(() => {
    if (!panelRef.current) {
      setIsMounted(false);
      onClosed?.();
      return;
    }

    gsap.killTweensOf(panelRef.current);
    gsap.to(panelRef.current, {
      opacity: 0,
      scale: 0.97,
      x: 12,
      y: 12,
      duration: 0.22,
      ease: "power2.inOut",
      onComplete: () => {
        setIsMounted(false);
        onClosed?.();
      },
    });
  }, [onClosed]);

  useEffect(() => {
    if (open) setIsMounted(true);
    if (!open && isMounted) closeWithAnimation();
  }, [open, isMounted, closeWithAnimation]);

  useEffect(() => {
    if (!isMounted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMounted, onClose]);

  useGSAP(
    () => {
      if (!isMounted) return;
      if (!panelRef.current) return;

      gsap.killTweensOf(panelRef.current);
      gsap.set(panelRef.current, { transformOrigin: "100% 100%" });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.92, x: 22, y: 22 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.32,
          ease: "power3.out",
        },
      );
    },
    { dependencies: [isMounted] },
  );

  if (!isMounted) return null;

  return (
    <div
      className={`${monoFont.className} absolute inset-0 z-50 pointer-events-none max-w-[1280px] mx-auto`}
    >
      <div
        className={cn(
          "absolute top-0 bottom-0 right-0 pointer-events-auto",
          contentAreaClassName,
        )}
        aria-modal="true"
        role="dialog"
      >
        <div
          ref={panelRef}
          className={cn(
            "absolute inset-0 bg-stone-950/70 backdrop-blur-sm border-l border-stone-800/60",
            className,
          )}
        >
          <div className="h-full w-full flex flex-col gap-4 p-4 sm:p-6 md:p-8 overflow-auto">
            <MatchHeader onClose={onClose} />

            <div className="bg-stone-900/80 flex-1 rounded-2xl p-4 md:p-6 flex flex-col">
              <textarea
                placeholder="Tell me what you're looking for…"
                className={cn(
                  "w-full flex-1 min-h-0 text-sm resize-none bg-transparent text-stone-100 placeholder:text-stone-500",
                  "border-0 p-0 outline-none appearance-none shadow-none",
                  "focus:outline-none focus:ring-0 focus:shadow-none",
                  "focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none",
                )}
              />
              <button
                type="button"
                className="text-stone-100 text-sm font-bold self-end cursor-pointer"
              >
                Match <Icon name="upload" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
