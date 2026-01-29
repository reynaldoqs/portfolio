import { cn } from "@/lib/utils";
import { TagTitle } from "../atoms";
import { Brand } from "../molecules";

interface StackProps {
  className?: string;
}
export function Stack({ className }: StackProps) {
  return (
    <section className={cn("w-full h-auto p-12", className)}>
      <TagTitle title="Stack" className="mb-4 text-2xl" />
      <div>
        <Brand name="React" />
      </div>
    </section>
  );
}
