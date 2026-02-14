import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="w-8 h-2 bg-red-400 rounded" />
      <span className="text-xs tracking-[0.3em] uppercase text-red-400 font-black">
        {children}
      </span>
      <span className="w-2 h-2 bg-red-400 rounded" />
    </div>
  );
}
