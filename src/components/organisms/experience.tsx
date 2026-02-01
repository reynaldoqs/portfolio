import { profile, techs } from "@/constants/profile.data";
import { cn } from "@/lib/utils";
import { TagTitle } from "../atoms";
import { TimelineElement } from "../molecules";

interface ExperienceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Experience({ className, ...rest }: ExperienceProps) {
  return (
    <section
      className={cn("w-full h-auto p-4 sm:p-6 md:p-12", className)}
      {...rest}
    >
      <TagTitle
        title="Experience"
        className="mb-4 text-2xl -rotate-2"
        icon="tech-companies"
        iconSize={20}
      />
      {profile.experience.map((experience) => (
        <TimelineElement
          key={experience.company}
          startDate={experience.from}
          endDate={experience.to}
          title={experience.role}
          subtitle={experience.company}
          tags={experience.techIds.map(
            (techId) => techs.find((t) => t.id === techId)?.name ?? "Unknown",
          )}
          className="mt-12"
        >
          {experience.description.map((description, index) => (
            <p
              className={cn(
                "text-sm text-stone-400 mt-4",
                index === 0 && "mt-0",
              )}
              // biome-ignore lint/suspicious/noArrayIndexKey: we need to use the index as key
              key={index}
            >
              {description}
            </p>
          ))}
        </TimelineElement>
      ))}
    </section>
  );
}
