import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import type { MouseEvent } from "react";
import { useRef } from "react";
import { ExternalLink, FuncLink, Icon } from "@/components";
import { LOADER_DURATION } from "@/constants/animations.config";
import { SECTION_IDS } from "@/constants/layout";
import { profile } from "@/constants/profile.data";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

const getContactTimeline = (element: HTMLElement) => {
  const externalLinkText = element.querySelector(".external-link-text");
  const labelToSplit = window.matchMedia?.("(min-width: 640px)")?.matches
    ? element.querySelector(".external-link-label-desktop")
    : element.querySelector(".external-link-label-mobile");
  const externalLinkIcon = element.querySelector(".external-link-icon");
  const tl = gsap.timeline();
  if (!externalLinkText) return tl;

  const splitTarget =
    (labelToSplit as HTMLElement | null) ??
    (externalLinkText as HTMLElement | null);
  if (!splitTarget) return tl;

  const textElements = new SplitText(splitTarget, {
    type: "chars",
    charsClass: "external-link-char",
  });
  tl.from(textElements.chars, {
    textDecoration: "none",
    textDecorationColor: "transparent",
    opacity: 0,
    duration: 0.05,
    ease: "power2.inOut",
    stagger: 0.03,
  });

  tl.to(
    externalLinkIcon,
    {
      opacity: 1,
      duration: 0.05,
    },
    "-=0.05",
  );
  tl.to(textElements.chars, {
    textDecoration: "underline wavy #991b1b",
  });
  return { tl, splitText: textElements };
};
const commentLinkClassName =
  "flex items-center text-stone-400 hover:text-stone-300 group font-medium text-xs sm:text-base transition-colors duration-300";

interface SidebarProps {
  className?: string;
  activeSection?: (typeof SECTION_IDS)[number];
  onLinkClick?: (id: (typeof SECTION_IDS)[number]) => void;
}

export function Sidebar({
  className,
  activeSection,
  onLinkClick,
}: SidebarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !contactRef.current || !linksRef.current)
        return;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)
        return;

      const mainAsideTimeline = gsap.timeline({
        delay: LOADER_DURATION,
      });
      const splitTextInstances: SplitText[] = [];
      const textElements = new SplitText(linksRef.current, {
        type: "chars",
      });
      splitTextInstances.push(textElements);

      mainAsideTimeline.from(".sidebar-logo", {
        scale: 1.5,
        duration: 0.3,
        x: -30,
        ease: "back.out(1.7)",
      });

      mainAsideTimeline.from(textElements.chars, {
        opacity: 0,
        duration: 0.05,
        ease: "power2.inOut",
        stagger: 0.03,
      });

      const contactElements = gsap.utils.toArray(contactRef.current?.children);
      contactElements.forEach((element) => {
        const result = getContactTimeline(element as HTMLElement);
        if ("splitText" in result) {
          splitTextInstances.push(result.splitText);
          mainAsideTimeline.add(result.tl);
        } else {
          mainAsideTimeline.add(result);
        }
      });

      mainAsideTimeline.to(".external-link-contact", {
        backgroundColor: "#1e293b",
        duration: 0.3,
        ease: "power2.inOut",
        stagger: {
          amount: 0.1,
          from: "end",
        },
      });
      mainAsideTimeline.set(".external-link-contact", {
        delay: 0.5,
        backgroundColor: "transparent",
        className: cn(commentLinkClassName, "text-stone-600"),
      });
      mainAsideTimeline.set(".external-link-char", {
        textDecoration: "none",
        textDecorationColor: "transparent",
      });
      mainAsideTimeline.set(".external-link-text-prefix", {
        className:
          "opacity-100 group-hover:opacity-0 external-link-text-prefix",
      });

      return () => {
        mainAsideTimeline.kill();
        splitTextInstances.forEach((instance) => {
          instance.revert();
        });
      };
    },
    { scope: containerRef },
  );

  const handleLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: (typeof SECTION_IDS)[number],
  ) => {
    event.preventDefault();
    onLinkClick?.(id);
  };
  return (
    <aside
      ref={containerRef}
      className={cn(
        "sidebar-text border-r border-stone-600/20 bg-stone-950/60 px-2 md:px-4 md:py-8 py-4 flex flex-col gap-3 items-end justify-between",
        className,
      )}
    >
      <div>
        <Icon name="logo" size={36} className="text-stone-200 sidebar-logo" />
      </div>

      <nav aria-label="Primary">
        <ul
          ref={linksRef}
          className="flex flex-col gap-4 items-end sidebar-links"
        >
          <li>
            <FuncLink
              href={`#${SECTION_IDS[0]}`}
              mobileLabel="who"
              active={activeSection === SECTION_IDS[0]}
              onClick={(event) => handleLinkClick(event, SECTION_IDS[0])}
            >
              whoami
            </FuncLink>
          </li>
          <li>
            <FuncLink
              href={`#${SECTION_IDS[1]}`}
              mobileLabel="exp"
              active={activeSection === SECTION_IDS[1]}
              onClick={(event) => handleLinkClick(event, SECTION_IDS[1])}
            >
              experience
            </FuncLink>
          </li>
          <li>
            <FuncLink
              href={`#${SECTION_IDS[2]}`}
              mobileLabel="proj"
              active={activeSection === SECTION_IDS[2]}
              onClick={(event) => handleLinkClick(event, SECTION_IDS[2])}
            >
              projects
            </FuncLink>
          </li>
          <li>
            <FuncLink
              href={`#${SECTION_IDS[3]}`}
              mobileLabel="stk"
              active={activeSection === SECTION_IDS[3]}
              onClick={(event) => handleLinkClick(event, SECTION_IDS[3])}
            >
              stack
            </FuncLink>
          </li>
        </ul>
      </nav>

      <div className="flex flex-col gap-3 items-end py-6" ref={contactRef}>
        <ExternalLink
          href={profile.links.email}
          icon="email"
          className={cn(commentLinkClassName, "external-link-contact")}
          mobileLabel="Email"
        >
          Email me
        </ExternalLink>
        <ExternalLink
          href={profile.links.calendly}
          icon="calendar"
          className={cn(commentLinkClassName, "external-link-contact")}
          mobileLabel="Meet"
        >
          Book a meeting
        </ExternalLink>
        <ExternalLink
          href={profile.links.github}
          icon="github"
          className={cn(commentLinkClassName, "external-link-contact")}
          mobileLabel="GH"
        >
          GitHub
        </ExternalLink>
        <ExternalLink
          href={profile.links.linkedin}
          icon="linkedin"
          className={cn(commentLinkClassName, "external-link-contact")}
          mobileLabel="LI"
        >
          LinkedIn
        </ExternalLink>
        <ExternalLink
          href="/resume.pdf"
          icon="download-alt"
          className={cn(commentLinkClassName, "external-link-contact")}
          mobileLabel="CV"
        >
          Download CV
        </ExternalLink>
      </div>
    </aside>
  );
}
