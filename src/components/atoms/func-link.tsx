import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FuncLinkProps {
  children: ReactNode;
  mobileLabel?: ReactNode;
  className?: string;
  active?: boolean;
  href: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}
export function FuncLink({
  children,
  mobileLabel,
  className,
  active,
  href,
  onClick,
}: FuncLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-stone-400 cursor-pointer font-medium hover:text-stone-200 transition-colors duration-300 whitespace-nowrap text-xs sm:text-base px-2 py-1 -mr-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950",
        active && "text-stone-200",
        className,
      )}
    >
      <span className="text-red-400">Me</span>.
      <span className="sm:hidden">{mobileLabel ?? children}</span>
      <span className="hidden sm:inline">{children}</span>
      <span>()</span>
    </a>
  );
}
