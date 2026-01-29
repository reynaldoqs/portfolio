import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import avatar from "@/assets/images/avatar.png";
import { LOADER_DURATION } from "@/constants/animations.config";
import { cn } from "@/lib/utils";
import { TagTitle } from "../atoms";
import { ScrollableIndicator, ShortcutButton } from "../molecules";

interface ProfileOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function ProfileOverview({ className, ...rest }: ProfileOverviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.from(".profile-overview-item", {
        delay: LOADER_DURATION + 0.2,
        opacity: 0,
        duration: 0.5,
        y: 10,
        ease: "power2.inOut",
        stagger: {
          amount: 0.6,
          from: "random",
        },
      });
    },
    { scope: containerRef },
  );
  return (
    <section
      className={cn(
        "w-full h-dvh flex justify-center items-center p-6",
        className,
      )}
      {...rest}
    >
      <main ref={containerRef} className="flex flex-col max-w-2xl gap-8">
        <div className="flex gap-4 profile-overview-item">
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
        <div className="flex items-start gap-4 profile-overview-item">
          <TagTitle title="ABOUT ME" icon="user-headset" iconSize={14} />
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

        <div className="flex gap-4 mt-2 profile-overview-item">
          <ShortcutButton icon="search" text="Quick search" />
          <ShortcutButton icon="open-ai" text="Smart AI match" />
        </div>
      </main>
      <ScrollableIndicator className="text-stone-500" size={42} />
    </section>
  );
}
