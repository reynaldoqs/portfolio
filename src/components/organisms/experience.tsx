import { profile, techs } from "@/constants/profile.data";
import { cn } from "@/lib/utils";
import { SectionLabel } from "../atoms";
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
      <div className="mb-12 sm:mb-16">
        <SectionLabel>Career</SectionLabel>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-stone-200 tracking-tight">
          Experience
        </h2>
      </div>
      <div className="space-y-16 sm:space-y-20">
        {profile.experience.map((experience, index) => (
          <TimelineElement
            key={experience.company}
            startDate={experience.from}
            endDate={experience.to}
            title={experience.role}
            subtitle={experience.company}
            subtitleLink={experience.link}
            isLast={index === profile.experience.length - 1}
            tags={experience.techIds.map(
              (techId) => techs.find((t) => t.id === techId)?.name ?? "Unknown",
            )}
          >
            {experience.description.slice(0, 3).map((description, idx) => (
              <p key={`${experience.company}-desc-${idx}`}>{description}</p>
            ))}
          </TimelineElement>
        ))}
      </div>
    </section>
  );
}
