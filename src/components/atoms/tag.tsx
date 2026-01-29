import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <div
      className={cn(
        "text-xs shrink-0 text-stone-400 font-bold w-fit px-3 py-1 rounded-md bg-stone-900 border border-stone-700",
        className,
      )}
    >
      {children}
    </div>
  );
}
