import { cn } from "@/lib/utils";
import { Icon, type IconName } from "../atoms/icon";

interface ProfileMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  meta: {
    title: string;
    value: string;
    icon?: IconName;
  }[];
}

export function ProfileMeta({ meta, className, ...rest }: ProfileMetaProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 w-full",
        className,
      )}
      {...rest}
    >
      {meta.map((item) => (
        <div key={item.title} className="flex items-center gap-3 group">
          {item.icon && (
            <div className="flex items-center justify-center size-6 text-stone-400">
              <Icon name={item.icon} size={20} />
            </div>
          )}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
              {item.title}
            </h4>
            <p className="text-sm font-bold text-stone-300">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
