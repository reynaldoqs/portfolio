import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import avatar from "@/assets/images/avatar.png";
import { LOADER_DURATION } from "@/constants/animations.config";
import { profile } from "@/constants/profile.data";
import { cn } from "@/lib/utils";
import { TagTitle } from "../atoms";
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

const profileMeta = [
  { title: "Location", value: "La Paz, Bolivia" },
  // { title: "Phone", value: "+591 7 3090 695" },
  { title: "Languages", value: "Spanish, English" },
  { title: "Timezone", value: "GMT -4" },
];

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
        "relative w-full h-dvh flex justify-center items-center p-6",
        className,
      )}
      {...rest}
    >
      <main ref={containerRef} className="flex flex-col max-w-2xl gap-10">
        <div className="flex gap-4 items-end">
          <div className="flex-1 profile-overview-item">
            <h2 className="text-6xl font-black text-stone-50 w-fit">Hi, I'm</h2>
            <h1 className="text-7xl font-black text-indigo-100 w-fit">
              {profile.fullName}
            </h1>
            <h2 className="text-lg font-medium text-stone-300">
              - {profile.title} -
            </h2>
          </div>
        </div>

        <div className="flex items-start gap-4 profile-overview-item">
          <div className="flex flex-col">
            <TagTitle title="Who I Am" icon="crown" iconSize={14} />
            <Image
              src={avatar}
              alt="Reynaldo Quispe"
              width={90}
              height={90}
              className="rounded object-cover profile-overview-item"
            />
          </div>
          <div className="text-base text-stone-400 -mt-4">
            {profile.summary.map((paragraph, index: number) => (
              <p
                key={`summary-paragraph-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: comes from static array
                  index
                }`}
                className="mt-4"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="flex  justify-between gap-4">
          <ProfileMeta meta={profileMeta} className="profile-overview-item" />
          <ProfileStatistics
            className="w-fit profile-overview-item"
            statistics={profile.statistics}
          />
          <ShortcutList
            shortcuts={shortcuts}
            className="profile-overview-item"
          />
        </div>
      </main>
      <ScrollableIndicator className="text-stone-500" size={42} />
    </section>
  );
}
