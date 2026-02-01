import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  AiMatchModal,
  AnimatedLoader,
  Experience,
  Footer,
  ProfileOverview,
  Projects,
  Sidebar,
  Stack,
} from "@/components";
import { interFont, monoFont } from "@/constants/fonts";
import { SECTION_IDS } from "@/constants/layout";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const [activeSection, setActiveSection] = useState<
    (typeof SECTION_IDS)[number]
  >(SECTION_IDS[0]);
  const [isAiMatchOpen, setIsAiMatchOpen] = useState(false);
  const smootherRef = useRef<ScrollSmoother>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openAiMatch = useCallback(() => {
    setIsAiMatchOpen(true);
    smootherRef.current?.paused(true);
  }, []);

  const closeAiMatch = useCallback(() => {
    setIsAiMatchOpen(false);
  }, []);

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

  const handleSectionEnter = (index: number) => {
    console.log("section entered", index);
    setActiveSection(SECTION_IDS[index]);
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const sections = gsap.utils.toArray(".main-section");
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section as HTMLElement,
          start: "top center",
          end: "bottom center",
          onEnter: () => handleSectionEnter(index),
          onEnterBack: () => handleSectionEnter(index),
        });
      });
    },
    { scope: containerRef },
  );

  const handleLinkClick = (id: (typeof SECTION_IDS)[number]) => {
    if (isAiMatchOpen) return;
    smootherRef.current?.scrollTo(`#${id}`, true, "center center");
  };

  return (
    <>
      <div
        id="smooth-wrapper"
        className={`${monoFont.className} absolute inset-0 w-full max-w-[1280px] mx-auto`}
      >
        <Sidebar
          className={`w-[100px] sm:w-[230px] md:w-[280px] h-full fixed ${isAiMatchOpen ? "z-10 pointer-events-none" : "z-30"}`}
          activeSection={activeSection}
          onLinkClick={handleLinkClick}
        />

        <button
          type="button"
          onClick={openAiMatch}
          className="absolute z-40 bottom-6 right-6 bg-stone-200 text-stone-950 text-xs sm:text-sm font-bold px-3 py-2 rounded-md hover:bg-stone-100 transition-colors"
        >
          AI Match
        </button>

        <div
          ref={containerRef}
          id="smooth-content"
          className={`${interFont.className} pl-[100px] sm:pl-[230px] md:pl-[280px] flex flex-col flex-1 relative`}
        >
          <ProfileOverview
            className="w-full h-dvh main-section"
            id={SECTION_IDS[0]}
          />
          <Experience className="w-full main-section" id={SECTION_IDS[1]} />
          <Projects className="w-full mt-20 main-section" id={SECTION_IDS[2]} />
          <Stack className="w-full mt-20 main-section" id={SECTION_IDS[3]} />
          <Footer />
        </div>
      </div>

      <AiMatchModal
        open={isAiMatchOpen}
        onClose={closeAiMatch}
        onClosed={() => smootherRef.current?.paused(false)}
        contentAreaClassName="left-[100px] sm:left-[230px] md:left-[280px] "
      />
      <AnimatedLoader />
    </>
  );
}
