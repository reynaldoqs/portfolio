import { cn } from "@/lib/utils";

interface TagProps {
  tag: string;
  className?: string;
}

export function Tag({ tag, className }: TagProps) {
  return (
    <span
      className={cn(
        "text-xs text-stone-500 bg-stone-900/50 px-3 py-1.5 rounded",
        className,
      )}
    >
      {tag}
    </span>
  );
}
