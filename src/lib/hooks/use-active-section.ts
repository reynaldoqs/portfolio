import { useEffect, useState } from "react";

export interface UseActiveSectionOptions<T extends string> {
  ids: readonly T[];
  initial?: T;
  /**
   * Active line position within viewport (0..1). Example: 0.35 means 35% down.
   */
  offsetRatio?: number;
}

export function useActiveSection<T extends string>({
  ids,
  initial,
  offsetRatio = 0.35,
}: UseActiveSectionOptions<T>) {
  const [activeId, setActiveId] = useState<T | undefined>(
    () => initial ?? ids[0],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = ids.map((id) => document.getElementById(id));
    const targets = elements.filter(Boolean) as HTMLElement[];

    if (targets.length === 0) return;

    // Ensure we never stay undefined if we have elements.
    setActiveId((prev) => prev ?? (targets[0]?.id as T | undefined));

    let raf = 0;
    const compute = () => {
      raf = 0;
      const y = window.innerHeight * offsetRatio;

      // Pick the section whose box contains y; fallback to the closest top above y.
      let best: { id: string; dist: number } | null = null;

      for (const el of targets) {
        const rect = el.getBoundingClientRect();
        const contains = rect.top <= y && rect.bottom >= y;
        const dist = contains
          ? 0
          : rect.top > y
            ? rect.top - y
            : y - rect.bottom;

        if (!best || dist < best.dist) best = { id: el.id, dist };
      }

      if (best?.id) setActiveId(best.id as T);
    };

    const onChange = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(compute);
    };

    // Initial compute after mount.
    onChange();

    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [ids, offsetRatio]);

  return activeId;
}
