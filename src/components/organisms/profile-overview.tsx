import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import avatar from "@/assets/images/avatar.webp";
import { LOADER_DURATION } from "@/constants/animations.config";
import { profile } from "@/constants/profile.data";
import { cn } from "@/lib/utils";
import { type IconName, TagTitle } from "../atoms";
import {
  ProfileMeta,
  ProfileStatistics,
  ScrollableIndicator,
  ShortcutList,
} from "../molecules";

const shortcuts = [
  // { shortcutKeys: ["P", "F"], shortcut: "Quick search" },
  { shortcutKeys: ["P", "M"], shortcut: "Smart AI match" },
  { shortcutKeys: ["M", "W"], shortcut: "Whoami" },
  { shortcutKeys: ["M", "E"], shortcut: "Experience" },
  { shortcutKeys: ["M", "P"], shortcut: "Projects" },
  { shortcutKeys: ["M", "S"], shortcut: "Stack" },
];

const profileMeta: { title: string; value: string; icon?: IconName }[] = [
  { title: "Location", value: "La Paz, Bolivia", icon: "map-pin" },
  { title: "Phone", value: "+591 7 3090 695", icon: "phone" },
  { title: "Languages", value: "Spanish, English", icon: "globe" },
  { title: "Timezone", value: "GMT -4", icon: "clock" },
  { title: "Education", value: "Bachelor of Computer Science", icon: "book" },
  { title: "Available", value: "Open to work", icon: "sparkles-solid" },
];

interface ProfileOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function ProfileOverview({ className, ...rest }: ProfileOverviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const tween = gsap.from(".profile-overview-item", {
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
      return () => tween.kill();
    },
    { scope: containerRef, dependencies: [] },
  );
  return (
    <section
      className={cn(
        "relative w-full h-dvh flex justify-center items-center p-4 sm:p-6 md:p-10",
        className,
      )}
      {...rest}
    >
      <main
        ref={containerRef}
        className="flex flex-col w-full max-w-2xl gap-8 sm:gap-10"
      >
        <div className="flex gap-4 items-end">
          <div className="flex-1 profile-overview-item">
            <h2 className="text-4xl sm:text-6xl font-black text-stone-50 w-fit leading-none">
              Hi, I'm
            </h2>
            <h1 className="text-5xl sm:text-7xl font-black text-red-400 w-fit leading-none wrap-break-word">
              {profile.fullName}
            </h1>
            <h2 className="text-base sm:text-lg font-medium text-stone-300">
              - {profile.title} -
            </h2>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-4 profile-overview-item">
          <div className="flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-0">
            <TagTitle title="Who I Am" icon="crown" iconSize={14} />
            <Image
              src={avatar}
              alt="Reynaldo Quispe"
              width={90}
              height={90}
              className="rounded object-cover profile-overview-item w-16 h-16 sm:w-[90px] sm:h-[90px]"
            />
          </div>
          <div className="text-sm sm:text-base text-stone-400 sm:-mt-4">
            {profile.summary.map((paragraph, index: number) => (
              <p
                key={`summary-paragraph-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: comes from static array
                  index
                }`}
                className="mt-3 sm:mt-4"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-between gap-12  md:gap-4">
          <ProfileMeta meta={profileMeta} className="profile-overview-item" />
          {/* <ProfileStatistics
            className="w-full sm:w-fit profile-overview-item"
            statistics={profile.statistics}
          /> */}
        </div>
      </main>
      <ScrollableIndicator
        className="hidden sm:block text-stone-500"
        size={42}
      />
    </section>
  );
}
