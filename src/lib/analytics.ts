import { sendGAEvent } from "@next/third-parties/google";

type SectionId = "whoami" | "experience" | "projects" | "stack";
type ContactLabel = "email" | "calendly" | "github" | "linkedin" | "resume";

function event(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  try {
    sendGAEvent("event", name, params ?? {});
  } catch {
    // no-op when GA not loaded or SSR
  }
}

export const analytics = {
  sidebarNavClick(section: SectionId) {
    event("sidebar_nav_click", { section });
  },

  sidebarContactClick(link: ContactLabel) {
    event("sidebar_contact_click", { link });
  },

  aiMatchOpen() {
    event("ai_match_open");
  },

  aiMatchClose() {
    event("ai_match_close");
  },

  aiMatchSubmit() {
    event("ai_match_submit");
  },

  aiMatchClear() {
    event("ai_match_clear");
  },

  aiMatchSuccess() {
    event("ai_match_success");
  },

  aiMatchError() {
    event("ai_match_error");
  },
};
