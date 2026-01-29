import Image from "next/image";
import avatar from "@/assets/images/avatar.png";
import { cn } from "@/lib/utils";
import { TagTitle } from "../atoms";
import { ShortcutButton, TimelineElement } from "../molecules";

interface ProfileOverviewProps {
  className?: string;
}

export function ProfileOverview({ className }: ProfileOverviewProps) {
  return (
    <section
      className={cn(
        "w-full h-dvh flex justify-center items-center p-6",
        className,
      )}
    >
      <main className="flex flex-col max-w-2xl gap-8">
        <div className="flex  gap-4">
          <Image
            src={avatar}
            alt="Reynaldo Quispe"
            width={60}
            height={60}
            className="rounded object-cover"
          />
          <div>
            <h1 className="text-5xl font-bold text-stone-300 w-fit">
              Reynaldo Quispe
            </h1>
            <h2 className="text-xl font-medium text-stone-500">
              Software Engineer
            </h2>
          </div>
        </div>
        <div className="flex items-start gap-4 ">
          <TagTitle title="ABOUT ME" />
          <div className="text-base text-stone-400 -mt-2">
            <p>
              UX-focused full stack and mobile developer with 7+ years of
              experience building user-friendly products for web and mobile.
              Background in graphic design and backend development. I enjoy
              turning UX principles into clean, accessible, and scalable
              interfaces.
            </p>
            <p className="mt-4">
              I'm a quick learner and I'm always looking to improve my skills
              and stay up to date with the latest technologies and trends in the
              industry.
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <ShortcutButton icon="search" text="Quick search" />
          <ShortcutButton icon="open-ai" text="Smart AI match" />
        </div>
      </main>
    </section>
  );
}
