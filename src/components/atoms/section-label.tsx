import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 mb-3", className)}>
      <span className="w-8 h-px bg-indigo-500/50" />
      <span className="text-xs tracking-[0.3em] uppercase text-indigo-400/80 font-medium">
        {children}
      </span>
    </div>
  );
}
