import { cn } from "@/lib/utils";
import { Icon, Tag } from "../atoms";

interface ProjectCardProps {
  index: number;
  title: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  category: string;
  rol: string;
  from: string;
  to: string;
  className?: string;
}
export function ProjectCard({
  index,
  title,
  description,
  tech,
  link,
  github,
  category,
  rol,
  from,
  to,
  className,
}: ProjectCardProps) {
  return (
    <div className={cn("flex flex-col gap-12 bg-stone-900 p-4", className)}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-stone-500">
            {String(index).padStart(2, "0")}
          </h4>
          <p className="text-xs text-stone-400">
            {category} · {rol}
          </p>

          <p className="text-xs text-stone-500">
            {from} → {to}
          </p>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-300 hover:text-indigo-200 transition-colors duration-300"
        >
          <Icon name="external-link" size={18} />
        </a>
      </div>
      <div className="flex flex-col gap-3 mt-auto">
        <h3 className="text-base font-medium text-stone-200 pr-4">{title}</h3>
        <p className="text-sm text-stone-300/90 pr-4">{description}</p>
        <div className="flex flex-wrap gap-1">
          {tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
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
        </div>
      </div>
    </div>
  );
}
