import type { ComponentPropsWithoutRef } from "react";
import { Icon } from "@/components/atoms/icon";
import { cn } from "@/lib/utils";

type AiMatchButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "type" | "children"
> & {
  label?: string;
};

export function AiMatchButton({
  className,

  ...props
}: AiMatchButtonProps) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      className={cn(
        "group absolute z-40 bottom-6 right-6 inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-black tracking-wide text-stone-100 bg-stone-950/90 backdrop-blur border border-stone-700/60 ring-1 ring-white/5 shadow-lg shadow-black/40 transition-all hover:bg-stone-900 hover:border-stone-600/70 hover:shadow-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-200/70 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 active:translate-y-px",
        className,
      )}
      {...props}
    >
      <Icon
        name="open-ai"
        size={24}
        className="text-stone-200 transition-transform group-hover:-rotate-6 group-hover:scale-105"
        title="OpenAI"
      />
    </button>
  );
}
