import { cn } from "@/lib/utils";
import { TagTitle } from "../atoms";
import { TimelineElement } from "../molecules";

interface ExperienceProps {
  className?: string;
}

export function Experience({ className }: ExperienceProps) {
  return (
    <section className={cn("w-full h-auto p-12", className)}>
      <TagTitle title="EXPERIENCE" className="mb-4 text-2xl" />
      <TimelineElement
        startDate="2016"
        endDate="2024"
        title="Software Engineer"
        subtitle="Company Name"
        className="mt-12"
        tags={["React", "Next.js", "Tailwind CSS", "TypeScript"]}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos building user-friendly products for web and mobile. Background in
          graphic design and backend development. I enjoy turning UX principles
          into clean, accessible, and scalable interfaces.
        </p>
      </TimelineElement>
      <TimelineElement
        startDate="2016"
        endDate="2024"
        title="Software Engineer"
        subtitle="Company Name"
        className="mt-12"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos building user-friendly products for web and mobile. Background in
          graphic design and backend development. I enjoy turning UX principles
          into clean, accessible, and scalable interfaces.
        </p>
      </TimelineElement>
      <TimelineElement
        startDate="2016"
        endDate="2024"
        title="Software Engineer"
        subtitle="Company Name"
        className="mt-12"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos building user-friendly products for web and mobile. Background in
          graphic design and backend development. I enjoy turning UX principles
          into clean, accessible, and scalable interfaces.
        </p>
      </TimelineElement>
    </section>
  );
}
