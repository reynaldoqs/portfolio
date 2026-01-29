import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { ExternalLink, FuncLink, Icon } from "@/components";
import { cn } from "@/lib/utils";

gsap.registerPlugin(SplitText);

const getContactTimeline = (element: HTMLElement) => {
  const externalLinkText = element.querySelector(".external-link-text");
  const externalLinkIcon = element.querySelector(".external-link-icon");
  const tl = gsap.timeline();
  const textElements = new SplitText(externalLinkText, {
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
  tl.to(".external-link-char", {
    textDecoration: "underline wavy #991b1b",
  });
  return tl;
};
const commentLinkClassName =
  "flex items-center text-stone-400 hover:text-stone-300 group font-medium text-sm transition-colors duration-30";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!containerRef.current || !contactRef.current) return;
      const mainAsideTimeline = gsap.timeline();
      const textElements = new SplitText(".sidebar-links", {
        type: "chars",
      });

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
        mainAsideTimeline.add(getContactTimeline(element as HTMLElement));
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
    },
    { scope: containerRef },
  );

  return (
    <aside
      ref={containerRef}
      className={cn(
        "sidebar-text border-r border-stone-600/20 px-4 py-8 flex flex-col gap-3 items-end justify-between",
        className,
      )}
    >
      <div>
        <Icon name="logo" size={36} className="text-stone-200 sidebar-logo" />
      </div>

      <div className="flex flex-col gap-4 items-end sidebar-links">
        <FuncLink href="/" className="sidebar-whoami">
          whoami
        </FuncLink>
        <FuncLink href="/" className="sidebar-experience">
          experience
        </FuncLink>
        <FuncLink href="/" className="sidebar-projects">
          projects
        </FuncLink>
        <FuncLink href="/" className="sidebar-stack">
          stack
        </FuncLink>
      </div>

      <div className="flex flex-col gap-3 items-end py-6" ref={contactRef}>
        <ExternalLink
          href="https://github.com/yourusername"
          icon="email"
          className={cn(commentLinkClassName, "external-link-contact")}
        >
          Email me
        </ExternalLink>
        <ExternalLink
          href="https://github.com/yourusername"
          icon="calendar"
          className={cn(commentLinkClassName, "external-link-contact")}
        >
          Book a meeting
        </ExternalLink>
        <ExternalLink
          href="https://github.com/yourusername"
          icon="github"
          className={cn(commentLinkClassName, "external-link-contact")}
        >
          GitHub
        </ExternalLink>
        <ExternalLink
          href="https://github.com/yourusername"
          icon="linkedin"
          className={cn(commentLinkClassName, "external-link-contact")}
        >
          LinkedIn
        </ExternalLink>
        <ExternalLink
          href="/resume.pdf"
          icon="download-alt"
          className={cn(commentLinkClassName, "external-link-contact")}
        >
          Download CV
        </ExternalLink>
      </div>
    </aside>
  );
}
