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

  return (
    <article
      className={cn(
        "group relative bg-stone-900/40 border border-stone-800/40 rounded-lg overflow-hidden transition-all duration-500 hover:border-indigo-500/30 h-full",
        className,
      )}
    >
      <div className="relative p-6 sm:p-8 min-h-[280px] flex flex-col h-full">
        {backgroundImage && (
          <div className="hidden md:block pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 z-0 opacity-10 group-hover:opacity-25 transition-all duration-700">
            <Image
              src={backgroundImage}
              alt=""
              aria-hidden
              width={260}
              height={520}
              className="w-[180px] md:w-[220px] h-auto object-contain grayscale rotate-[-15deg]"
            />
          </div>
        )}
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-[10px] tracking-[0.2em] uppercase text-indigo-400/70">
              {category}
            </span>
            <span className="text-stone-700">·</span>
            <span className="text-[10px] text-stone-600">{rol}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-stone-200 mb-4 tracking-tight">
            {title}
          </h3>
          <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-1">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {techIds.map((techId) => (
              <Tag
                key={techId}
                tag={
                  techs.find((tech: Tech) => tech.id === techId)?.name ?? techId
                }
              />
            ))}
          </div>
        </div>
        <div className="relative z-10 mt-6 pt-4 border-t border-stone-800/50 flex items-center justify-between">
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-stone-600 hover:text-indigo-400 transition-colors"
            >
              Source Code
            </a>
          ) : (
            <span />
          )}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2"
          >
            View <Icon name="external-link" size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}
