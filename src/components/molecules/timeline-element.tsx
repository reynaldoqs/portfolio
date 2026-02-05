import { cn } from "@/lib/utils";
import { Icon } from "../atoms";
import { Tag } from "../atoms/tag";

interface TimelineElementProps {
  startDate: string;
  endDate?: string;
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
  isLast = false,
}: TimelineElementProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8",
        className,
      )}
    >
      <div className="md:col-span-3 relative">
        <div className="md:sticky md:top-32 flex items-center">
          <div className="text-lg text-stone-600 mr-2">{startDate}</div>
          {endDate && (
            <div className="text-lg text-stone-600"> — {endDate}</div>
          )}
        </div>
      </div>

      <div className="md:col-span-9 relative">
        {!isLast && (
          <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-indigo-500/30 via-stone-800/30 to-transparent hidden md:block" />
        )}
        <div className="md:pl-8">
          <h3 className="text-xl font-semibold text-stone-200 mb-1">{title}</h3>
          {subtitle &&
            (subtitleLink ? (
              <a
                href={subtitleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400/70 text-sm hover:text-indigo-400 transition-colors inline-flex items-center gap-1"
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
