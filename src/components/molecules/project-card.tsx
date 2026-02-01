import Image from "next/image";
import { techs } from "@/constants/profile.data";
import { cn } from "@/lib/utils";
import type { Project, Tech } from "@/types/profile";
import { Icon, Tag } from "../atoms";

interface ProjectCardProps {
  project: Project;
  className?: string;
}
export function ProjectCard({ project, className }: ProjectCardProps) {
  const { title, description, techIds, link, github, category, rol } = project;
  const backgroundImage = project.backgroundImage;
  const hasBackground = Boolean(backgroundImage);
  return (
    <div
      className={cn(
        "flex flex-col  bg-stone-900 p-2 rounded-lg group",
        className,
      )}
    >
      <div className="relative overflow-hidden flex flex-col gap-3 bg-stone-950 p-5 flex-1 rounded-md">
        {backgroundImage && (
          <div className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 z-0  opacity-20 group-hover:opacity-60 transition-all duration-300">
            <Image
              src={backgroundImage}
              alt=""
              aria-hidden
              width={320}
              height={640}
              className="w-[200px] md:w-[240px] h-auto object-contain -rotate-12 grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
        )}
        <h3 className="relative z-10 text-2xl font-black text-stone-200 pr-4">
          {title}
        </h3>
        <p
          className={cn(
            "relative z-10 text-sm font-medium",
            hasBackground ? "text-stone-300 pr-20" : "text-stone-400",
          )}
        >
          {description}
        </p>
        <div className="relative z-10 flex flex-wrap gap-1 mt-auto">
          {techIds.map((techId) => (
            <Tag key={techId}>
              {techs.find((tech: Tech) => tech.id === techId)?.name ??
                "Unknown"}
            </Tag>
          ))}
        </div>
      </div>
      <div className="flex px-4 py-2 justify-between gap-4 items-center">
        <div className="flex flex-col">
          <p className="text-sm capitalize text-stone-300">{category}</p>
          <p className="text-sm text-stone-500">{rol}</p>
        </div>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-stone-400"
          >
            <Icon name="github" size={20} />
          </a>
        )}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-stone-300 text-xs font-bold text-stone-900 hover:bg-stone-100 transition-colors duration-300 block py-1 px-2 rounded-md"
        >
          View
        </a>
      </div>
    </div>
  );
}
