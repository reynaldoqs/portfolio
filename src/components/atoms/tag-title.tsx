import { cn } from "@/lib/utils";

interface TagTitleProps {
  title: string;
  className?: string;
}

export function TagTitle({ title, className }: TagTitleProps) {
  return (
    <div
      className={cn(
        "text-sm shrink-0 bg-stone-300 text-stone-900 font-bold w-fit px-1 rotate-3",
        className,
      )}
    >
      {title} {"->"}
    </div>
  );
}
