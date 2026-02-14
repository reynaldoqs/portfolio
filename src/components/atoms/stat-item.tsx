import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./icon";

interface StatItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  icon?: IconName;
}

export function StatItem({
  label,
  value,
  icon,
  className,
  ...rest
}: StatItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-sm bg-stone-900/60 px-3 py-1.5 backdrop-blur-sm border-l-2 border-red-400/20",
        className,
      )}
      {...rest}
    >
      {icon && <Icon name={icon} size={16} className="text-red-400/60" />}
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-black text-stone-200">{value}</span>
        <span className="text-[8px] font-bold tracking-wide text-stone-400 uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}
