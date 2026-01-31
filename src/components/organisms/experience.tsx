import { mockProfile, mockTechs } from "@/constants/profile.mock";
import { cn } from "@/lib/utils";
import { TagTitle } from "../atoms";
import { TimelineElement } from "../molecules";

interface ExperienceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Experience({ className, ...rest }: ExperienceProps) {
  return (
    <section className={cn("w-full h-auto p-12", className)} {...rest}>
      <TagTitle
        title="Experience"
        className="mb-4 text-2xl -rotate-2"
        icon="tech-companies"
        iconSize={20}
      />
      {mockProfile.experience.map((experience) => (
        <TimelineElement
          key={experience.company}
          startDate={experience.from}
          endDate={experience.to}
          title={experience.role}
          subtitle={experience.company}
          tags={experience.techIds.map(
            (tech) => mockTechs.find((t) => t.id === tech)?.name ?? "Unknown",
          )}
          className="mt-12"
        >
          <p className="text-sm text-stone-400 pr-4">
            {experience.description}
          </p>
        </TimelineElement>
      ))}
    </section>
  );
}
