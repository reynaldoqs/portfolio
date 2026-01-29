import { cn } from "@/lib/utils";
import type { IconName } from "../atoms/icon";
import { Icon } from "../atoms/icon";

interface ShortcutButtonProps {
  icon?: IconName;
  text?: string;
  shortcut?: string;
  id?: string;
  className?: string;
  onClick?: () => void;
}

export function ShortcutButton({
  icon = "search",
  text = "Search something",
  shortcut = "J",
  id,
  className = "",
  onClick,
}: ShortcutButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "group flex items-center gap-2 cursor-pointer text-sm font-bold text-stone-400 bg-stone-800/60 backdrop-blur-sm px-6 py-2 rounded transition-all duration-200 hover:bg-indigo-950/70 hover:text-indigo-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] active:opacity-90",
        className,
      )}
      id={id}
      onClick={onClick}
    >
      <Icon
        name={icon}
        size={16}
        className="shrink-0 text-stone-400 group-hover:text-indigo-300 transition-colors"
      />
      <span>{text}</span>
      <span className="flex items-center gap-1.5 bg-stone-950 px-2 py-0.5 rounded text-stone-500 text-xs font-medium group-hover:bg-indigo-950/80 group-hover:text-indigo-300/90 transition-colors">
        <Icon name="command" size={12} /> + {shortcut}
      </span>
    </button>
  );
}
