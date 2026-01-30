import { cn } from "@/lib/utils";
import { Icon } from "./icon";

interface StatItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
}

export function StatItem({ label, value, className, ...rest }: StatItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-sm bg-stone-900/60 px-3 py-1 backdrop-blur-sm",
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-black text-stone-200">{value}</span>
        <span className="text-[8px] font-bold tracking-wide text-stone-400 uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}
