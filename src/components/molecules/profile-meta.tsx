import { cn } from "@/lib/utils";

interface ProfileMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  meta: {
    title: string;
    value: string;
  }[];
}

export function ProfileMeta({ meta, className, ...rest }: ProfileMetaProps) {
  return (
    <div className={cn("flex flex-col gap-5", className)} {...rest}>
      {meta.map((item) => (
        <div key={item.title}>
          <h4 className="text-sm font-medium text-stone-300">{item.title}:</h4>
          <p className="text-sm text-stone-400 mt-2">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
