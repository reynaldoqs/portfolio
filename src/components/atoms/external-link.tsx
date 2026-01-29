import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./icon";

interface ExternalLinkProps {
  href: string;
  icon?: IconName;
  className?: string;

  children: React.ReactNode;
}

export function ExternalLink({
  href,
  icon,
  className,
  children,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center text-stone-400 font-medium text-sm group transition-colors duration-300",
        className,
      )}
    >
      <span className="opacity-0 external-link-text-prefix">{"//"}</span>
      <span className="external-link-text">
        {children}
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
