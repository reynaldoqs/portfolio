import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
  const backdropRef = useRef<HTMLButtonElement>(null);

  const closeWithAnimation = useCallback(() => {
    if (!backdropRef.current || !panelRef.current) {
      setIsMounted(false);
      onClosed?.();
      return;
    }

    gsap.killTweensOf([backdropRef.current, panelRef.current]);
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.18,
      ease: "power1.out",
    });
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
      if (!backdropRef.current || !panelRef.current) return;

      gsap.killTweensOf([backdropRef.current, panelRef.current]);
      gsap.set(panelRef.current, { transformOrigin: "100% 100%" });
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power1.out" },
      );
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.92, x: 22, y: 22 },
        { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.32, ease: "power3.out" },
      );
    },
    { dependencies: [isMounted] },
  );

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        className={cn(
          "absolute top-0 bottom-0 right-0 pointer-events-auto",
          contentAreaClassName,
        )}
        aria-modal="true"
        role="dialog"
      >
        <button
          type="button"
          ref={backdropRef}
          className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm"
          onClick={onClose}
          aria-label="Close modal"
        />

        <div
          ref={panelRef}
          className={cn(
            "absolute inset-0 bg-stone-950 border-l border-stone-800/60",
            className,
          )}
        >
          <div className="h-full w-full p-4 sm:p-6 md:p-8 overflow-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-stone-100 text-xl sm:text-2xl font-black">
                  AI Match
                </h2>
                <p className="text-stone-400 text-sm mt-1">
                  Este overlay cubre solo `#smooth-content`.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-stone-300 hover:text-stone-100 transition-colors text-sm font-bold"
              >
                Close
              </button>
            </div>

            <div className="mt-8 text-stone-300 text-sm leading-relaxed">
              Coloca aquí el contenido del AI Match.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

