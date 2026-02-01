import Image from "next/image";
import { techs } from "@/constants/profile.data";
import { cn } from "@/lib/utils";
import type { Project, Tech } from "@/types/profile";
import { Icon, Tag } from "../atoms";

function rotationFromString(input: string, minDeg: number, maxDeg: number) {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  const range = maxDeg - minDeg + 1;
  const normalized = (hash >>> 0) % range;
  return minDeg + normalized;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
}
export function ProjectCard({ project, className }: ProjectCardProps) {
  const { title, description, techIds, link, github, category, rol } = project;
  const backgroundImage = project.backgroundImage;
  const hasBackground = Boolean(backgroundImage);
  const backgroundRotation = hasBackground
    ? rotationFromString(`${title}|${link}`, -20, 10)
    : 0;
  return (
    <div
      className={cn(
        "flex flex-col bg-stone-900 p-2 sm:p-3 md:p-4 rounded-lg group",
        className,
      )}
    >
      <div className="relative overflow-hidden flex flex-col gap-3 bg-stone-950 p-4 sm:p-5 md:p-6 flex-1 rounded-md min-w-0">
        {backgroundImage && (
          <div className="hidden md:block pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 z-0 opacity-20 group-hover:opacity-60 transition-all duration-300">
            <Image
              src={backgroundImage}
              alt=""
              aria-hidden
              width={320}
              height={640}
              className="w-[200px] lg:w-[240px] h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              style={{ transform: `rotate(${backgroundRotation}deg)` }}
            />
          </div>
        )}
        <h3 className="relative z-10 text-xl sm:text-2xl leading-tight font-black text-stone-200 sm:pr-4">
          {title}
        </h3>
        <p
          className={cn(
            "relative z-10 text-sm font-medium text-pretty",
            hasBackground
              ? "text-stone-300 pr-0 sm:pr-4 md:pr-10"
              : "text-stone-400",
          )}
        >
          {description}
        </p>
        <div className="relative z-10 flex flex-wrap gap-1.5 mt-auto">
          {techIds.map((techId) => (
            <Tag key={techId}>
              {techs.find((tech: Tech) => tech.id === techId)?.name ??
                "Unknown"}
            </Tag>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row px-4 py-3 sm:py-2 justify-between gap-3 sm:gap-4 sm:items-center">
        <div className="flex flex-col">
          <p className="text-sm capitalize text-stone-300">{category}</p>
          <p className="text-sm text-stone-500">{rol}</p>
        </div>
        <div className="flex items-center gap-3 sm:ml-auto">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400"
            >
              <Icon name="github" size={20} />
            </a>
          )}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-300 text-xs font-bold text-stone-900 hover:bg-stone-100 transition-colors duration-300 block py-1.5 px-3 rounded-md w-full sm:w-auto text-center"
          >
            View
          </a>
        </div>
      </div>
    </div>
  );
}
