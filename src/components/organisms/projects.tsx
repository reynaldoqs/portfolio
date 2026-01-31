import { mockProfile, mockTechs } from "@/constants/profile.mock";
import { cn } from "@/lib/utils";
import type { Tech } from "@/types/profile";
import { BentoGrid, BentoGridItem, TagTitle } from "../atoms";
import { ProjectCard } from "../molecules";

interface ProjectsProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Projects({ className, ...rest }: ProjectsProps) {
  return (
    <section className={cn("w-full h-auto p-12", className)} {...rest}>
      <TagTitle
        title="Projects"
        className="mb-4 text-2xl"
        icon="code-block"
        iconSize={20}
      />
      <BentoGrid className="mt-12">
        {mockProfile.projects.map((project) => (
          <BentoGridItem
            key={project.title}
            // className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            className={project.priority === "high" ? "md:col-span-2" : ""}
          >
            <ProjectCard project={project} />
          </BentoGridItem>
        ))}
      </BentoGrid>
    </section>
  );
}
