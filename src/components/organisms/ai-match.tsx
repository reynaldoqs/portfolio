import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { Streamdown } from "streamdown";
import { monoFont } from "@/constants/fonts";
import { analytics } from "@/lib/analytics";
import { useAiMatchStream } from "@/lib/hooks";
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
  const didTrackCompletionRef = useRef(false);
  const {
    textareaRef,
    requirements,
    setRequirements,
    markdown,
    status,
    error,
    isShowingResult,
    match,
    clear,
  } = useAiMatchStream();

  const closeWithAnimation = useCallback(() => {
    if (!panelRef.current) {
      setIsMounted(false);
      onClosed?.();
      return;
    }
    gsap.killTweensOf(panelRef.current);
    gsap.to(panelRef.current, {
      opacity: 0,
      x: 40,
      duration: 0.2,
      ease: "power2.in",
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

  useEffect(() => {
    if (status === "streaming") didTrackCompletionRef.current = false;
    if (status === "idle" && markdown && !didTrackCompletionRef.current) {
      didTrackCompletionRef.current = true;
      analytics.aiMatchSuccess();
    }
    if (status === "error" && !didTrackCompletionRef.current) {
      didTrackCompletionRef.current = true;
      analytics.aiMatchError();
    }
  }, [status, markdown]);

  const onPrimaryAction = useCallback(() => {
    if (isShowingResult) {
      analytics.aiMatchClear();
      clear();
      return;
    }
    analytics.aiMatchSubmit();
    match();
  }, [isShowingResult, clear, match]);

  useGSAP(
    () => {
      if (!isMounted || !panelRef.current) return;
      gsap.killTweensOf(panelRef.current);
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" },
      );
    },
    { dependencies: [isMounted] },
  );

  if (!isMounted) return null;

  const canSubmit = requirements.trim().length > 0;

  return (
    <div
      className={cn(
        monoFont.className,
        "fixed inset-0 z-50 pointer-events-none max-w-[1280px] mx-auto",
      )}
    >
      <div
        ref={panelRef}
        className={cn(
          "absolute top-0 bottom-0 right-0 pointer-events-auto",
          "bg-stone-950/95 backdrop-blur-md border-l border-stone-800/40",
          contentAreaClassName,
          className,
        )}
        aria-modal="true"
        role="dialog"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between px-5 py-4 border-b border-stone-800/40">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              {isShowingResult ? "analysis" : "input"}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-stone-500 hover:text-stone-300 transition-colors text-xs tracking-wider"
            >
              [esc]
            </button>
          </header>

          {/* Content */}
          <div className="flex-1 min-h-0 overflow-auto px-5 py-6">
            {isShowingResult ? (
              error ? (
                <p className="text-xs text-red-400/90 font-medium">{error}</p>
              ) : (
                <div className="prose-invert prose-sm prose-stone max-w-none">
                  <Streamdown isAnimating={status === "streaming"}>
                    {markdown}
                  </Streamdown>
                </div>
              )
            ) : (
              <div className="h-full flex flex-col">
                <label
                  htmlFor="ai-match-input"
                  className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400 mb-3"
                >
                  Role requirements
                </label>
                <textarea
                  id="ai-match-input"
                  ref={textareaRef}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (canSubmit) onPrimaryAction();
                    }
                  }}
                  placeholder="Paste job description..."
                  className={cn(
                    "flex-1 w-full text-[13px] leading-relaxed resize-none",
                    "bg-transparent text-stone-200 placeholder:text-stone-500",
                    "border-0 p-0 outline-none",
                  )}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="px-5 py-4 border-t border-stone-800/40">
            <button
              type="button"
              onClick={onPrimaryAction}
              disabled={!isShowingResult && !canSubmit}
              className={cn(
                "w-full py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all",
                "border border-stone-700/50",
                isShowingResult
                  ? "text-stone-400 hover:text-stone-200 hover:border-stone-600"
                  : canSubmit
                    ? "text-stone-200 bg-stone-800/50 hover:bg-stone-700/50"
                    : "text-stone-400 cursor-not-allowed",
              )}
            >
              {isShowingResult ? "Clear" : "Match →"}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
