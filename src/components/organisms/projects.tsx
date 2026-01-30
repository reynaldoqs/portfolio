import { cn } from "@/lib/utils";
import { TagTitle } from "../atoms";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        <ProjectCard
          index={1}
          title="Project 1"
          description="Description of project 1"
          tech={["React", "Next.js", "Tailwind CSS", "TypeScript"]}
          link="https://www.google.com"
          github="https://www.github.com"
          category="web"
          rol="Fullstack Developer"
          from="2024"
          to="2024"
        />
        <ProjectCard
          index={21}
          title="Project 2"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          tech={["React", "Next.js", "Tailwind CSS", "TypeScript"]}
          link="https://www.google.com"
          github="https://www.github.com"
          category="web"
          rol="Fullstack Developer"
          from="2024"
          to="2024"
        />
        <ProjectCard
          index={1}
          title="Project 1"
          description="Description of project 1"
          tech={["React", "Next.js", "Tailwind CSS", "TypeScript"]}
          link="https://www.google.com"
          github="https://www.github.com"
          category="web"
          rol="Fullstack Developer"
          from="2024"
          to="2024"
        />
        <ProjectCard
          index={2}
          title="Project 2"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          tech={["React", "Next.js", "Tailwind CSS", "TypeScript"]}
          link="https://www.google.com"
          github="https://www.github.com"
          category="web"
          rol="Fullstack Developer"
          from="2024"
          to="2024"
        />
      </div>
    </section>
  );
}
