import { cn } from "@/lib/utils";
import { Icon } from "../atoms";

interface MatchHeaderProps {
  onClose: () => void;
  className?: string;
}

export function MatchHeader({ onClose, className }: MatchHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <p className="text-stone-100 text-sm md:text-base font-bold">
        +_+{" "}
        <span className="text-stone-400 text-xs md:text-sm font-normal">
          Enter the role requirements.
        </span>
      </p>
      <button type="button" onClick={onClose}>
        <Icon name="close" size={20} />
      </button>
    </div>
  );
}
