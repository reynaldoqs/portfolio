import { cn } from "@/lib/utils";
import { Shortcut } from "../atoms/shortcut";

interface ShortcutListProps extends React.HTMLAttributes<HTMLDivElement> {
  shortcuts: {
    shortcutKeys: string[];
    shortcut: string;
  }[];
}

export function ShortcutList({ shortcuts, ...rest }: ShortcutListProps) {
  return (
    <div {...rest}>
      <h4 className="text-sm font-medium text-stone-300">Profile shortcuts:</h4>
      <ul className={cn("flex flex-col gap-2 mt-4")}>
        {shortcuts.map((shortcut) => (
          <li key={shortcut.shortcut}>
            <Shortcut
              shortcutKeys={shortcut.shortcutKeys}
              shortcut={shortcut.shortcut}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
