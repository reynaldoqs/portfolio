import { cn } from "@/lib/utils";
import { Icon } from "../atoms";
import { Tag } from "../atoms/tag";

interface TimelineElementProps {
  startDate: string;
  endDate: string;
  title: string;
  subtitle?: string;
  subtitleLink?: string;
  children: React.ReactNode;
  className?: string;
  tags?: string[];
  isLast?: boolean;
}

export function TimelineElement({
  startDate,
  endDate,
  title,
  subtitle,
  subtitleLink,
  children,
  className,
  tags,
}: TimelineElementProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0",
        className,
      )}
    >
      <div className="md:col-span-3 relative font-mono">
        <div className="flex items-center gap-1 md:justify-end">
          <div className="text-lg text-stone-600">{startDate}</div>
          <span className="h-px w-6 bg-stone-800" />
          <div className="text-lg text-stone-600">{endDate}</div>
          <span className="h-px flex-1 bg-stone-800" />
        </div>
      </div>

      <div className="md:col-span-9 relative before:content-['<exp>'] after:content-['<\/exp>'] before:absolute after:absolute before:left-0 after:left-0 before:-top-6 after:-bottom-6 before:text-xs after:text-xs before:text-stone-700 after:text-stone-700 before:font-mono after:font-mono before:hidden after:hidden md:before:block md:after:block">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-stone-800 hidden md:block" />

        <div className="md:pl-8">
          <h3 className="text-xl font-semibold text-stone-200 mb-1">{title}</h3>
          {subtitle &&
            (subtitleLink ? (
              <a
                href={subtitleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400/70 text-sm hover:text-red-400 transition-colors inline-flex items-center gap-1"
              >
                {subtitle}{" "}
                <Icon name="external-link" size={12} className="ml-2" />
              </a>
            ) : (
              <p className="text-sm font-medium text-stone-500">{subtitle}</p>
            ))}
          <div className="mt-6 space-y-4 text-stone-500 text-sm leading-relaxed">
            {children}
          </div>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
