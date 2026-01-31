import { profile } from "@/constants/profile.data";
import { cn } from "@/lib/utils";
import { TagTitle } from "../atoms";
import { StackGroup } from "../molecules";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export function Stack({ className, ...rest }: StackProps) {
  return (
    <section className={cn("w-full h-auto p-12", className)} {...rest}>
      <TagTitle
        title="Stack"
        className="mb-12 text-2xl"
        icon="sparkles-solid"
        iconSize={20}
      />
      <div className="flex flex-col gap-10">
        {profile.stacks.map((stack) => (
          <StackGroup key={stack.title} stack={stack} />
        ))}
      </div>
    </section>
  );
}
