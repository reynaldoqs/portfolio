import { monoFont } from "@/constants/fonts";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

interface ShortcutProps extends React.HTMLAttributes<HTMLDivElement> {
  shortcutKeys: string[];
  shortcut: string;
}

export function Shortcut({ shortcutKeys, shortcut, ...rest }: ShortcutProps) {
  return (
    <div className={cn(monoFont.className, "inline-flex gap-3")} {...rest}>
      <span className="flex items-center gap-1.5 bg-black px-2 py-1 rounded text-stone-400 text-xs font-bold">
        <Icon name="command" size={10} /> + {shortcutKeys.join(" + ")}
      </span>
      <span className="text-xs font-medium text-stone-400">{shortcut}</span>
    </div>
  );
}
