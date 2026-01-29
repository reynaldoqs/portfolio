import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./icon";

interface TagTitleProps {
  title: string;
  className?: string;
  icon?: IconName;
  iconSize?: number;
}

export function TagTitle({
  title,
  className,
  icon = "external-link",
  iconSize = 22,
}: TagTitleProps) {
  return (
    <div
      className={cn(
        "text-sm shrink-0 bg-stone-300 text-stone-900 font-bold w-fit px-2 rotate-3",
        className,
      )}
    >
      {title}{" "}
      <Icon name={icon} size={iconSize} className="-translate-y-[2px]" />
    </div>
  );
}
