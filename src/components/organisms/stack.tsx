import { profile, techs } from "@/constants/profile.data";
import { cn } from "@/lib/utils";
import type { Tech } from "@/types/profile";
import { SectionLabel } from "../atoms";
import { StackGroup } from "../molecules";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Stack({ className, ...rest }: StackProps) {
  return (
    <section
      className={cn("w-full h-auto p-4 sm:p-6 md:p-12", className)}
      {...rest}
    >
      <div className="mb-12 sm:mb-16">
        <SectionLabel>Technical</SectionLabel>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-stone-200 tracking-tight">
          Stack & Tools
        </h2>
      </div>

      {profile.stacks.map((stack) => (
        <StackGroup key={stack.title} stack={stack} title={stack.title} />
      ))}
    </section>
  );
}
