import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Inter, Roboto_Mono } from "next/font/google";
import { useLayoutEffect, useRef } from "react";
import {
  AnimatedLoader,
  Experience,
  Footer,
  ProfileOverview,
  Projects,
  Sidebar,
  Stack,
} from "@/components";
import { SECTION_IDS } from "@/constants/layout";
import { useActiveSection } from "@/lib/hooks";

const mono_font = Roboto_Mono({
  variable: "--mono-font",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const activeSection = useActiveSection({ ids: SECTION_IDS });
  const smootherRef = useRef<ScrollSmoother>(null);
  useLayoutEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      // smooth: 1.2, // seconds it takes to "catch up"
      // effects: true, // enable data-speed & data-lag
    });

    return () => {
      smootherRef.current?.kill();
    };
  }, []);

  const handleLinkClick = (id: (typeof SECTION_IDS)[number]) => {
    console.log("id", id);
    smootherRef.current?.scrollTo(`#${id}`, true, "center center");
  };

  return (
    <>
      <div
        id="smooth-wrapper"
        className={`${mono_font.className} absolute inset-0 container mx-auto`}
      >
        <Sidebar
          className="w-[200px] sm:w-[250px] md:w-[300px] h-full fixed z-30"
          activeSection={activeSection}
          onLinkClick={handleLinkClick}
        />
        <div
          id="smooth-content"
          className={`${inter.className} pl-[200px] sm:pl-[250px] md:pl-[300px] flex flex-col flex-1`}
        >
          <ProfileOverview className="w-full h-dvh" id={SECTION_IDS[0]} />
          <Experience className="w-full" id={SECTION_IDS[1]} />
          <Projects className="w-full mt-20" id={SECTION_IDS[2]} />
          <Stack className="w-full mt-20" id={SECTION_IDS[3]} />
          <Footer />
        </div>
      </div>
      <AnimatedLoader />
    </>
  );
}
