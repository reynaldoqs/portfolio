import { cn } from "@/lib/utils";

interface FuncLinkProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}
export function FuncLink({
  children,
  className,
  active,
  onClick,
}: FuncLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-stone-400 font-medium hover:text-stone-200 transition-colors duration-300",
        active && "text-stone-200",
        className,
      )}
    >
      <span className="text-indigo-500">Me</span>.{children}
      ()
    </button>
  );
}
