import { cn } from "@/lib/utils";
import { TagTitle } from "../atoms";
import { Brand } from "../molecules";

interface StackProps {
  className?: string;
}
export function Stack({ className }: StackProps) {
  return (
    <section className={cn("w-full h-auto p-12", className)}>
      <TagTitle
        title="Stack"
        className="mb-12 text-2xl"
        icon="sparkles-solid"
        iconSize={20}
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-medium text-stone-300">Frontend</h3>
        <p className="text-sm text-stone-400">
          I have experience with the following technologies:
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <Brand name="React" contrast experience={5} />
          <Brand name="Next.js" contrast />
          <Brand name="Tailwind CSS" contrast />
          <Brand name="TypeScript" contrast />
          <Brand name="JavaScript" contrast />
          <Brand name="CSS" contrast />
          <Brand name="Git" contrast />
          <Brand name="GitHub" contrast />
          <Brand name="GitLab" contrast />
        </div>
      </div>
    </section>
  );
}
