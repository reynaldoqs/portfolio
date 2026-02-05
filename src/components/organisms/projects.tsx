import { profile } from "@/constants/profile.data";
import { cn } from "@/lib/utils";
import { SectionLabel } from "../atoms";
import { ProjectCard } from "../molecules";

interface ProjectsProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Projects({ className, ...rest }: ProjectsProps) {
  return (
    <section
      className={cn("w-full h-auto p-4 sm:p-6 md:p-12", className)}
      {...rest}
    >
      <div className="mb-12 sm:mb-16">
        <SectionLabel>Work</SectionLabel>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-stone-200 tracking-tight">
          Projects
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {profile.projects
          .filter((p) => p.priority !== "low")
          .map((project) => (
            <div
              key={project.title}
              className={cn(project.priority === "high" ? "md:col-span-2" : "")}
            >
              <ProjectCard project={project} />
            </div>
          ))}
      </div>
    </section>
  );
}
