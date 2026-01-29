import { cn } from "@/lib/utils";
import { Tag } from "../atoms";

interface TimelineElementProps {
  startDate: string;
  endDate?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  tags?: string[];
}

export function TimelineElement({
  startDate,
  endDate,
  title,
  subtitle,
  children,
  className,
  tags,
}: TimelineElementProps) {
  const dateRange = endDate ? `${startDate} → ${endDate}` : startDate;

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-start gap-4 md:gap-8 w-full",
        className,
      )}
    >
      <div className="shrink-0 md:w-32 lg:w-40">
        <div className="flex items-center gap-2 text-stone-500 text-sm font-mono">
          <span className="whitespace-nowrap">{dateRange}</span>
          <span className="hidden md:inline-flex flex-1 h-px bg-stone-700/80" />
        </div>
      </div>
      <div className="flex-1 flex flex-col text-stone-400 text-base leading-relaxed">
        <h3 className="text-lg font-medium text-stone-300">{title}</h3>
        {subtitle && <p className="text-sm text-stone-500 mb-4">{subtitle}</p>}
        {children}
        {tags && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
