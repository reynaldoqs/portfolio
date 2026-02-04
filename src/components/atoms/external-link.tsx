import { cn } from "@/lib/utils";
import type { MouseEvent, ReactNode } from "react";
import { Icon, type IconName } from "./icon";

interface ExternalLinkProps {
  href: string;
  icon?: IconName;
  className?: string;
  mobileLabel?: ReactNode;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
}

export function ExternalLink({
  href,
  icon,
  className,
  mobileLabel,
  onClick,
  children,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={cn(
        "flex items-center text-stone-400 font-medium text-xs sm:text-sm group transition-colors duration-300",
        className,
      )}
    >
      <span className="opacity-0 external-link-text-prefix">{"//"}</span>
      <span className="external-link-text">
        <span className="external-link-label-mobile sm:hidden">
          {mobileLabel ?? children}
        </span>
        <span className="external-link-label-desktop hidden sm:inline">
          {children}
        </span>
        {icon && (
          <Icon
            name={icon}
            size={18}
            className="ml-2 opacity-0 external-link-icon"
          />
        )}
      </span>
    </a>
  );
}
